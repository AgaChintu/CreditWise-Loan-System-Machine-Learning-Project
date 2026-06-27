import { useEffect, useState } from "react";
import { deleteHistoryItem, fetchHistory } from "../api/predictionApi";
import { ErrorState, Loader } from "../components/common/Loader";
import SectionHeading from "../components/common/SectionHeading";
import HistoryTable from "../components/history/HistoryTable";

const History = () => {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [status, setStatus] = useState("loading");

  const load = async (page = 1) => {
    setStatus("loading");
    try {
      const res = await fetchHistory(page, 10);
      setItems(res.data);
      setPagination(res.pagination);
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  useEffect(() => {
    load(1);
  }, []);

  const handleDelete = async (id) => {
    await deleteHistoryItem(id);
    setItems((prev) => prev.filter((i) => i._id !== id));
  };

  return (
    <div className="section-padding max-w-4xl mx-auto">
      <SectionHeading
        eyebrow="History"
        title="Prediction History"
        description="Every prediction run through CreditWise is logged here, with the full applicant input and each model's verdict."
      />

      {status === "loading" && <Loader label="Loading prediction history..." />}
      {status === "error" && (
        <ErrorState
          message="Could not load history. Make sure MongoDB is connected and the backend is running."
          onRetry={() => load(pagination.page)}
        />
      )}

      {status === "success" && (
        <>
          <HistoryTable items={items} onDelete={handleDelete} />

          {pagination.pages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => load(p)}
                  className={`w-9 h-9 rounded-full text-sm font-medium transition-colors ${
                    p === pagination.page ? "bg-gradient-primary text-white" : "bg-white border border-slate-200 text-slate-600"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default History;
