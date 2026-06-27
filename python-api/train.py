"""
train.py

This script is a FAITHFUL, STEP-FOR-STEP replication of the original
`loan_approval_project.ipynb` notebook. It does not change, simplify,
reorder, or "improve" any preprocessing, encoding, feature engineering,
scaling, or modeling step.

It exists only to:
  1. Run the exact notebook pipeline once.
  2. Persist every fitted object (imputers, encoders, scaler, models)
     with joblib so the FastAPI service can reproduce identical
     predictions without re-training on every request.
  3. Compute and persist evaluation metrics (accuracy, precision,
     recall, F1, confusion matrix, classification report, ROC curve,
     Precision-Recall curve) so the frontend Analytics dashboard reads
     real numbers instead of hardcoded ones.
  4. Persist dataset metadata (min/max per numeric field, category
     options per categorical field) so the Prediction form can be
     built dynamically instead of hardcoding ranges.

Run with:  python train.py
Produces files inside ./artifacts/
"""

import json
import os

import joblib
import numpy as np
import pandas as pd
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    f1_score,
    precision_recall_curve,
    precision_score,
    recall_score,
    roc_curve,
)
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import LabelEncoder, OneHotEncoder, StandardScaler

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ARTIFACTS_DIR = os.path.join(BASE_DIR, "artifacts")
DATA_PATH = os.path.join(BASE_DIR, "loan_approval_data.csv")

os.makedirs(ARTIFACTS_DIR, exist_ok=True)


def save(obj, name):
    joblib.dump(obj, os.path.join(ARTIFACTS_DIR, name))


