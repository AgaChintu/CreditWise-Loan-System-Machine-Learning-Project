import { FaBalanceScale, FaProjectDiagram, FaUsers } from "react-icons/fa";

export const MODEL_INFO = {
  logistic_regression: {
    key: "logistic_regression",
    name: "Logistic Regression",
    icon: FaBalanceScale,
    tagline: "A linear, probability-based classifier",
    howItWorks:
      "Logistic Regression estimates the probability that an applicant belongs to the " +
      "'Approved' class by fitting a weighted linear combination of the input features and " +
      "passing it through a sigmoid function. The output is a probability between 0 and 1, " +
      "which is thresholded at 0.5 to produce the final Yes/No decision.",
    advantages: [
      "Highly interpretable — each feature's coefficient shows its direction and strength of influence",
      "Fast to train and to score new applicants in real time",
      "Outputs well-calibrated probabilities, not just hard labels",
      "Performs reliably even with a moderate number of features",
    ],
    disadvantages: [
      "Assumes a roughly linear relationship between features and the log-odds of approval",
      "Sensitive to multicollinearity between input features",
      "Can underperform on complex, non-linear decision boundaries",
    ],
    useCases: [
      "Credit risk scoring and loan approval (this project)",
      "Churn prediction",
      "Medical diagnosis screening",
    ],
  },
  knn: {
    key: "knn",
    name: "K-Nearest Neighbors",
    icon: FaUsers,
    tagline: "A similarity-based, instance-driven classifier",
    howItWorks:
      "KNN classifies a new applicant by looking at the 'k' most similar historical " +
      "applicants (measured by distance in the scaled feature space) and taking a majority " +
      "vote of their outcomes. This project uses k = 39, tuned during notebook experimentation. " +
      "No explicit model is 'trained' — KNN is a lazy learner that stores the training data " +
      "and computes distances at prediction time.",
    advantages: [
      "Simple, intuitive concept — decisions mirror similar real applicants",
      "No assumptions about the underlying data distribution",
      "Naturally adapts to non-linear decision boundaries",
    ],
    disadvantages: [
      "Prediction speed degrades as the dataset grows (must scan all training points)",
      "Sensitive to feature scaling — requires StandardScaler, as used here",
      "Performance is sensitive to the choice of k",
    ],
    useCases: [
      "Recommendation systems",
      "Pattern recognition",
      "Anomaly / fraud detection",
    ],
  },
  naive_bayes: {
    key: "naive_bayes",
    name: "Naive Bayes",
    icon: FaProjectDiagram,
    tagline: "A fast, probabilistic classifier built on Bayes' theorem",
    howItWorks:
      "Gaussian Naive Bayes applies Bayes' theorem while assuming every feature is " +
      "conditionally independent given the class label, and that each feature follows a " +
      "Gaussian (normal) distribution within each class. It computes the posterior probability " +
      "of approval vs. rejection for each applicant and picks the more likely class.",
    advantages: [
      "Extremely fast to train, even on larger datasets",
      "Performs well even when the 'naive' independence assumption is only approximately true",
      "Needs relatively little training data to estimate its parameters",
    ],
    disadvantages: [
      "The independence assumption rarely holds perfectly for real financial features",
      "Less expressive than models that can capture feature interactions",
      "Probability estimates can be poorly calibrated even when classification is accurate",
    ],
    useCases: [
      "Spam filtering and text classification",
      "Real-time prediction where speed matters",
      "Baseline model for quick benchmarking",
    ],
  },
};

export const MODEL_ORDER = ["logistic_regression", "knn", "naive_bayes"];
