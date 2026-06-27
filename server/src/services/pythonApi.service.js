import axios from "axios";

const PYTHON_API_URL = process.env.PYTHON_API_URL || "http://localhost:8000";

const client = axios.create({
  baseURL: PYTHON_API_URL,
  timeout: 15000,
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
