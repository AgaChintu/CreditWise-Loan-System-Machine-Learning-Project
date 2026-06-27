import { FaMedal } from "react-icons/fa";
import { MODEL_INFO, MODEL_ORDER } from "../../data/modelInfo";

const MEDAL_COLORS = ["#F59E0B", "#94A3B8", "#B45309"];

const RankingTable = ({ metrics }) => {
  const ranked = [...MODEL_ORDER].sort((a, b) => metrics[b].f1 - metrics[a].f1);

  return (
    <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
      <p className="font-semibold text-slate-700 mb-4">Model Ranking (by F1-Score)</p>
      <div className="space-y-3">
        {ranked.map((key, i) => (
          <div
            key={key}
            className={`flex items-center gap-4 p-4 rounded-xl ${
              i === 0 ? "bg-gradient-primary text-white" : "bg-surface-bg"
            }`}
          >
            <FaMedal style={{ color: i === 0 ? "#FDE68A" : MEDAL_COLORS[i] }} className="text-xl shrink-0" />
            <div className="flex-1">
              <p className={`font-semibold text-sm ${i === 0 ? "text-white" : "text-slate-800"}`}>
                #{i + 1} {MODEL_INFO[key].name}
              </p>
              <p className={`text-xs ${i === 0 ? "text-white/80" : "text-slate-400"}`}>
                F1-Score: {(metrics[key].f1 * 100).toFixed(2)}% · Accuracy: {(metrics[key].accuracy * 100).toFixed(2)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RankingTable;
