function HabitCard({ habit, deleteHabit, checkIn, pendingId }) {
  const isPending = pendingId === habit._id;

  return (
    <div className="bg-white border border-slate-200 rounded-xl py-2.5 px-4 mb-3 shadow-sm flex items-center justify-between">
      <div>
        <h4 className="font-medium text-slate-900">{habit.title}</h4>
        <p className="text-xs text-slate-500">Streak: {habit.streak}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => checkIn(habit._id)}
          disabled={isPending}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg disabled:opacity-50"
        >
          {isPending ? "..." : "Done"}
        </button>
        <button
          onClick={() => deleteHabit(habit._id)}
          disabled={isPending}
          className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
export default HabitCard;