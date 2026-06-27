import { FaCrown } from "react-icons/fa";
import { MODEL_ORDER } from "../../data/modelInfo";

const METRIC_KEYS = [
  { key: "accuracy", label: "Accuracy" },
  { key: "precision", label: "Precision" },
  { key: "recall", label: "Recall" },
  { key: "f1", label: "F1 Score" },
];

const ComparisonTable = ({ metrics, modelNames }) => {
  if (!metrics) return null;

  const winners = {};
  METRIC_KEYS.forEach(({ key }) => {
    let best = null;
    MODEL_ORDER.forEach((m) => {
      if (!best || metrics[m][key] > metrics[best][key]) best = m;
    });
    winners[key] = best;
  });

  const recommended = metrics.recommended_model;

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-card">
      <table className="w-full min-w-[640px]">
        <thead>
          <tr className="bg-slate-900 text-white text-left">
            <th className="px-5 py-4 text-sm font-semibold">Model</th>
            {METRIC_KEYS.map((m) => (
              <th key={m.key} className="px-5 py-4 text-sm font-semibold text-center">
                {m.label}
              </th>
            ))}
            <th className="px-5 py-4 text-sm font-semibold text-center">Winner</th>
          </tr>
        </thead>
        <tbody>
          {MODEL_ORDER.map((m, idx) => (
            <tr
              key={m}
              className={`border-b border-slate-100 ${
                m === recommended ? "bg-surface-blue/60" : idx % 2 === 0 ? "bg-white" : "bg-surface-bg/40"
              }`}
            >
              <td className="px-5 py-4 font-semibold text-slate-800 flex items-center gap-2">
                {modelNames[m]}
                {m === recommended && <FaCrown className="text-warning" title="Recommended model" />}
              </td>
              {METRIC_KEYS.map(({ key }) => (
                <td
                  key={key}
                  className={`px-5 py-4 text-center font-mono text-sm ${
                    winners[key] === m ? "text-primary font-bold" : "text-slate-600"
                  }`}
                >
                  {(metrics[m][key] * 100).toFixed(2)}%
                </td>
              ))}
              <td className="px-5 py-4 text-center">
                {m === recommended ? (
                  <span className="px-3 py-1 rounded-full bg-success/10 text-success text-xs font-bold">
                    Best Overall
                  </span>
                ) : (
                  <span className="text-slate-300 text-xs">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
