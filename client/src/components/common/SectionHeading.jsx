import { motion } from "framer-motion";

const SectionHeading = ({ eyebrow, title, description, align = "center" }) => {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`max-w-2xl mb-12 ${alignment}`}
    >
      {eyebrow && (
        <span className="inline-block px-4 py-1.5 rounded-full bg-surface-blue text-primary text-xs font-semibold tracking-wide uppercase mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">{title}</h2>
      {description && <p className="text-slate-500 leading-relaxed">{description}</p>}
    </motion.div>
  );
};

export default SectionHeading;