def main():
    # ----------------------------------------------------------------
    # 1. Load data  (notebook cell 1)
    # ----------------------------------------------------------------
    raw_df = pd.read_csv(DATA_PATH)

    # Capture raw dataset metadata BEFORE any transformation. This is
    # used purely to render the Prediction form (min/max sliders and
    # dropdown options). It has zero influence on the ML pipeline.
    categorical_meta_cols = [
        "Employment_Status",
        "Marital_Status",
        "Loan_Purpose",
        "Property_Area",
        "Education_Level",
        "Gender",
        "Employer_Category",
    ]
    numeric_meta_cols = [
        "Applicant_Income",
        "Coapplicant_Income",
        "Age",
        "Dependents",
        "Credit_Score",
        "Existing_Loans",
        "DTI_Ratio",
        "Savings",
        "Collateral_Value",
        "Loan_Amount",
        "Loan_Term",
    ]
    meta = {"numeric": {}, "categorical": {}}
    for col in numeric_meta_cols:
        series = raw_df[col].dropna()
        meta["numeric"][col] = {
            "min": float(series.min()),
            "max": float(series.max()),
            "mean": float(series.mean()),
            "median": float(series.median()),
        }
    for col in categorical_meta_cols:
        options = sorted([v for v in raw_df[col].dropna().unique().tolist()])
        meta["categorical"][col] = options

    df = raw_df.copy()

    # ----------------------------------------------------------------
    # 2. Handle Missing Values  (notebook cells 4-5)
    # ----------------------------------------------------------------
    categorical_cols = df.select_dtypes(include=["object"]).columns
    numerical_cols = df.select_dtypes(include=["float64"]).columns

    num_imputer = SimpleImputer(strategy="mean")
    df[numerical_cols] = num_imputer.fit_transform(df[numerical_cols])

    cat_imputer = SimpleImputer(strategy="most_frequent")
    df[categorical_cols] = cat_imputer.fit_transform(df[categorical_cols])

    save(num_imputer, "num_imputer.joblib")
    save(cat_imputer, "cat_imputer.joblib")
    save(list(numerical_cols), "numerical_cols.joblib")
    save(list(categorical_cols), "categorical_cols.joblib")

    # ----------------------------------------------------------------
    # 3. Drop Applicant_ID  (notebook cell 17)
    # ----------------------------------------------------------------
    df = df.drop("Applicant_ID", axis=1)

    # ----------------------------------------------------------------
    # 4. Feature Encoding  (notebook cell 20)
    # ----------------------------------------------------------------
    le_education = LabelEncoder()
    df["Education_Level"] = le_education.fit_transform(df["Education_Level"])

    le_target = LabelEncoder()
    df["Loan_Approved"] = le_target.fit_transform(df["Loan_Approved"])

    onehot_cols = [
        "Employment_Status",
        "Marital_Status",
        "Loan_Purpose",
        "Property_Area",
        "Gender",
        "Employer_Category",
    ]
    onehot = OneHotEncoder(drop="first", sparse_output=False, handle_unknown="ignore")
    encoded = onehot.fit_transform(df[onehot_cols])
    encoded_df = pd.DataFrame(
        encoded, columns=onehot.get_feature_names_out(onehot_cols), index=df.index
    )
    df = pd.concat([df.drop(columns=onehot_cols), encoded_df], axis=1)

    save(le_education, "le_education.joblib")
    save(le_target, "le_target.joblib")
    save(onehot, "onehot.joblib")
    save(onehot_cols, "onehot_cols.joblib")

    # ----------------------------------------------------------------
    # 5. Feature Engineering (final round, notebook cell 34)
    # ----------------------------------------------------------------
    df["DTI_Ratio_sq"] = df["DTI_Ratio"] ** 2
    df["Credit_Score_sq"] = df["Credit_Score"] ** 2
    df["Applicant_Income_log"] = np.log1p(df["Applicant_Income"])

    x = df.drop(columns=["Loan_Approved", "Credit_Score", "DTI_Ratio"])
    y = df["Loan_Approved"]

    feature_columns = list(x.columns)
    save(feature_columns, "feature_columns.joblib")

    # ----------------------------------------------------------------
    # 6. Train/Test Split + Scaling  (notebook cells 34, 29 pattern)
    # ----------------------------------------------------------------
    x_train, x_test, y_train, y_test = train_test_split(
        x, y, test_size=0.2, random_state=42
    )

    scaler = StandardScaler()
    x_train_scaled = scaler.fit_transform(x_train)
    x_test_scaled = scaler.transform(x_test)

    save(scaler, "scaler.joblib")

    # ----------------------------------------------------------------
    # 7. Train + Evaluate the three notebook models
    #    (notebook cells 36, 37, 38 - final feature-engineered round)
    # ----------------------------------------------------------------
    models = {
        "logistic_regression": LogisticRegression(),
        "knn": KNeighborsClassifier(n_neighbors=39),
        "naive_bayes": GaussianNB(),
    }

    display_names = {
        "logistic_regression": "Logistic Regression",
        "knn": "K-Nearest Neighbors",
        "naive_bayes": "Naive Bayes",
    }

    metrics = {}

    for key, model in models.items():
        model.fit(x_train_scaled, y_train)
        y_pred = model.predict(x_test_scaled)

        cm = confusion_matrix(y_test, y_pred)
        report = classification_report(y_test, y_pred, output_dict=True)

        # ROC curve + AUC
        if hasattr(model, "predict_proba"):
            y_score = model.predict_proba(x_test_scaled)[:, 1]
        else:
            y_score = model.decision_function(x_test_scaled)
        fpr, tpr, _ = roc_curve(y_test, y_score)
        trapezoid = getattr(np, "trapezoid", None) or np.trapz
        roc_auc = float(trapezoid(tpr, fpr))

        # Precision-Recall curve
        pr_precision, pr_recall, _ = precision_recall_curve(y_test, y_score)

        metrics[key] = {
            "name": display_names[key],
            "accuracy": float(accuracy_score(y_test, y_pred)),
            "precision": float(precision_score(y_test, y_pred)),
            "recall": float(recall_score(y_test, y_pred)),
            "f1": float(f1_score(y_test, y_pred)),
            "confusion_matrix": cm.tolist(),
            "classification_report": report,
            "roc_curve": {
                "fpr": [round(float(v), 4) for v in fpr.tolist()],
                "tpr": [round(float(v), 4) for v in tpr.tolist()],
                "auc": round(roc_auc, 4),
            },
            "pr_curve": {
                "precision": [round(float(v), 4) for v in pr_precision.tolist()],
                "recall": [round(float(v), 4) for v in pr_recall.tolist()],
            },
        }

        save(model, f"{key}.joblib")
        print(f"{display_names[key]} -> accuracy={metrics[key]['accuracy']:.4f} "
              f"precision={metrics[key]['precision']:.4f} "
              f"recall={metrics[key]['recall']:.4f} "
              f"f1={metrics[key]['f1']:.4f}")

    # ----------------------------------------------------------------
    # 8. Determine the recommended model.
    #    Selection rule: highest F1-Score. F1 is used (rather than raw
    #    accuracy) because the target classes are imbalanced
    #    (~69% No / ~31% Yes in the source data), so F1 gives a fairer
    #    single-number summary of precision/recall trade-off. This is
    #    computed automatically from the metrics above - never
    #    hardcoded.
    # ----------------------------------------------------------------
    recommended_key = max(metrics, key=lambda k: metrics[k]["f1"])
    metrics["recommended_model"] = recommended_key
    metrics["selection_criterion"] = "f1"

    with open(os.path.join(ARTIFACTS_DIR, "metrics.json"), "w") as f:
        json.dump(metrics, f, indent=2)

    with open(os.path.join(ARTIFACTS_DIR, "meta.json"), "w") as f:
        json.dump(meta, f, indent=2)

    print()
    print(f"Recommended model (highest F1): {display_names[recommended_key]}")
    print("Artifacts written to:", ARTIFACTS_DIR)


if __name__ == "__main__":
    main()
