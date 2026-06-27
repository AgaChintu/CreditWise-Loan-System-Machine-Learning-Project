import { motion } from "framer-motion";
import { FaArrowRight, FaChartBar, FaRobot, FaShieldAlt } from "react-icons/fa";
import GradientButton from "../common/GradientButton";

const FloatingBadge = ({ icon: Icon, label, value, className, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.6 }}
    className={`absolute glass-card rounded-2xl px-4 py-3 flex items-center gap-3 animate-float ${className}`}
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center text-white text-sm">
      <Icon />
    </div>
    <div>
      <p className="text-xs text-slate-500 leading-none">{label}</p>
      <p className="text-sm font-bold text-slate-800 leading-none mt-1">{value}</p>
    </div>
  </motion.div>
);

const Hero = () => {
  return (
    <section className="relative bg-gradient-hero overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.12),transparent_55%)]" />
      <div className="relative section-padding pt-28 lg:pt-32 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-card text-primary text-xs font-semibold mb-6">
            <FaRobot className="text-accent" /> AI-Powered Loan Eligibility Platform
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6">
            Credit<span className="text-gradient">Wise</span> Loan
            <br /> Approval System
          </h1>
          <p className="text-lg text-slate-600 max-w-xl mb-4 leading-relaxed">
            Built an end-to-end supervised Machine Learning pipeline using{" "}
            <span className="font-semibold text-slate-800">Logistic Regression</span>,{" "}
            <span className="font-semibold text-slate-800">K-Nearest Neighbors (KNN)</span>, and{" "}
            <span className="font-semibold text-slate-800">Naive Bayes</span> to accurately
            predict loan approval based on applicant financial and demographic information.
          </p>
          <p className="text-slate-500 max-w-xl mb-8 leading-relaxed">
            Complete Exploratory Data Analysis, Data Cleaning, Feature Engineering, Preprocessing,
            Model Training, and Performance Evaluation using Accuracy, Precision, Recall, and
            F1-Score — with the system automatically recommending the best-performing model after
            feature engineering.
          </p>
          <div className="flex flex-wrap gap-4">
            <GradientButton to="/prediction" size="lg" icon={FaArrowRight}>
              Start Prediction
            </GradientButton>
            <GradientButton to="/analytics" size="lg" variant="secondary" icon={FaChartBar}>
              View Analytics
            </GradientButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative hidden lg:block h-[420px]"
        >
          <div className="absolute inset-0 m-auto w-[340px] h-[340px] rounded-[2.5rem] bg-gradient-primary opacity-90 shadow-2xl rotate-6" />
          <div className="absolute inset-0 m-auto w-[340px] h-[340px] rounded-[2.5rem] glass-card flex flex-col items-center justify-center -rotate-3">
            <FaShieldAlt className="text-5xl text-primary mb-4" />
            <p className="text-3xl font-extrabold text-slate-900">88%</p>
            <p className="text-sm text-slate-500">Best Model Accuracy</p>
          </div>
          <FloatingBadge icon={FaChartBar} label="Models Trained" value="3 Algorithms" className="top-2 left-0" delay={0.3} />
          <FloatingBadge icon={FaRobot} label="F1-Score" value="0.81 (Top Model)" className="bottom-6 right-0" delay={0.6} />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
