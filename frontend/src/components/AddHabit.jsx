function AddHabit({habit,setHabit,sendHabit}){
     return (
    <div>
      <input
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
        placeholder="Enter habit"
      />

      <button onClick={sendHabit} style={{ marginLeft: "10px" }}>
        Add Habit
      </button>
      </div>
     )
}
export default AddHabit;