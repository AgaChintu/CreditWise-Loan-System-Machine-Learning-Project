import apiClient from "./axiosClient";

export const fetchFormMetadata = async () => {
  const { data } = await apiClient.get("/predictions/metadata");
  return data.data;
};

export const submitPrediction = async (applicantData) => {
  const { data } = await apiClient.post("/predictions", applicantData);
  return data.data;
};

export const fetchHistory = async (page = 1, limit = 10) => {
  const { data } = await apiClient.get(`/predictions/history?page=${page}&limit=${limit}`);
  return data;
};

export const deleteHistoryItem = async (id) => {
  const { data } = await apiClient.delete(`/predictions/history/${id}`);
  return data;
};

export const fetchModelMetrics = async () => {
  const { data } = await apiClient.get("/analytics/metrics");
  return data.data;
};
