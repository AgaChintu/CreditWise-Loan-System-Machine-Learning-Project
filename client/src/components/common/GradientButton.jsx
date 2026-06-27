import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

const variants = {
  primary: "bg-gradient-primary text-white shadow-card hover:shadow-card-hover",
  secondary: "bg-white text-primary border-2 border-primary/20 hover:border-primary/50 shadow-card",
  outline: "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const GradientButton = ({
  children,
  to,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  icon: Icon,
}) => {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const content = (
    <motion.span
      className="inline-flex items-center gap-2"
      whileHover={{ scale: disabled ? 1 : 1.04 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
    >
      {children}
      {Icon && <Icon />}
    </motion.span>
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  );
};

export default GradientButton;
