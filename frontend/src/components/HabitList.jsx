import HabitCard from "./HabitCard";

function HabitList({ habits, checkIn, deleteHabit }) {
  if (!habits || habits.length === 0) {
    return  <p>No habits yet 🚀 Start building consistency!</p>;
  }

  return (
    <div>
      {habits.map((h) => (
        <HabitCard
          key={h._id}
          habit={h}
          checkIn={checkIn}
          deleteHabit={deleteHabit}
        />
      ))}
    </div>
  );
}

export default HabitList;