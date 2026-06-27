# CreditWise — Python ML Service

This service is a faithful, byte-for-byte reproduction of `loan_approval_project.ipynb`.
It exists to serve predictions from the exact same fitted objects the notebook
trained and evaluated — not a re-implementation, not a "cleaned up" version.

## What's preserved exactly from the notebook

| Step | Notebook cells | File |
|---|---|---|
| Missing value imputation (mean / most_frequent) | 4–5 | `train.py` |
| Drop `Applicant_ID` | 17 | `train.py` |
| `LabelEncoder` on `Education_Level`, `Loan_Approved` | 20 | `train.py` |
| `OneHotEncoder(drop="first")` on 6 nominal columns | 20 | `train.py` |
| Feature engineering: `DTI_Ratio_sq`, `Credit_Score_sq`, `Applicant_Income_log` | 34 | `train.py` |
| Drop raw `Credit_Score`, `DTI_Ratio` | 34 | `train.py` |
| `train_test_split(test_size=0.2, random_state=42)` | 27/34 | `train.py` |
| `StandardScaler` | 29/34 | `train.py` |
| `LogisticRegression()` | 36 | `train.py` |
| `KNeighborsClassifier(n_neighbors=39)` | 37 | `train.py` |
| `GaussianNB()` | 38 | `train.py` |

Running `train.py` reproduces these notebook outputs exactly (verified):

| Model | Accuracy | Precision | Recall | F1 |
|---|---|---|---|---|
| Logistic Regression | 0.880 | 0.7846 | 0.8361 | **0.8095** |
| KNN (k=39) | 0.755 | 0.7500 | 0.2951 | 0.4235 |
| Naive Bayes | 0.860 | 0.8113 | 0.7049 | 0.7544 |

**Recommended model: Logistic Regression** (highest F1-score — chosen automatically
in `train.py` because the target is imbalanced ~69%/31%, so F1 is a fairer summary
than raw accuracy; the rule is `selection_criterion = "f1"` and lives in `metrics.json`,
not hardcoded in the frontend).

## Setup

```bash
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

# 1. Train once - this writes everything in ./artifacts
python train.py

# 2. Start the API
uvicorn main:app --reload --port 8000
```

Visit `http://localhost:8000/docs` for interactive Swagger docs.

## Endpoints

- `GET /health` — liveness check
- `GET /metadata` — dataset min/max + category options (powers the Prediction form)
- `GET /metrics` — accuracy/precision/recall/F1/confusion matrix/ROC/PR curves for all 3 models
- `POST /predict` — run a live applicant record through all 3 models, returns each model's
  verdict + probability, plus the recommended model's final decision

## Re-training

If you ever update `loan_approval_data.csv`, just re-run `python train.py`. It regenerates
every artifact in `artifacts/` and recomputes `metrics.json`, so the Analytics dashboard and
Model comparison table in the frontend automatically reflect the new numbers — nothing to
edit by hand.
