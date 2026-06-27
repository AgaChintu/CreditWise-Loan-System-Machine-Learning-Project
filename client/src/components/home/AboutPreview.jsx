import { FaBullseye, FaCoins, FaHandHoldingUsd } from "react-icons/fa";
import AnimatedCard from "../common/AnimatedCard";
import SectionHeading from "../common/SectionHeading";

const points = [
  {
    icon: FaBullseye,
    title: "Problem Statement",
    text: "Manual loan underwriting is slow, inconsistent, and prone to human bias. CreditWise automates initial eligibility screening using historical applicant outcomes.",
  },
  {
    icon: FaCoins,
    title: "Business Use Case",
    text: "Lenders can triage applications instantly, prioritizing manual review for borderline cases while fast-tracking clearly strong or weak applicants.",
  },
  {
    icon: FaHandHoldingUsd,
    title: "Credit Risk Analysis",
    text: "By learning from income, credit score, DTI ratio, and collateral patterns, the system quantifies default risk the same way real underwriting teams do.",
  },
];

const AboutPreview = () => {
  return (
    <section className="section-padding bg-white">
      <SectionHeading
        eyebrow="About the Project"
        title="Why Loan Prediction Matters"
        description="Machine Learning brings consistency and speed to one of lending's highest-stakes decisions."
      />
      <div className="grid md:grid-cols-3 gap-6">
        {points.map((p, i) => (
          <AnimatedCard key={p.title} delay={i * 0.1} className="p-7">
            <div className="w-12 h-12 rounded-xl bg-surface-indigo flex items-center justify-center text-secondary text-xl mb-5">
              <p.icon />
            </div>
            <h3 className="font-bold text-lg text-slate-800 mb-2">{p.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{p.text}</p>
          </AnimatedCard>
        ))}
      </div>
    </section>
  );
};

export default AboutPreview;
