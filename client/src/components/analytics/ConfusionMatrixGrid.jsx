const ConfusionMatrixGrid = ({ matrix, modelName }) => {
  if (!matrix) return null;
  const [[tn, fp], [fn, tp]] = matrix;
  const total = tn + fp + fn + tp;

  const Cell = ({ value, correct, rowLabel, colLabel }) => (
    <div
      className={`rounded-xl p-4 text-center border ${
        correct ? "bg-success/10 border-success/30" : "bg-danger/10 border-danger/30"
      }`}
    >
      <p className={`text-2xl font-bold ${correct ? "text-success" : "text-danger"}`}>{value}</p>
      <p className="text-[10px] text-slate-500 mt-1">{((value / total) * 100).toFixed(1)}%</p>
      <p className="text-[10px] text-slate-400 mt-1">
        {rowLabel} / {colLabel}
      </p>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
      <p className="font-semibold text-slate-700 mb-4">{modelName}</p>
      <div className="grid grid-cols-[auto_1fr_1fr] gap-2 items-center text-xs">
        <div />
        <p className="text-center text-slate-400 font-medium">Predicted No</p>
        <p className="text-center text-slate-400 font-medium">Predicted Yes</p>

        <p className="text-slate-400 font-medium -rotate-0 pr-2">Actual No</p>
        <Cell value={tn} correct rowLabel="True Negative" colLabel="correct" />
        <Cell value={fp} correct={false} rowLabel="False Positive" colLabel="incorrect" />

        <p className="text-slate-400 font-medium pr-2">Actual Yes</p>
        <Cell value={fn} correct={false} rowLabel="False Negative" colLabel="incorrect" />
        <Cell value={tp} correct rowLabel="True Positive" colLabel="correct" />
      </div>
    </div>
  );
};

export default ConfusionMatrixGrid;
