import AnimatedCard from "../common/AnimatedCard";
import SectionHeading from "../common/SectionHeading";
import { WHY_PROJECT_POINTS } from "../../data/datasetInfo";

const WhyProject = () => {
  return (
    <section className="section-padding bg-surface-violet/40">
      <SectionHeading
        eyebrow="Why This Project"
        title="More Than a College Assignment"
        description="CreditWise is engineered the way a real fintech product would be — research-grade ML, wrapped in a production-grade application."
      />
      <div className="grid md:grid-cols-3 gap-6">
        {WHY_PROJECT_POINTS.map((p, i) => (
          <AnimatedCard key={p.title} delay={i * 0.1} className="p-7 glass-card">
            <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center text-white text-xl mb-5">
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

export default WhyProject;
