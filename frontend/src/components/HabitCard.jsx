   function HabitCard({habit,deleteHabit,checkIn}){
    return (
      <div style={{ margin: "10px", border: "1px solid gray", padding: "10px" }}>
      <h3>{habit.title}</h3>
      <p>Streak: {habit.streak}</p>

      <button onClick={() => checkIn(habit._id)}>Done</button>
      <button onClick={() => deleteHabit(habit._id)}>Delete</button>
    </div>
        )
   };
   export default HabitCard;
   