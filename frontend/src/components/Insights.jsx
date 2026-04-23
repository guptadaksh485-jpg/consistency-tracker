import { useEffect, useState } from "react";

function Insights({ userId }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/habits/insights?userId=${userId}`
        );
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInsights();
  }, [userId]);

  if (!data) return <p>Loading insights...</p>;

  if (!data.habitPerformance) {
    return (
      <p style={{ marginTop: "20px" }}>
        No insights yet. Start tracking habits 🚀
      </p>
    );
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>📊 Insights</h3>

      <div style={{ marginBottom: "15px" }}>
        <h4>Total Logs: {data.totalLogs}</h4>
        <h4>This Week: {data.weeklyCount}</h4>
        <h4>🏆 Best Habit: {data.bestHabit?.title || "N/A"}</h4>
        <h4>⚠ Worst Habit: {data.worstHabit?.title || "N/A"}</h4>
      </div>

      {data.habitPerformance.map((h, i) => (
        <div
          key={i}
          style={{
            marginBottom: "10px",
            padding: "12px",
            borderRadius: "10px",
            backgroundColor: "#ffffff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
          }}
        >
          <strong>{h.title}</strong>

          <p
            style={{
              margin: "5px 0",
              color:
                h.score >= 1
                  ? "green"
                  : h.score >= 0.6
                  ? "orange"
                  : "red"
            }}
          >
            {Math.min(100, Math.round(h.score * 100))}% this week
          </p>

          
          <p style={{ fontSize: "12px", color: "#555" }}>
            {h.done} / {h.target}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Insights;