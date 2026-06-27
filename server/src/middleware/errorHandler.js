export const notFound = (req, res, next) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
};

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.response) {
    // Error bubbled up from the Python ML service via axios
    return res.status(err.response.status || 502).json({
      success: false,
      message: "ML service error",
      details: err.response.data,
    });
  }

  if (err.code === "ECONNREFUSED") {
    return res.status(503).json({
      success: false,
      message: "ML service is unreachable. Make sure the Python API is running.",
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
};
