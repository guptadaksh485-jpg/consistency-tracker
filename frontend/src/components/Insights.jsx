import { useEffect, useState } from "react";

function Insights({ token ,refreshInsights}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await fetch(
          `https://consistency-tracker-zwqt.onrender.com/api/habits/insights`,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInsights();
  }, [token, refreshInsights]);

  if (!data) return <p>Loading insights...</p>;

  if (!data.habitPerformance) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mt-4">
  <p className="text-slate-500">
    No insights yet. Start tracking habits.
  </p>
</div>
    );
  }

  return (

  <div className="mt-5">

    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-5">
  <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm text-center">
    <p className="text-sm text-slate-500">Total Logs</p>
    <h3 className="text-2xl font-bold mt-1">{data.totalLogs}</h3>
  </div>

  <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm text-center">
    <p className="text-sm text-slate-500">This Week</p>
    <h3 className="text-2xl font-bold mt-1">{data.weeklyCount}</h3>
  </div>

  <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm text-center">
    <p className="text-sm text-slate-500">Best Habit</p>
    <h3 className="font-semibold mt-1">
      {data.bestHabit?.title || "N/A"}
    </h3>
  </div>

  <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm text-center">
    <p className="text-sm text-slate-500">Worst Habit</p>
    <h3 className="font-semibold mt-1">
      {data.worstHabit?.title || "N/A"}
    </h3>
  </div>

</div>
    {data.habitPerformance.map((h, i) => {
      const percent = Math.min(100, Math.round(h.score * 100));

      return (
        <div
          key={i}
          className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm mb-3"
        >
          <div className="flex justify-between items-center mb-2">
            <div>
              <h4 className="font-semibold">{h.title}</h4>
              <p className="text-sm text-slate-500">
                {h.done}/{h.target}
              </p>
            </div>

            <span
              className={`font-semibold ${
                percent >= 100
                  ? "text-green-600"
                  : percent >= 60
                  ? "text-orange-500"
                  : "text-red-500"
              }`}
            >
              {percent}%
            </span>
          </div>

          <div className="w-full bg-slate-200 h-2 rounded-full">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      );
    })}
  </div>);}


export default Insights;