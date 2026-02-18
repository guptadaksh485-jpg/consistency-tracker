import { useState } from "react";

function App() {
  const [habit, setHabit] = useState("");

  const sendHabit = async () => {
    await fetch("http://localhost:5000/habit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: habit }),
    });
  };

  return (
    <div>
      <input
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
        placeholder="Enter habit"
      />
      <button onClick={sendHabit}>Send</button>
    </div>
  );
}

export default App;
