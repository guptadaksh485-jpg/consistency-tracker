import HabitCard from "./HabitCard";

function HabitList({ habits, checkIn, deleteHabit, pendingId }) {
  if (!habits || habits.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 py-3 px-4 shadow-sm mb-3">
        <p className="text-slate-500">No habits yet. Create your first habit.</p>
      </div>
    );
  }

  return (
    <div>
      {habits.map((h) => (
        <HabitCard
          key={h._id}
          habit={h}
          checkIn={checkIn}
          deleteHabit={deleteHabit}
          pendingId={pendingId}
        />
      ))}
    </div>
  );
}
export default HabitList;