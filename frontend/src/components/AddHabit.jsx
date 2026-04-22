function AddHabit({habit,setHabit,sendHabit,target,setTarget}){
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
      <input type="number"
        value={target}
        onChange={(e) => setTarget(Number(e.target.value))}
        min="1"
        max="7"
        style={{ width: "60px", marginRight: "10px" }}/>
      <span style={{ marginRight: "5px" }}>x/week</span>
      <button onClick={sendHabit} style={{ marginLeft: "10px" }}>
        Add Habit
      </button>
      </div>
     )
}
export default AddHabit;