import axios from "axios";

const PYTHON_API_URL = process.env.PYTHON_API_URL || "http://localhost:8000";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL 
  ? import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '') + '/api'
  : "http://localhost:5000/api",
  timeout: 60000,
});

export const getMetadata = async () => {
  const { data } = await client.get("/metadata");
  return data;
};

export const getMetrics = async () => {
  const { data } = await client.get("/metrics");
  return data;
};

export const runPrediction = async (applicantData) => {
  const { data } = await client.post("/predict", applicantData);
  return data;
};

export const checkHealth = async () => {
  const { data } = await client.get("/health");
  return data;
};
