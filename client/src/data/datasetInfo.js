import {
  FaChartLine,
  FaCode,
  FaDatabase,
  FaNodeJs,
  FaPython,
  FaReact,
} from "react-icons/fa";
import { SiExpress, SiMongodb, SiNumpy, SiPandas, SiScikitlearn, SiTailwindcss } from "react-icons/si";

export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About Project", path: "/about" },
  { label: "Models", path: "/models" },
  { label: "Prediction", path: "/prediction" },
  { label: "Analytics", path: "/analytics" },
  { label: "Prediction History", path: "/history" },
  { label: "Contact", path: "/contact" },
];

export const WORKFLOW_STEPS = [
  { title: "Dataset", description: "1,000 applicant records with 19 financial & demographic attributes" },
  { title: "EDA", description: "Class balance, income & credit-score distributions, correlation analysis" },
  { title: "Cleaning", description: "Mean imputation for numeric fields, mode imputation for categorical fields" },
  { title: "Feature Engineering", description: "DTI² , Credit Score², log-transformed income for non-linear signal" },
  { title: "Encoding", description: "Label encoding + one-hot encoding (drop-first) for categorical fields" },
  { title: "Scaling", description: "StandardScaler applied after the train/test split to prevent leakage" },
  { title: "Training", description: "Logistic Regression, KNN (k=39), and Gaussian Naive Bayes" },
  { title: "Evaluation", description: "Accuracy, Precision, Recall, F1-Score, Confusion Matrix, ROC/PR curves" },
  { title: "Prediction", description: "Live applicant data scored by all three models in real time" },
];

export const TECH_STACK = [
  { name: "React", icon: FaReact, color: "#2563EB" },
  { name: "Node.js", icon: FaNodeJs, color: "#10B981" },
  { name: "Express", icon: SiExpress, color: "#334155" },
  { name: "MongoDB", icon: SiMongodb, color: "#10B981" },
  { name: "Python", icon: FaPython, color: "#2563EB" },
  { name: "Scikit-learn", icon: SiScikitlearn, color: "#F59E0B" },
  { name: "Pandas", icon: SiPandas, color: "#7C3AED" },
  { name: "NumPy", icon: SiNumpy, color: "#06B6D4" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
];

export const WHY_PROJECT_POINTS = [
  {
    icon: FaChartLine,
    title: "Real Credit-Risk Signal",
    text: "Trained on financial and demographic features that mirror what lenders actually evaluate — income, credit score, DTI ratio, collateral, and employment stability.",
  },
  {
    icon: FaDatabase,
    title: "Transparent Pipeline",
    text: "Every preprocessing, encoding, and scaling step is preserved exactly from the original research notebook — no hidden shortcuts between research and production.",
  },
  {
    icon: FaCode,
    title: "Production Architecture",
    text: "A decoupled Python ML service, a Node.js/Express API layer, and a React SPA — the same pattern used by real fintech and SaaS platforms.",
  },
];
