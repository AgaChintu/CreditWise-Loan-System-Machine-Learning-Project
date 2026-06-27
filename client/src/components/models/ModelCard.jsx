import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const MetricPill = ({ label, value, color }) => (
  <div className="flex-1 bg-surface-bg rounded-xl px-3 py-2.5 text-center">
    <p className="text-[10px] uppercase tracking-wide text-slate-400 mb-1">{label}</p>
    <p className={`font-bold text-base ${color}`}>{value !== undefined ? `${(value * 100).toFixed(1)}%` : "—"}</p>
  </div>
);

const ModelCard = ({ info, metrics, isRecommended, delay = 0 }) => {
  const Icon = info.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      className={`relative rounded-3xl p-8 bg-white border-2 transition-all hover:shadow-card-hover ${
        isRecommended ? "border-primary shadow-card-hover" : "border-slate-100 shadow-card"
      }`}
    >
      {isRecommended && (
        <span className="absolute -top-3 left-8 px-4 py-1 rounded-full bg-gradient-primary text-white text-xs font-bold shadow-card">
          Recommended Model
        </span>
      )}

      <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center text-white text-2xl mb-5">
        <Icon />
      </div>
      <h3 className="font-bold text-2xl text-slate-800 mb-1">{info.name}</h3>
      <p className="text-sm text-secondary font-medium mb-4">{info.tagline}</p>

      <p className="text-sm text-slate-600 leading-relaxed mb-5">{info.howItWorks}</p>

      <div className="grid grid-cols-2 gap-2 mb-6">
        <MetricPill label="Accuracy" value={metrics?.accuracy} color="text-primary" />
        <MetricPill label="Precision" value={metrics?.precision} color="text-secondary" />
        <MetricPill label="Recall" value={metrics?.recall} color="text-accent" />
        <MetricPill label="F1-Score" value={metrics?.f1} color="text-success" />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <p className="text-xs font-bold text-success uppercase tracking-wide mb-2">Advantages</p>
          <ul className="space-y-1.5">
            {info.advantages.map((a) => (
              <li key={a} className="flex gap-2 text-xs text-slate-600">
                <FaCheckCircle className="text-success mt-0.5 shrink-0" /> {a}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold text-danger uppercase tracking-wide mb-2">Disadvantages</p>
          <ul className="space-y-1.5">
            {info.disadvantages.map((d) => (
              <li key={d} className="flex gap-2 text-xs text-slate-600">
                <FaTimesCircle className="text-danger mt-0.5 shrink-0" /> {d}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 pt-5 border-t border-slate-100">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Typical Use Cases</p>
        <div className="flex flex-wrap gap-2">
          {info.useCases.map((u) => (
            <span key={u} className="px-3 py-1 rounded-full bg-surface-blue text-primary text-xs font-medium">
              {u}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ModelCard;
