import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl bg-gradient-primary overflow-hidden px-8 sm:px-16 py-14 text-center"
      >
        <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-white/10" />
        <div className="absolute -bottom-16 -left-10 w-72 h-72 rounded-full bg-white/10" />

        <h2 className="relative text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to See Your Loan Eligibility?
        </h2>
        <p className="relative text-white/80 max-w-xl mx-auto mb-8">
          Enter your financial details and let three independently trained Machine Learning
          models evaluate your loan application in real time.
        </p>

        <div className="relative">
          <Link
            to="/prediction"
            className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold text-lg px-8 py-4 rounded-full shadow-xl hover:bg-blue-50 hover:scale-105 transition-all duration-300"
          >
            Get Started Now
            <FaArrowRight />
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;