import { Line } from "react-chartjs-2";
import "../../utils/chartSetup";
import { MODEL_INFO, MODEL_ORDER } from "../../data/modelInfo";

const PALETTE = ["#2563EB", "#7C3AED", "#06B6D4"];

const CurveChart = ({ title, xLabel, yLabel, curves, showDiagonal = false, suffixFn }) => {
  const datasets = MODEL_ORDER.map((key, i) => ({
    label: `${MODEL_INFO[key].name}${suffixFn ? ` ${suffixFn(key)}` : ""}`,
    data: curves[key].x.map((x, idx) => ({ x, y: curves[key].y[idx] })),
    borderColor: PALETTE[i],
    backgroundColor: PALETTE[i],
    borderWidth: 2,
    pointRadius: 0,
    tension: 0.15,
  }));

  if (showDiagonal) {
    datasets.push({
      label: "Random Classifier",
      data: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
      borderColor: "#CBD5E1",
      borderDash: [6, 6],
      pointRadius: 0,
      borderWidth: 1.5,
    });
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom", labels: { boxWidth: 12, font: { size: 11 } } },
    },
    scales: {
      x: {
        type: "linear",
        min: 0,
        max: 1,
        title: { display: true, text: xLabel, font: { size: 11 } },
        grid: { color: "#F1F5F9" },
      },
      y: {
        min: 0,
        max: 1,
        title: { display: true, text: yLabel, font: { size: 11 } },
        grid: { color: "#F1F5F9" },
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
      <p className="font-semibold text-slate-700 mb-4">{title}</p>
      <div className="h-72">
        <Line data={{ datasets }} options={options} />
      </div>
    </div>
  );
};

export default CurveChart;
