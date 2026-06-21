   function HabitCard({habit,deleteHabit,checkIn}){
    return (
<div
  className="
  bg-white
  border
  border-slate-200
  rounded-xl
  py-2.5 px-4
  mb-3
  shadow-sm
  flex
  items-center
  justify-between
  "
>
     <div>
      <h4 className="font-medium text-slate-900  ">{habit.title}</h4>
 <p className="text-xs text-slate-500 ">
  Streak: {habit.streak}
</p>

</div>
<div className="flex items-center gap-2">
  <button
  onClick={() => checkIn(habit._id)}
  className="
  bg-green-600
  hover:bg-green-700
  text-white
  px-3
  py-1.5
  rounded-lg
  "
>
  Done
</button>
<button
  onClick={() => deleteHabit(habit._id)}
    className="
  px-3
  py-1.5
  rounded-lg
  bg-red-50
  text-red-600
  hover:bg-red-100
  font-medium
  "
>Delete</button>

</div>

</div>

        )
   };
   export default HabitCard;
   