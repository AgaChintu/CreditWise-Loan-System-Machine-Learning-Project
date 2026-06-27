import { motion } from "framer-motion";
import {
  FaBullseye,
  FaChartBar,
  FaCogs,
  FaDatabase,
  FaExclamationCircle,
  FaFlask,
  FaLayerGroup,
  FaRocket,
} from "react-icons/fa";
import AnimatedCard from "../components/common/AnimatedCard";
import SectionHeading from "../components/common/SectionHeading";

const Block = ({ icon: Icon, title, children, id }) => (
  <AnimatedCard className="p-8" id={id}>
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-xl bg-surface-blue flex items-center justify-center text-primary text-lg">
        <Icon />
      </div>
      <h3 className="font-bold text-xl text-slate-800">{title}</h3>
    </div>
    <div className="text-slate-600 leading-relaxed text-sm space-y-3">{children}</div>
  </AnimatedCard>
);

const About = () => {
  return (
    <div className="section-padding max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-surface-blue text-primary text-xs font-semibold tracking-wide uppercase mb-4">
          About the Project
        </span>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          From Research Notebook to Production Platform
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          A closer look at the motivation, dataset, methodology, and engineering decisions
          behind CreditWise.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Block icon={FaBullseye} title="Project Motivation">
          <p>
            Loan underwriting is traditionally a manual, document-heavy process where decisions
            depend heavily on an individual officer's judgment. CreditWise was built to explore
            whether a transparent, well-evaluated Machine Learning pipeline could provide a
            consistent first-pass eligibility signal — not to replace human underwriters, but to
            give them a faster, data-driven starting point.
          </p>
        </Block>

        <Block icon={FaExclamationCircle} title="Business Problem">
          <p>
            Lenders need to evaluate large volumes of applications quickly while controlling
            default risk. A model that reliably separates likely-approved from likely-rejected
            applicants — and explains <em>why</em> — reduces both processing time and exposure to
            inconsistent decision-making across reviewers.
          </p>
        </Block>
      </div>

      <Block icon={FaDatabase} title="Dataset Information" id="dataset">
        <p>
          The source dataset contains <strong>1,000 applicant records</strong> across{" "}
          <strong>20 columns</strong>: a unique applicant identifier, 18 financial/demographic
          features, and the binary target <code className="text-primary">Loan_Approved</code>.
        </p>
        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1 list-disc list-inside mt-2">
          <li>Applicant &amp; Coapplicant Income</li>
          <li>Employment Status &amp; Employer Category</li>
          <li>Age, Marital Status, Dependents</li>
          <li>Credit Score &amp; Existing Loans</li>
          <li>Debt-to-Income (DTI) Ratio</li>
          <li>Savings &amp; Collateral Value</li>
          <li>Loan Amount &amp; Loan Term</li>
          <li>Loan Purpose, Property Area, Education Level, Gender</li>
        </ul>
        <p className="mt-2">
          Every column — including the target — contained exactly <strong>50 missing values
          (5%)</strong>, consistent with a deliberately synthesized real-world-style dataset
          rather than a perfectly clean one.
        </p>
      </Block>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <Block icon={FaChartBar} title="EDA Summary" id="eda">
          <p>
            Exploratory analysis surfaced a moderately imbalanced target: after imputing the 50
            missing labels with the most frequent class, the dataset settles at roughly{" "}
            <strong>70% "No"</strong> and <strong>30% "Yes"</strong> outcomes. This imbalance is
            the reason <strong>F1-Score</strong> — not raw accuracy — was used as the automatic
            criterion for recommending the best model.
          </p>
          <p>
            Distribution checks on income, credit score, and DTI ratio guided which numeric
            fields were strong candidates for non-linear feature engineering later in the
            pipeline.
          </p>
        </Block>

        <Block icon={FaLayerGroup} title="Feature Engineering Summary" id="feature-engineering">
          <p>Three engineered features were added in the final pipeline round:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><code>DTI_Ratio_sq</code> — squared debt-to-income ratio, to capture accelerating risk at high leverage</li>
            <li><code>Credit_Score_sq</code> — squared credit score, to emphasize separation at the high end of the scale</li>
            <li><code>Applicant_Income_log</code> — log-transformed income, to reduce the influence of extreme high earners</li>
          </ul>
          <p>The raw <code>Credit_Score</code> and <code>DTI_Ratio</code> columns were dropped in favor of their engineered counterparts.</p>
        </Block>
      </div>

      <Block icon={FaCogs} title="Machine Learning Pipeline" id="pipeline">
        <p>The exact sequence preserved from the notebook, end to end:</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Mean imputation (numeric columns) and most-frequent imputation (categorical columns)</li>
          <li>Drop the <code>Applicant_ID</code> identifier column</li>
          <li>Label-encode <code>Education_Level</code> and the target <code>Loan_Approved</code></li>
          <li>One-hot encode 6 nominal columns with <code>drop="first"</code></li>
          <li>Engineer <code>DTI_Ratio_sq</code>, <code>Credit_Score_sq</code>, <code>Applicant_Income_log</code></li>
          <li>80/20 train-test split with <code>random_state=42</code></li>
          <li>Fit <code>StandardScaler</code> on training data only (no leakage)</li>
          <li>Train Logistic Regression, KNN (k=39), and Gaussian Naive Bayes</li>
          <li>Evaluate with Accuracy, Precision, Recall, F1, Confusion Matrix, ROC &amp; PR curves</li>
        </ol>
      </Block>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <Block icon={FaFlask} title="Challenges Faced" id="challenges">
          <ul className="list-disc list-inside space-y-1">
            <li>Preventing data leakage by fitting the scaler only on training data, after the split</li>
            <li>Choosing a fair model-selection metric given target class imbalance</li>
            <li>Keeping the FastAPI inference path byte-for-byte consistent with the training-time transformations</li>
            <li>Designing a single source of truth for evaluation metrics so the frontend never hardcodes numbers</li>
          </ul>
        </Block>

        <Block icon={FaRocket} title="Future Improvements" id="future">
          <ul className="list-disc list-inside space-y-1">
            <li>Hyperparameter tuning (e.g. grid search over KNN's k, regularization strength for Logistic Regression)</li>
            <li>Adding ensemble models (Random Forest, Gradient Boosting) for comparison</li>
            <li>SHAP-based explainability for individual predictions</li>
            <li>Authentication so prediction history is scoped per logged-in user</li>
          </ul>
        </Block>
      </div>
    </div>
  );
};

export default About;
