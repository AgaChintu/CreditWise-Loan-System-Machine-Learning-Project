import Prediction from "../models/Prediction.model.js";
import { getMetadata, runPrediction } from "../services/pythonApi.service.js";

export const getFormMetadata = async (req, res, next) => {
  try {
    const meta = await getMetadata();
    res.json({ success: true, data: meta });
  } catch (err) {
    next(err);
  }
};

export const createPrediction = async (req, res, next) => {
  try {
    const applicantData = req.body;
    const result = await runPrediction(applicantData);

    let saved = null;
    try {
      saved = await Prediction.create({
        input: applicantData,
        predictions: result.predictions,
        recommendedModel: result.recommended_model,
        finalDecision: result.final_decision,
        selectionCriterion: result.selection_criterion,
      });
    } catch (dbErr) {
      // Don't fail the whole request just because history couldn't be saved
      // (e.g. MONGODB_URI not configured in a quick local run).
      console.warn("Could not save prediction history:", dbErr.message);
    }

    res.status(201).json({
      success: true,
      data: {
        ...result,
        historyId: saved?._id || null,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getHistory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const [items, total] = await Promise.all([
      Prediction.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Prediction.countDocuments(),
    ]);

    res.json({
      success: true,
      data: items,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

export const getHistoryById = async (req, res, next) => {
  try {
    const item = await Prediction.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Prediction not found" });
    }
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

export const deleteHistoryItem = async (req, res, next) => {
  try {
    const item = await Prediction.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Prediction not found" });
    }
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    next(err);
  }
};
