import { motion } from "framer-motion";

const AnimatedCard = ({ children, delay = 0, className = "", hover = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -6 } : undefined}
      className={`bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-shadow border border-slate-100 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
