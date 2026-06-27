import { FaHome } from "react-icons/fa";
import GradientButton from "../components/common/GradientButton";

const NotFound = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
    <p className="text-7xl font-extrabold text-gradient mb-4">404</p>
    <h1 className="text-2xl font-bold text-slate-800 mb-2">Page Not Found</h1>
    <p className="text-slate-500 mb-8 max-w-md">
      The page you're looking for doesn't exist or has been moved.
    </p>
    <GradientButton to="/" icon={FaHome}>
      Back to Home
    </GradientButton>
  </div>
);

export default NotFound;
