import { motion } from "framer-motion";
import { FaCheckCircle, FaCrown, FaTimesCircle } from "react-icons/fa";
import { MODEL_INFO, MODEL_ORDER } from "../../data/modelInfo";

const ResultPanel = ({ result }) => {
  if (!result) return null;

  const approved = result.final_decision === "Yes";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-10"
    >
      <div
        className={`rounded-3xl p-8 sm:p-10 text-center border-2 ${
          approved ? "bg-success/5 border-success/30" : "bg-danger/5 border-danger/30"
        }`}
      >
        <div
          className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl mb-5 ${
            approved ? "bg-success/15 text-success" : "bg-danger/15 text-danger"
          }`}
        >
          {approved ? <FaCheckCircle /> : <FaTimesCircle />}
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">
          {approved ? "Loan Likely Approved" : "Loan Likely Not Approved"}
        </h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          This decision is based on the <strong>{MODEL_INFO[result.recommended_model].name}</strong>{" "}
          model, automatically selected as the recommended model (highest{" "}
          {result.selection_criterion.toUpperCase()}-score on the held-out test set).
        </p>
      </div>

      <h4 className="font-bold text-slate-800 mt-10 mb-4">All Model Verdicts</h4>
      <div className="grid sm:grid-cols-3 gap-4">
        {MODEL_ORDER.map((key) => {
          const r = result.predictions[key];
          const isRec = key === result.recommended_model;
          const isYes = r.prediction === "Yes";
          const probYes = r.probabilities?.Yes ?? r.probabilities?.["1"];

          return (
            <div
              key={key}
              className={`relative rounded-2xl p-5 border-2 bg-white ${
                isRec ? "border-primary" : "border-slate-100"
              }`}
            >
              {isRec && <FaCrown className="absolute top-4 right-4 text-warning" />}
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                {MODEL_INFO[key].name}
              </p>
              <p className={`text-xl font-bold mb-3 ${isYes ? "text-success" : "text-danger"}`}>
                {r.prediction === "Yes" ? "Approved" : "Not Approved"}
              </p>
              {probYes !== undefined && (
                <>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-gradient-primary"
                      style={{ width: `${probYes * 100}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    {(probYes * 100).toFixed(1)}% confidence of approval
                  </p>
                </>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ResultPanel;
