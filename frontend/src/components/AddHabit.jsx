function AddHabit({habit,setHabit,sendHabit}){
     return (
    <div>
      <input
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
        placeholder="Enter habit"
          style={{
      padding: "8px",
      width: "70%",
      marginRight: "10px"
    }}
      />

      <button onClick={sendHabit} style={{ marginLeft: "10px" }}>
        Add Habit
      </button>
      </div>
     )
}
export default AddHabit;