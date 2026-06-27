import { FaChartPie, FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { NAV_LINKS } from "../../data/datasetInfo";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-24">
      <div className="px-6 sm:px-10 lg:px-20 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center">
              <FaChartPie className="text-white text-sm" />
            </span>
            <span className="font-display font-bold text-lg text-white">
              Credit<span className="text-accent">Wise</span>
            </span>
          </div>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            An AI-powered loan eligibility prediction platform built on a transparent,
            notebook-faithful Machine Learning pipeline using Logistic Regression, KNN,
            and Naive Bayes — wrapped in a production-grade MERN application.
          </p>
          <div className="flex items-center gap-3 mt-5">
            <a href="https://wa.me/917310683331" aria-label="WhatsApp" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#25D366] transition-colors">
              <FaWhatsapp />
            </a>
            <a href="https://www.linkedin.com/in/somya-agarwal-73b3a538a?utm_source=share_via&utm_content=profile&utm_medium=member_android" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#0A66C2] transition-colors">
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com/_somya_ai_ml?igsh=ejQzbG5yeHViYW14"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#FEDA75] hover:via-[#D62976] hover:to-[#4F5BD5] transition-colors"
            >
              <FaInstagram />
            </a>
            <a href="#" aria-label="GitHub" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors">
              <FaGithub />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Navigate</h4>
          <ul className="space-y-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.path}>
                <Link to={l.path} className="hover:text-accent transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Models</h4>
          <ul className="space-y-2 text-sm">
          <li>
            <Link to="/models" className="hover:text-accent transition-colors">
            Logistic Regression
            </Link>
          </li>
          <li>
            <Link to="/models" className="hover:text-accent transition-colors">
              K-Nearest Neighbors
            </Link>
          </li>
          <li>
          <Link to="/models" className="hover:text-accent transition-colors">
          Naive Bayes
          </Link>
          </li>
        </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 px-6 sm:px-10 lg:px-20 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} CreditWise. Built for educational & demonstrative purposes.</p>
        <p>Made with React, Node.js & Python</p>
      </div>
    </footer>
  );
};

export default Footer;
