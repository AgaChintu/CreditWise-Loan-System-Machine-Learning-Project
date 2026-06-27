import { motion } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { TECH_STACK } from "../../data/datasetInfo";

const TechStack = () => {
  return (
    <section className="section-padding bg-white">
      <SectionHeading
        eyebrow="Technology Stack"
        title="Built on a Modern, Production-Ready Stack"
        description="A clean separation between the ML service, the API layer, and the user-facing application."
      />
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-9 gap-4">
        {TECH_STACK.map((tech, i) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.04, duration: 0.4 }}
            whileHover={{ y: -6, scale: 1.04 }}
            className="bg-surface-bg rounded-2xl border border-slate-100 py-6 flex flex-col items-center justify-center gap-2 hover:shadow-card-hover hover:bg-white transition-all"
          >
            <tech.icon style={{ color: tech.color }} className="text-2xl" />
            <p className="text-[11px] font-medium text-slate-600 text-center px-1">{tech.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
