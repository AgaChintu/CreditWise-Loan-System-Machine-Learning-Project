import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import About from "./pages/About";
import Analytics from "./pages/Analytics";
import Contact from "./pages/Contact";
import History from "./pages/History";
import Home from "./pages/Home";
import Models from "./pages/Models";
import NotFound from "./pages/NotFound";
import Prediction from "./pages/Prediction";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/models" element={<Models />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/history" element={<History />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
