import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn(
      "⚠️  MONGODB_URI is not set. The API will run, but prediction history " +
        "will not be persisted. Set MONGODB_URI in server/.env to enable it."
    );
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    console.warn("Continuing without database persistence.");
  }
};
