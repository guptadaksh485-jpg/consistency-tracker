function AddHabit({habit,setHabit,sendHabit,target,setTarget}){
     return (
      <div
      className="
      bg-white
      border
      border-slate-200
      rounded-xl
      py-2 px-4
      shadow-sm
      mb-6
      "
    >

 <div className="flex items-center gap-3">
   <input
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
        placeholder="Read books, Gym, Meditation..."
         className="
          flex-1
          border
          border-slate-300
          rounded-lg
          px-3
          py-2
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          "
      />
      
      <input type="number"
        value={target}
        onChange={(e) => setTarget(Number(e.target.value))}
        min="1"
        max="7"
          className="
          w-20
          border
          border-slate-300
          rounded-lg
          px-3
          py-2
          "
    />

      <button onClick={sendHabit} 
        className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-4
          py-2
          rounded-lg
          font-medium
          "
      >
        Add Habit
      </button>
 </div>
     
      </div>
     )
}
export default AddHabit;