const CLASS_LABELS = { "0": "No (Rejected)", "1": "Yes (Approved)" };

const Row = ({ label, row, bold }) => (
  <tr className={bold ? "bg-surface-bg font-semibold" : ""}>
    <td className="px-4 py-2.5 text-sm text-slate-700">{label}</td>
    <td className="px-4 py-2.5 text-sm text-center font-mono">{(row.precision * 100).toFixed(1)}%</td>
    <td className="px-4 py-2.5 text-sm text-center font-mono">{(row.recall * 100).toFixed(1)}%</td>
    <td className="px-4 py-2.5 text-sm text-center font-mono">{(row["f1-score"] * 100).toFixed(1)}%</td>
    <td className="px-4 py-2.5 text-sm text-center font-mono text-slate-400">{row.support}</td>
  </tr>
);

const ClassificationReportTable = ({ report, modelName }) => {
  if (!report) return null;

  return (
    <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6 overflow-x-auto">
      <p className="font-semibold text-slate-700 mb-4">{modelName} — Classification Report</p>
      <table className="w-full min-w-[420px]">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wide text-slate-400">
            <th className="px-4 py-2">Class</th>
            <th className="px-4 py-2 text-center">Precision</th>
            <th className="px-4 py-2 text-center">Recall</th>
            <th className="px-4 py-2 text-center">F1-Score</th>
            <th className="px-4 py-2 text-center">Support</th>
          </tr>
        </thead>
        <tbody>
          <Row label={CLASS_LABELS["0"]} row={report["0"]} />
          <Row label={CLASS_LABELS["1"]} row={report["1"]} />
          <Row label="Macro Avg" row={report["macro avg"]} bold />
          <Row label="Weighted Avg" row={report["weighted avg"]} bold />
        </tbody>
      </table>
    </div>
  );
};

export default ClassificationReportTable;
