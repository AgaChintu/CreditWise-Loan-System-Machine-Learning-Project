import AboutPreview from "../components/home/AboutPreview";
import CTASection from "../components/home/CTASection";
import Hero from "../components/home/Hero";
import TechStack from "../components/home/TechStack";
import WhyProject from "../components/home/WhyProject";
import WorkflowDiagram from "../components/home/WorkflowDiagram";

const Home = () => {
  return (
    <>
      <Hero />
      <AboutPreview />
      <WorkflowDiagram />
      <TechStack />
      <WhyProject />
      <CTASection />
    </>
  );
};

export default Home;
