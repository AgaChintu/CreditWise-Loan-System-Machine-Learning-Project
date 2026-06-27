# CreditWise — Node.js / Express Backend

Thin orchestration layer between the React client, MongoDB (prediction history),
and the Python ML microservice. It does not contain any ML logic itself —
every prediction is computed by `python-api` and simply persisted/proxied here.

## Setup

```bash
npm install
cp .env.example .env   # then fill in MONGODB_URI
npm run dev             # nodemon, http://localhost:5000
```

Make sure `python-api` is running first (`uvicorn main:app --port 8000`), since
this server proxies `/predictions` and `/analytics/metrics` to it.

## API Reference

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Server liveness |
| GET | `/api/predictions/metadata` | Dataset min/max + category options (Prediction form) |
| POST | `/api/predictions` | Run a prediction, save to history |
| GET | `/api/predictions/history?page=&limit=` | Paginated prediction history |
| GET | `/api/predictions/history/:id` | Single history record |
| DELETE | `/api/predictions/history/:id` | Delete a history record |
| GET | `/api/analytics/metrics` | Accuracy/Precision/Recall/F1/Confusion Matrix/ROC/PR curves for all 3 models |

## Notes

- If `MONGODB_URI` is not set, the server still runs and predictions still work —
  history just won't be persisted (a warning is logged on startup).
- CORS is restricted to `CLIENT_URL` in production; defaults to `*` if unset.
