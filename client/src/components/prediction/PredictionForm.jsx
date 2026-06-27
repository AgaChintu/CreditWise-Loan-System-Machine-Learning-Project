import { motion } from "framer-motion";
import { useState } from "react";
import { FaInfoCircle, FaPaperPlane } from "react-icons/fa";
import GradientButton from "../common/GradientButton";

const NUMERIC_FIELDS = [
  { name: "Applicant_Income", label: "Applicant Income (monthly)" },
  { name: "Coapplicant_Income", label: "Coapplicant Income (monthly)" },
  { name: "Age", label: "Age" },
  { name: "Dependents", label: "Dependents" },
  { name: "Credit_Score", label: "Credit Score" },
  { name: "Existing_Loans", label: "Existing Loans" },
  { name: "DTI_Ratio", label: "Debt-to-Income Ratio" },
  { name: "Savings", label: "Savings" },
  { name: "Collateral_Value", label: "Collateral Value" },
  { name: "Loan_Amount", label: "Requested Loan Amount" },
  { name: "Loan_Term", label: "Loan Term (months)" },
];

const CATEGORICAL_FIELDS = [
  { name: "Employment_Status", label: "Employment Status" },
  { name: "Marital_Status", label: "Marital Status" },
  { name: "Loan_Purpose", label: "Loan Purpose" },
  { name: "Property_Area", label: "Property Area" },
  { name: "Education_Level", label: "Education Level" },
  { name: "Gender", label: "Gender" },
  { name: "Employer_Category", label: "Employer Category" },
];

const buildDefaults = (meta) => {
  const defaults = {};
  NUMERIC_FIELDS.forEach((f) => {
    const stat = meta?.numeric?.[f.name];
    defaults[f.name] = stat ? Math.round(stat.median * 100) / 100 : "";
  });
  CATEGORICAL_FIELDS.forEach((f) => {
    const options = meta?.categorical?.[f.name] || [];
    defaults[f.name] = options[0] || "";
  });
  return defaults;
};

const FieldWrapper = ({ label, hint, error, children }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
    {children}
    <div className="flex justify-between mt-1 min-h-[16px]">
      {hint && <p className="text-[11px] text-slate-400 flex items-center gap-1"><FaInfoCircle /> {hint}</p>}
      {error && <p className="text-[11px] text-danger">{error}</p>}
    </div>
  </div>
);

const inputClasses =
  "w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary text-sm transition-all";

const PredictionForm = ({ meta, onSubmit, loading }) => {
  const [values, setValues] = useState(() => buildDefaults(meta));
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const validate = () => {
    const newErrors = {};
    NUMERIC_FIELDS.forEach((f) => {
      const val = values[f.name];
      if (val === "" || val === null || isNaN(val)) {
        newErrors[f.name] = "Required";
        return;
      }
      const stat = meta?.numeric?.[f.name];
      if (stat && (Number(val) < stat.min * 0.5 || Number(val) > stat.max * 1.5)) {
        newErrors[f.name] = `Expected roughly ${stat.min}–${stat.max}`;
      }
    });
    CATEGORICAL_FIELDS.forEach((f) => {
      if (!values[f.name]) newErrors[f.name] = "Required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = { ...values };
    NUMERIC_FIELDS.forEach((f) => {
      payload[f.name] = Number(payload[f.name]);
    });
    onSubmit(payload);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl shadow-card border border-slate-100 p-6 sm:p-10"
    >
      <h2 className="text-xl font-bold text-slate-800 mb-1">Applicant Details</h2>
      <p className="text-sm text-slate-500 mb-7">
        Fields are pre-filled with dataset medians. Hints below each field show the
        observed min–max range in the training data.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {NUMERIC_FIELDS.map((f) => {
          const stat = meta?.numeric?.[f.name];
          return (
            <FieldWrapper
              key={f.name}
              label={f.label}
              hint={stat ? `Range: ${stat.min} – ${stat.max}` : undefined}
              error={errors[f.name]}
            >
              <input
                type="number"
                step="any"
                className={inputClasses}
                value={values[f.name]}
                onChange={(e) => handleChange(f.name, e.target.value)}
              />
            </FieldWrapper>
          );
        })}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {CATEGORICAL_FIELDS.map((f) => {
          const options = meta?.categorical?.[f.name] || [];
          return (
            <FieldWrapper key={f.name} label={f.label} error={errors[f.name]}>
              <select
                className={inputClasses}
                value={values[f.name]}
                onChange={(e) => handleChange(f.name, e.target.value)}
              >
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </FieldWrapper>
          );
        })}
      </div>

      <GradientButton type="submit" size="lg" icon={FaPaperPlane} disabled={loading} className="w-full sm:w-auto">
        {loading ? "Running Models..." : "Predict Loan Eligibility"}
      </GradientButton>
    </motion.form>
  );
};

export default PredictionForm;
