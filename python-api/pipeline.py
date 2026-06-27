"""
pipeline.py

Loads every artifact produced by train.py and exposes `predict(raw_input)`.

The transformation order applied here mirrors train.py / the notebook
EXACTLY:
  1. (optional) impute missing values
  2. drop nothing extra (Applicant_ID and Loan_Approved are never part
     of the live input payload)
  3. Label-encode Education_Level
  4. One-hot encode the 6 nominal columns (drop='first')
  5. Feature engineering: DTI_Ratio_sq, Credit_Score_sq, Applicant_Income_log
  6. Drop raw Credit_Score / DTI_Ratio
  7. Reindex to the exact training feature column order
  8. Scale with the fitted StandardScaler
  9. Predict with all three fitted models
"""

import json
import os

import joblib
import numpy as np
import pandas as pd

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ARTIFACTS_DIR = os.path.join(BASE_DIR, "artifacts")

ONEHOT_COLS = ["Employment_Status", "Marital_Status", "Loan_Purpose",
               "Property_Area", "Gender", "Employer_Category"]

NUMERIC_FIELDS = [
    "Applicant_Income", "Coapplicant_Income", "Age", "Dependents",
    "Credit_Score", "Existing_Loans", "DTI_Ratio", "Savings",
    "Collateral_Value", "Loan_Amount", "Loan_Term",
]


class LoanPipeline:
    def __init__(self):
        self.le_education = joblib.load(os.path.join(ARTIFACTS_DIR, "le_education.joblib"))
        self.le_target = joblib.load(os.path.join(ARTIFACTS_DIR, "le_target.joblib"))
        self.onehot = joblib.load(os.path.join(ARTIFACTS_DIR, "onehot.joblib"))
        self.scaler = joblib.load(os.path.join(ARTIFACTS_DIR, "scaler.joblib"))
        self.feature_columns = joblib.load(os.path.join(ARTIFACTS_DIR, "feature_columns.joblib"))

        self.models = {
            "logistic_regression": joblib.load(os.path.join(ARTIFACTS_DIR, "logistic_regression.joblib")),
            "knn": joblib.load(os.path.join(ARTIFACTS_DIR, "knn.joblib")),
            "naive_bayes": joblib.load(os.path.join(ARTIFACTS_DIR, "naive_bayes.joblib")),
        }

        with open(os.path.join(ARTIFACTS_DIR, "metrics.json")) as f:
            self.metrics = json.load(f)

        with open(os.path.join(ARTIFACTS_DIR, "meta.json")) as f:
            self.meta = json.load(f)

        self.display_names = {k: v["name"] for k, v in self.metrics.items()
                               if isinstance(v, dict) and "name" in v}
        self.recommended_model = self.metrics["recommended_model"]

    def _build_row(self, raw: dict) -> pd.DataFrame:
        """Builds a single-row DataFrame matching the notebook's pre-encoding shape."""
        row = {}

        for field in NUMERIC_FIELDS:
            value = raw.get(field)
            if value is None:
                value = self.meta["numeric"][field]["mean"]
            row[field] = float(value)

        for field in ["Employment_Status", "Marital_Status", "Loan_Purpose",
                      "Property_Area", "Education_Level", "Gender", "Employer_Category"]:
            value = raw.get(field)
            if value is None or value == "":
                # fall back to most common training category, same spirit
                # as the notebook's most_frequent imputation strategy
                value = self.meta["categorical"][field][0]
            row[field] = value

        return pd.DataFrame([row])

    def predict(self, raw: dict) -> dict:
        df = self._build_row(raw)

        # Label encode Education_Level
        df["Education_Level"] = self.le_education.transform(df["Education_Level"])

        # One-hot encode nominal columns
        encoded = self.onehot.transform(df[ONEHOT_COLS])
        encoded_df = pd.DataFrame(
            encoded, columns=self.onehot.get_feature_names_out(ONEHOT_COLS), index=df.index
        )
        df = pd.concat([df.drop(columns=ONEHOT_COLS), encoded_df], axis=1)

        # Feature engineering (final notebook round)
        df["DTI_Ratio_sq"] = df["DTI_Ratio"] ** 2
        df["Credit_Score_sq"] = df["Credit_Score"] ** 2
        df["Applicant_Income_log"] = np.log1p(df["Applicant_Income"])

        df = df.drop(columns=["Credit_Score", "DTI_Ratio"])

        # Exact training column order
        df = df.reindex(columns=self.feature_columns, fill_value=0)

        scaled = self.scaler.transform(df)

        results = {}
        for key, model in self.models.items():
            pred = int(model.predict(scaled)[0])
            label = self.le_target.inverse_transform([pred])[0]
            proba = None
            if hasattr(model, "predict_proba"):
                p = model.predict_proba(scaled)[0]
                # class order follows model.classes_
                proba = {
                    str(self.le_target.inverse_transform([cls])[0]): round(float(p[i]), 4)
                    for i, cls in enumerate(model.classes_)
                }
            results[key] = {
                "model": self.display_names[key],
                "prediction": str(label),
                "probabilities": proba,
            }

        return {
            "predictions": results,
            "recommended_model": self.recommended_model,
            "final_decision": results[self.recommended_model]["prediction"],
            "selection_criterion": self.metrics.get("selection_criterion", "f1"),
        }


_pipeline_instance = None


def get_pipeline() -> LoanPipeline:
    global _pipeline_instance
    if _pipeline_instance is None:
        _pipeline_instance = LoanPipeline()
    return _pipeline_instance
