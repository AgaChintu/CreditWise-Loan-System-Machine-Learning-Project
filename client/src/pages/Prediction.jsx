import { useEffect, useState } from "react";
import { fetchFormMetadata, submitPrediction } from "../api/predictionApi";
import { ErrorState, Loader } from "../components/common/Loader";
import SectionHeading from "../components/common/SectionHeading";
import PredictionForm from "../components/prediction/PredictionForm";
import ResultPanel from "../components/prediction/ResultPanel";

const Prediction = () => {
  const [meta, setMeta] = useState(null);
  const [metaStatus, setMetaStatus] = useState("loading");
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const loadMeta = async () => {
    setMetaStatus("loading");
    try {
      const data = await fetchFormMetadata();
      setMeta(data);
      setMetaStatus("success");
    } catch (err) {
      setMetaStatus("error");
    }
  };

  useEffect(() => {
    loadMeta();
  }, []);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    setSubmitError(null);
    setResult(null);
    try {
      const data = await submitPrediction(payload);
      setResult(data);
      setTimeout(() => {
        document.getElementById("prediction-result")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      setSubmitError(
        err?.response?.data?.message || "Could not run the prediction. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="section-padding max-w-4xl mx-auto">
      <SectionHeading
        eyebrow="Live Prediction"
        title="Check Loan Eligibility"
        description="Fill in the applicant's details below. All three trained models will independently evaluate the application."
      />

      {metaStatus === "loading" && <Loader label="Loading dataset metadata..." />}
      {metaStatus === "error" && (
        <ErrorState
          message="Could not load form metadata. Make sure the backend and Python ML service are running."
          onRetry={loadMeta}
        />
      )}

      {metaStatus === "success" && (
        <>
          <PredictionForm meta={meta} onSubmit={handleSubmit} loading={submitting} />
          {submitError && (
            <p className="text-center text-danger text-sm mt-4">{submitError}</p>
          )}
          <div id="prediction-result">
            <ResultPanel result={result} />
          </div>
        </>
      )}
    </div>
  );
};

export default Prediction;
