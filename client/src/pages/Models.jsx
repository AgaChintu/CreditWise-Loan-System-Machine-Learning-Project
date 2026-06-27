import { useEffect, useState } from "react";
import { fetchModelMetrics } from "../api/predictionApi";
import { ErrorState, Loader } from "../components/common/Loader";
import SectionHeading from "../components/common/SectionHeading";
import ComparisonTable from "../components/models/ComparisonTable";
import ModelCard from "../components/models/ModelCard";
import { MODEL_INFO, MODEL_ORDER } from "../data/modelInfo";

const Models = () => {
  const [metrics, setMetrics] = useState(null);
  const [status, setStatus] = useState("loading");

  const load = async () => {
    setStatus("loading");
    try {
      const data = await fetchModelMetrics();
      setMetrics(data);
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const modelNames = MODEL_ORDER.reduce((acc, k) => ({ ...acc, [k]: MODEL_INFO[k].name }), {});

  return (
    <div className="section-padding">
      <SectionHeading
        eyebrow="Machine Learning"
        title="The Three Models Behind Every Prediction"
        description="Each model was trained on the identical, feature-engineered dataset and evaluated with the same metrics — so the comparison below is genuinely apples-to-apples."
      />

      {status === "loading" && <Loader label="Fetching live model metrics..." />}
      {status === "error" && (
        <ErrorState
          message="Could not reach the analytics API. Make sure the Node server and Python ML service are both running."
          onRetry={load}
        />
      )}

      {status === "success" && metrics && (
        <>
          <div className="grid lg:grid-cols-3 gap-6 mb-16">
            {MODEL_ORDER.map((key, i) => (
              <ModelCard
                key={key}
                info={MODEL_INFO[key]}
                metrics={metrics[key]}
                isRecommended={metrics.recommended_model === key}
                delay={i * 0.1}
              />
            ))}
          </div>

          <SectionHeading
            eyebrow="Head-to-Head"
            title="Model Comparison"
            description="Values are pulled live from the trained models' evaluation results — never hardcoded."
          />
          <ComparisonTable metrics={metrics} modelNames={modelNames} />
        </>
      )}
    </div>
  );
};

export default Models;
