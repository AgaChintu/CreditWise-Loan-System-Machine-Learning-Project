import { useEffect, useState } from "react";
import { fetchModelMetrics } from "../api/predictionApi";
import ClassificationReportTable from "../components/analytics/ClassificationReportTable";
import ConfusionMatrixGrid from "../components/analytics/ConfusionMatrixGrid";
import CurveChart from "../components/analytics/CurveChart";
import MetricBarChart from "../components/analytics/MetricBarChart";
import RankingTable from "../components/analytics/RankingTable";
import SummaryCards from "../components/analytics/SummaryCards";
import { ErrorState, Loader } from "../components/common/Loader";
import SectionHeading from "../components/common/SectionHeading";
import { MODEL_INFO, MODEL_ORDER } from "../data/modelInfo";

const Analytics = () => {
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

  if (status === "loading") return <Loader label="Crunching evaluation metrics..." />;
  if (status === "error")
    return (
      <ErrorState
        message="Could not load analytics. Make sure the Node server and Python ML service are both running."
        onRetry={load}
      />
    );
  if (!metrics) return null;

  const rocCurves = MODEL_ORDER.reduce(
    (acc, k) => ({ ...acc, [k]: { x: metrics[k].roc_curve.fpr, y: metrics[k].roc_curve.tpr } }),
    {}
  );
  const prCurves = MODEL_ORDER.reduce(
    (acc, k) => ({ ...acc, [k]: { x: metrics[k].pr_curve.recall, y: metrics[k].pr_curve.precision } }),
    {}
  );

  return (
    <div className="section-padding">
      <SectionHeading
        eyebrow="Analytics Dashboard"
        title="Detailed Model Performance"
        description="Every chart below is computed live from the trained models on the held-out test set."
      />

      <SummaryCards metrics={metrics} />

      <div className="grid lg:grid-cols-2 gap-6 mb-10">
        <MetricBarChart metrics={metrics} metricKey="accuracy" label="Accuracy Comparison" />
        <MetricBarChart metrics={metrics} metricKey="precision" label="Precision Comparison" />
        <MetricBarChart metrics={metrics} metricKey="recall" label="Recall Comparison" />
        <MetricBarChart metrics={metrics} metricKey="f1" label="F1-Score Comparison" />
      </div>

      <h3 className="font-bold text-xl text-slate-800 mb-4">Confusion Matrices</h3>
      <div className="grid lg:grid-cols-3 gap-6 mb-10">
        {MODEL_ORDER.map((key) => (
          <ConfusionMatrixGrid
            key={key}
            matrix={metrics[key].confusion_matrix}
            modelName={MODEL_INFO[key].name}
          />
        ))}
      </div>

      <h3 className="font-bold text-xl text-slate-800 mb-4">ROC &amp; Precision-Recall Curves</h3>
      <div className="grid lg:grid-cols-2 gap-6 mb-10">
        <CurveChart
          title="ROC Curve Comparison"
          xLabel="False Positive Rate"
          yLabel="True Positive Rate"
          curves={rocCurves}
          showDiagonal
          suffixFn={(k) => `(AUC ${metrics[k].roc_curve.auc.toFixed(3)})`}
        />
        <CurveChart
          title="Precision-Recall Curve"
          xLabel="Recall"
          yLabel="Precision"
          curves={prCurves}
        />
      </div>

      <div className="mb-10">
        <RankingTable metrics={metrics} />
      </div>

      <h3 className="font-bold text-xl text-slate-800 mb-4">Classification Reports</h3>
      <div className="grid lg:grid-cols-3 gap-6">
        {MODEL_ORDER.map((key) => (
          <ClassificationReportTable
            key={key}
            report={metrics[key].classification_report}
            modelName={MODEL_INFO[key].name}
          />
        ))}
      </div>
    </div>
  );
};

export default Analytics;
