# CreditWise — AI-Powered Loan Approval System

A production-structured, full-stack loan eligibility prediction platform built on top of a
**faithfully reproduced** Machine Learning notebook (`loan_approval_project.ipynb`). Nothing in
the original preprocessing, encoding, feature engineering, scaling, or model training was
changed — see [`python-api/README.md`](python-api/README.md) for the cell-by-cell mapping and
verification.

## Architecture

```
┌─────────────────┐      ┌──────────────────────┐      ┌─────────────────────┐
│   React Client   │ ───▶ │  Node.js / Express    │ ───▶ │  Python / FastAPI    │
│  (Vite + Tailwind │      │  (REST API + Mongo)  │      │  (the ML pipeline)   │
│   + Framer Motion)│ ◀─── │                       │ ◀─── │                      │
└─────────────────┘      └──────────┬───────────┘      └─────────────────────┘
                                     │
                                     ▼
                               ┌───────────┐
                               │ MongoDB   │
                               │ (history) │
                               └───────────┘
```

- **`python-api/`** — owns 100% of the ML logic. `train.py` reproduces the notebook exactly and
  persists every fitted object + evaluation metric. `main.py` serves predictions from those
  persisted artifacts (it never retrains on request).
- **`server/`** — a thin Node/Express layer. Proxies prediction & metrics requests to the Python
  service and persists prediction history in MongoDB.
- **`client/`** — the React SPA: Home, About, Models, Prediction, Analytics, History, and Contact
  pages, built with Vite, Tailwind CSS, Framer Motion, React Router, and Chart.js.

## Quick Start (run all three locally)

**1. Train the model and start the Python ML service**
```bash
cd python-api
python -m venv venv && source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python train.py            # writes artifacts/ (models, encoders, scaler, metrics.json, meta.json)
uvicorn main:app --reload --port 8000
```

**2. Start the Node/Express API** (new terminal)
```bash
cd server
npm install
cp .env.example .env       # fill in MONGODB_URI (MongoDB Atlas connection string)
npm run dev                 # http://localhost:5000
```

**3. Start the React client** (new terminal)
```bash
cd client
npm install
cp .env.example .env
npm run dev                 # http://localhost:5173
```

Open `http://localhost:5173` — the app is now fully functional end-to-end.

> The Node server still runs without `MONGODB_URI` configured — predictions and analytics keep
> working, only history persistence is skipped (with a console warning).

## Model Results (computed by `train.py`, not hardcoded anywhere)

| Model | Accuracy | Precision | Recall | F1-Score |
|---|---|---|---|---|
| **Logistic Regression** ⭐ | 88.0% | 78.5% | 83.6% | **80.9%** |
| Naive Bayes | 86.0% | 81.1% | 70.5% | 75.4% |
| KNN (k=39) | 75.5% | 75.0% | 29.5% | 42.4% |

⭐ Recommended model — automatically selected by highest F1-Score (the target class is
imbalanced ~70/30, so F1 is used instead of raw accuracy). The selection rule lives in
`train.py` / `metrics.json`, not in frontend code.

## Project Structure

```
CreditWise-Loan-System/
├── client/             React + Vite + Tailwind + Framer Motion frontend
├── server/             Node.js + Express + MongoDB backend
├── python-api/         FastAPI ML microservice (the source of truth for predictions)
├── render.yaml          Render deployment blueprint (server + python-api)
└── README.md            (this file)
```

## Deployment

- **Frontend → Vercel**: import the `client/` directory as the project root, framework preset
  "Vite". Set `VITE_API_BASE_URL` to your deployed server URL.
- **Server + Python API → Render**: `render.yaml` at the repo root defines both services as a
  Render Blueprint — connect the repo in the Render dashboard and it will provision both.
- **Database → MongoDB Atlas**: create a free cluster, whitelist Render's IPs (or `0.0.0.0/0` for
  simplicity), and paste the connection string into the server's `MONGODB_URI`.

## Re-training on new data

Replace `python-api/loan_approval_data.csv` and run `python train.py` again. Every artifact,
every metric, every chart in the Analytics page, and the Models comparison table update
automatically — nothing is hardcoded.
