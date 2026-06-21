import { useState, useEffect } from "react";
import AddHabit from "./components/AddHabit";
import Feed from "./components/Feed";
import HabitList from "./components/HabitList";
import Insights from "./components/Insights";
import Login from "./components/Login";
import DeleteUser from "./components/DeleteUser";
import * as api from "./api";

function App() {
  const [habit, setHabit] = useState("");
  const [habits, setHabits] = useState([]);
  const [feed, setFeed] = useState([]);
  const [target, setTarget] = useState(7);
  const [showInsights, setShowInsights] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [showFeed, setShowFeed] = useState(false);
  const [refreshInsights, setRefreshInsights] = useState(0);
  const [habitsLoading, setHabitsLoading] = useState(false);
  const [pendingId, setPendingId] = useState(null); 
  const [error, setError] = useState("");

  const getHabits = async () => {
    setHabitsLoading(true);
    try {
      const data = await api.getHabits();
      setHabits(data.habits);
    } catch (err) {
       console.error(err);
      setError("Couldn't load habits. Try refreshing.");
    } finally {
      setHabitsLoading(false);
    }
  };

  const getFeed = async () => {
    try {
      const data = await api.getFeed();
      setFeed(data.logs);
    } catch (err) {
      console.error(err);
    }
  };

  const sendHabit = async () => {
    if (!habit.trim()) return;
    try {
      await api.createHabit(habit, target);
      await getHabits();
      setRefreshInsights((prev) => prev + 1);
      setHabit("");
    } catch (err) {
       console.error(err);
      setError("Couldn't add habit. Try again.");
    }
  };

  const checkIn = async (habitId) => {
    setPendingId(habitId);
    try {
      await api.checkin(habitId);
      await getHabits();
      await getFeed();
      setRefreshInsights((prev) => prev + 1);
    } catch (err) {
       console.error(err);
      setError("Check-in failed. Try again.");
    } finally {
      setPendingId(null);
    }
  };

  const handleDeleteHabit = async (habitId) => {
    setPendingId(habitId);
    try {
      await api.deleteHabit(habitId);
      await getHabits();
      await getFeed();
      setRefreshInsights((prev) => prev + 1);
    } catch (err) {
       console.error(err);
      setError("Delete failed. Try again.");
    } finally {
      setPendingId(null);
    }
  };

  useEffect(() => {
    if (!token) return;
    getHabits();
    getFeed();
  }, [token]);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-2 text-slate-900">
          Consistency Tracker
        </h1>
        <p className="text-slate-500 mb-8">Track habits and stay consistent.</p>

        {error && (
          <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg px-4 py-2 mb-4 flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError("")} className="text-red-700 font-bold">×</button>
          </div>
        )}

        <h3 className="text-2xl font-semibold text-slate-800 mt-6 mb-3">Insights</h3>
        <button
          className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg"
          onClick={() => setShowInsights(!showInsights)}
        >
          {showInsights ? "Hide Insights" : "Show Insights"}
        </button>
        {showInsights && <Insights refreshInsights={refreshInsights} />}

        <h3 className="text-2xl font-semibold text-slate-800 mt-6 mb-3">Your Habits</h3>
        {habitsLoading ? (
          <p className="text-slate-500">Loading habits...</p>
        ) : (
          <HabitList
            habits={habits}
            checkIn={checkIn}
            deleteHabit={handleDeleteHabit}
            pendingId={pendingId}
          />
        )}

        <AddHabit
          habit={habit}
          setHabit={setHabit}
          sendHabit={sendHabit}
          target={target}
          setTarget={setTarget}
        />

        <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Activity Feed</h3>
            <button
              onClick={() => setShowFeed(!showFeed)}
              className="bg-slate-800 hover:bg-slate-900 text-white px-3 py-1.5 rounded-lg text-sm"
            >
              {showFeed ? "Hide" : "View"}
            </button>
          </div>
          {showFeed && <Feed feed={feed} />}
        </div>

        <div className="h-10" />
        <div className="flex gap-3 mt-8">
          <button
            className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg"
            onClick={() => {
              localStorage.removeItem("token");
              setToken(null);
              setHabits([]);
              setFeed([]);
            }}
          >
            Logout
          </button>
        </div>

        <DeleteUser setToken={setToken} setHabits={setHabits} setFeed={setFeed} />
      </div>
    </div>
  );
}

export default App;


