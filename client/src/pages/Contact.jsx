import { motion } from "framer-motion";
import { useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedin, FaPaperPlane } from "react-icons/fa";
import GradientButton from "../components/common/GradientButton";
import SectionHeading from "../components/common/SectionHeading";

const inputClasses =
  "w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary text-sm transition-all";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="section-padding max-w-5xl mx-auto">
      <SectionHeading
        eyebrow="Get in Touch"
        title="Questions About CreditWise?"
        description="Whether it's about the ML pipeline, the architecture, or collaborating — reach out below."
      />

      <div className="grid lg:grid-cols-5 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 bg-gradient-primary rounded-3xl p-8 text-white flex flex-col justify-between"
        >
          <div>
            <h3 className="text-xl font-bold mb-4">Project Contact</h3>
            <p className="text-white/80 text-sm leading-relaxed mb-8">
              CreditWise is a demonstration of a production-grade, notebook-faithful ML
              application. For questions about the pipeline, architecture, or to discuss
              improvements, use the form or reach out directly.
            </p>
          </div>
          <div className="space-y-4 text-sm">
            <a href="mailto:agarwalsomya796@gmail.com" className="flex items-center gap-3 hover:text-accent transition-colors">
              <FaEnvelope /> agarwalsomya796@gmail.com
            </a>
            <a href="#" className="flex items-center gap-3 hover:text-accent transition-colors">
              <FaGithub /> github.com/your-username/creditwise
            </a>
            <a href="#" className="flex items-center gap-3 hover:text-accent transition-colors">
              <FaLinkedin /> Linkedin.com
            </a>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="lg:col-span-3 bg-white rounded-3xl shadow-card border border-slate-100 p-8 space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
            <input
              required
              className={inputClasses}
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
            <input
              type="email"
              required
              className={inputClasses}
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
            <textarea
              required
              rows={5}
              className={inputClasses}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            />
          </div>
          <GradientButton type="submit" size="lg" icon={FaPaperPlane}>
            Send Message
          </GradientButton>
          {sent && (
            <p className="text-success text-sm font-medium">
              Thanks for reaching out — this is a demo form, but in production this would
              dispatch to your support inbox.
            </p>
          )}
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;
