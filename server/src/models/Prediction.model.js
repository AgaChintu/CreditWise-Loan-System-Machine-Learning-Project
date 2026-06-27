import mongoose from "mongoose";

const ModelResultSchema = new mongoose.Schema(
  {
    model: String,
    prediction: String,
    probabilities: mongoose.Schema.Types.Mixed,
  },
  { _id: false }
);

const PredictionSchema = new mongoose.Schema(
  {
    input: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    predictions: {
      logistic_regression: ModelResultSchema,
      knn: ModelResultSchema,
      naive_bayes: ModelResultSchema,
    },
    recommendedModel: { type: String, required: true },
    finalDecision: { type: String, required: true, enum: ["Yes", "No"] },
    selectionCriterion: { type: String, default: "f1" },
  },
  { timestamps: true }
);

PredictionSchema.index({ createdAt: -1 });

export default mongoose.model("Prediction", PredictionSchema);
