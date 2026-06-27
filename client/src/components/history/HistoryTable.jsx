import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaTrash } from "react-icons/fa";
import { MODEL_INFO } from "../../data/modelInfo";

const formatDate = (iso) =>
  new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

const HistoryTable = ({ items, onDelete }) => {
  const [expanded, setExpanded] = useState(null);

  if (!items.length) {
    return (
      <div className="text-center py-16 text-slate-400">
        No predictions yet. Run one from the Prediction page to see it here.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = expanded === item._id;
        const approved = item.finalDecision === "Yes";

        return (
          <div key={item._id} className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
            <div className="flex items-center gap-4 p-5">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 ${
                  approved ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
                }`}
              >
                {approved ? "Approved" : "Rejected"}
              </span>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">
                  Income: {item.input?.Applicant_Income} · Loan Amount: {item.input?.Loan_Amount} ·{" "}
                  {item.input?.Loan_Purpose}
                </p>
                <p className="text-xs text-slate-400">
                  {formatDate(item.createdAt)} · Recommended:{" "}
                  {MODEL_INFO[item.recommendedModel]?.name || item.recommendedModel}
                </p>
              </div>

              <button
                onClick={() => setExpanded(isOpen ? null : item._id)}
                className="text-slate-400 hover:text-primary p-2"
                aria-label="Toggle details"
              >
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              <button
                onClick={() => onDelete(item._id)}
                className="text-slate-400 hover:text-danger p-2"
                aria-label="Delete prediction"
              >
                <FaTrash />
              </button>
            </div>

            {isOpen && (
              <div className="px-5 pb-5 pt-0 border-t border-slate-100 grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Applicant Input</p>
                  <div className="text-xs text-slate-600 space-y-1">
                    {Object.entries(item.input || {}).map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-2">
                        <span className="text-slate-400">{k}</span>
                        <span className="font-medium">{String(v)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Model Verdicts</p>
                  <div className="space-y-2">
                    {Object.entries(item.predictions || {}).map(([key, p]) => (
                      <div key={key} className="flex justify-between text-xs bg-surface-bg rounded-lg px-3 py-2">
                        <span className="font-medium text-slate-600">{p.model}</span>
                        <span className={p.prediction === "Yes" ? "text-success font-semibold" : "text-danger font-semibold"}>
                          {p.prediction}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default HistoryTable;
