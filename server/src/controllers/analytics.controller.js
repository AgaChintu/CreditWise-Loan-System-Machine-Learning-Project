import { getMetrics } from "../services/pythonApi.service.js";

export const getModelMetrics = async (req, res, next) => {
  try {
    const metrics = await getMetrics();
    res.json({ success: true, data: metrics });
  } catch (err) {
    next(err);
  }
};
