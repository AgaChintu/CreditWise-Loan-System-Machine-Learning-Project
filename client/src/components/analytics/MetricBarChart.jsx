import { Bar } from "react-chartjs-2";
import "../../utils/chartSetup";
import { MODEL_INFO, MODEL_ORDER } from "../../data/modelInfo";

const PALETTE = ["#2563EB", "#7C3AED", "#06B6D4"];

const MetricBarChart = ({ metrics, metricKey, label }) => {
  const data = {
    labels: MODEL_ORDER.map((k) => MODEL_INFO[k].name),
    datasets: [
      {
        label,
        data: MODEL_ORDER.map((k) => +(metrics[k][metricKey] * 100).toFixed(2)),
        backgroundColor: PALETTE,
        borderRadius: 10,
        maxBarThickness: 64,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx) => `${ctx.formattedValue}%` } },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { callback: (v) => `${v}%` },
        grid: { color: "#F1F5F9" },
      },
      x: { grid: { display: false } },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
      <p className="font-semibold text-slate-700 mb-4">{label}</p>
      <div className="h-56">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default MetricBarChart;
