import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaChartPie, FaTimes } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { NavLink, useLocation } from "react-router-dom";
import { NAV_LINKS } from "../../data/datasetInfo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-xl shadow-card" : "bg-white/40 backdrop-blur-md"
      }`}
    >
      <nav className="flex items-center justify-between px-6 sm:px-10 lg:px-20 h-18 py-3">
        <NavLink to="/" className="flex items-center gap-2 group">
          <span className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-card group-hover:scale-105 transition-transform">
            <FaChartPie className="text-white text-sm" />
          </span>
          <span className="font-display font-bold text-lg text-slate-800">
            Credit<span className="text-gradient">Wise</span>
          </span>
        </NavLink>

        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary bg-surface-blue"
                      : "text-slate-600 hover:text-primary hover:bg-surface-blue/60"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <NavLink
          to="/prediction"
          className="hidden lg:inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold shadow-card hover:shadow-card-hover hover:scale-105 transition-all"
        >
          Start Prediction
        </NavLink>

        <button
          className="lg:hidden text-2xl text-slate-700 p-2"
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <FaTimes /> : <HiOutlineMenuAlt3 />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 overflow-hidden"
          >
            <ul className="flex flex-col px-6 py-4 gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl text-sm font-medium ${
                        isActive ? "text-primary bg-surface-blue" : "text-slate-600"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.li>
              ))}
              <NavLink
                to="/prediction"
                className="mt-2 inline-flex justify-center items-center px-5 py-3 rounded-full bg-gradient-primary text-white text-sm font-semibold shadow-card"
              >
                Start Prediction
              </NavLink>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
