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

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>📊 Insights</h3>

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
              color: h.done >= h.target ? "green" : "red"
            }}
          >
            {h.done} / {h.target} this week
          </p>
        </div>
      ))}
    </div>
  );
}

export default Insights;