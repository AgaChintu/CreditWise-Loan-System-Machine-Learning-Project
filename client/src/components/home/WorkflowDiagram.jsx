import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import SectionHeading from "../common/SectionHeading";
import { WORKFLOW_STEPS } from "../../data/datasetInfo";

const WorkflowDiagram = () => {
  return (
    <section className="section-padding bg-surface-blue/40">
      <SectionHeading
        eyebrow="Workflow"
        title="From Raw Data to Real-Time Prediction"
        description="Every stage below mirrors the original research notebook exactly — nothing was reordered or simplified."
      />

      <div className="flex flex-wrap justify-center gap-4">
        {WORKFLOW_STEPS.map((step, i) => (
          <div key={step.title} className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              className="w-44 bg-white rounded-2xl shadow-card border border-slate-100 px-4 py-4 text-center hover:shadow-card-hover hover:-translate-y-1 transition-all"
            >
              <div className="w-8 h-8 mx-auto rounded-full bg-gradient-primary text-white text-xs font-bold flex items-center justify-center mb-2">
                {i + 1}
              </div>
              <p className="font-semibold text-sm text-slate-800 mb-1">{step.title}</p>
              <p className="text-[11px] text-slate-500 leading-snug">{step.description}</p>
            </motion.div>
            {i < WORKFLOW_STEPS.length - 1 && (
              <FaArrowRight className="hidden lg:block text-slate-300 shrink-0" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkflowDiagram;
