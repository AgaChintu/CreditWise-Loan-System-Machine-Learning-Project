import { FaBullseye, FaCrown, FaLayerGroup, FaPercentage } from "react-icons/fa";
import { MODEL_INFO } from "../../data/modelInfo";

const Card = ({ icon: Icon, label, value, sub, accent }) => (
  <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-5 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${accent}`}>
      <Icon />
    </div>
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-xl font-bold text-slate-800">{value}</p>
      {sub && <p className="text-[11px] text-slate-400">{sub}</p>}
    </div>
  </div>
);

const SummaryCards = ({ metrics }) => {
  const recommended = metrics.recommended_model;
  const best = metrics[recommended];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      <Card
        icon={FaCrown}
        label="Recommended Model"
        value={MODEL_INFO[recommended].name}
        sub={`Selected by highest ${metrics.selection_criterion.toUpperCase()}`}
        accent="bg-warning/10 text-warning"
      />
      <Card
        icon={FaPercentage}
        label="Best Accuracy"
        value={`${(best.accuracy * 100).toFixed(1)}%`}
        accent="bg-primary/10 text-primary"
      />
      <Card
        icon={FaBullseye}
        label="Best F1-Score"
        value={`${(best.f1 * 100).toFixed(1)}%`}
        accent="bg-success/10 text-success"
      />
      <Card
        icon={FaLayerGroup}
        label="Models Trained"
        value="3"
        sub="Logistic Regression · KNN · Naive Bayes"
        accent="bg-secondary/10 text-secondary"
      />
    </div>
  );
};

export default SummaryCards;
