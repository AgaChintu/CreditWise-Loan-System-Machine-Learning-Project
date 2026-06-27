import { FaExclamationTriangle } from "react-icons/fa";

export const Loader = ({ label = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center py-20 gap-4">
    <div className="w-12 h-12 rounded-full border-4 border-surface-blue border-t-primary animate-spin" />
    <p className="text-slate-500 text-sm">{label}</p>
  </div>
);

export const ErrorState = ({ message = "Something went wrong.", onRetry }) => (
  <div className="flex flex-col items-center justify-center py-20 gap-4 text-center px-6">
    <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
      <FaExclamationTriangle className="text-danger text-xl" />
    </div>
    <p className="text-slate-600 max-w-md">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold shadow-card hover:shadow-card-hover transition-all"
      >
        Try Again
      </button>
    )}
  </div>
);
