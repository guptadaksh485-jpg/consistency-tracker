   function HabitCard({habit,deleteHabit,checkIn}){
    return (
     <div style={{
  marginBottom: "16px",
  padding: "16px",
  borderRadius: "12px",
  backgroundColor: "#ffffff",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
}}>

     <div>
  <h4 style={{ margin: 0 }}>{habit.title}</h4>
  <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#555" }}>
    🔥 Streak: {habit.streak}
  </p>
</div>

<div>
  <button onClick={() => checkIn(habit._id)} style={{ marginRight: "8px" }}>
    Done
  </button>
  <button onClick={() => deleteHabit(habit._id)}>
    Delete
  </button>
</div>
</div>
        )
   };
   export default HabitCard;
   