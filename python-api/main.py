"""
main.py - CreditWise Loan Approval System - Python ML microservice

Endpoints:
  GET  /health         liveness probe
  GET  /metadata        dataset min/max + category options (drives the Prediction form)
  GET  /metrics         persisted evaluation metrics for all 3 models (drives Analytics + Models pages)
  POST /predict         run a live applicant record through all 3 trained models

This service does NOT retrain on request. `train.py` is run once
(offline / at build time) and writes artifacts into ./artifacts, which
this service loads at startup. This guarantees every prediction served
by the API is produced by the exact same fitted objects that were
evaluated in the notebook - never a freshly retrained, slightly
different model.
"""

import os

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from pipeline import get_pipeline
from schemas import LoanApplicationInput, PredictionResponse

ARTIFACTS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "artifacts")

app = FastAPI(
    title="CreditWise Loan Approval ML Service",
    description="Serves predictions from the exact notebook-trained Logistic Regression, "
                "KNN, and Naive Bayes models.",
    version="1.0.0",
)

allowed_origins = os.environ.get("CORS_ORIGINS", "*")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if allowed_origins == "*" else allowed_origins.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def _load_pipeline():
    if not os.path.exists(os.path.join(ARTIFACTS_DIR, "metrics.json")):
        raise RuntimeError(
            "No trained artifacts found. Run `python train.py` once before starting the API."
        )
    get_pipeline()


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/metadata")
def metadata():
    pipeline = get_pipeline()
    return pipeline.meta


@app.get("/metrics")
def metrics():
    pipeline = get_pipeline()
    return pipeline.metrics


@app.post("/predict", response_model=PredictionResponse)
def predict(payload: LoanApplicationInput):
    pipeline = get_pipeline()
    try:
        result = pipeline.predict(payload.dict())
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return result


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=int(os.environ.get("PORT", 8000)), reload=True)
