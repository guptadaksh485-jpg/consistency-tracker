import { useState } from "react";
import { useEffect } from "react";
import AddHabit from "./components/Addhabit";
import Feed from "./components/Feed";
import HabitList from "./components/HabitList";
function App() {
  const [habit, setHabit] = useState("");
  const [habits, setHabits] = useState([]);
  const [feed, setFeed] = useState([]);
  const userId = "67e3a1f2c123456789abcd12";


  const sendHabit = async () => {
    if (!habit.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/api/habits/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, title: habit }),
      });

      const data = await res.json();
      console.log(data);
    await getHabits();
      setHabit(""); 
    } catch (err) {
      console.error(err);
    }
  };

  const getHabits= async()=>{
    try {
  const res=await fetch( `http://localhost:5000/api/habits?userId=${userId}`); 
    if (!res.ok) { throw new Error("Request failed"); }
     const data=await res.json();
      setHabits(data.habits);
  
}
  catch (err) {
    console.error(err);
  }
  }
  
const getFeed=async()=>{
   try{
   const feed=await fetch(`http://localhost:5000/api/habits/feed?userId=${userId}`);
   const data=await feed.json();
   setFeed(data.logs);
   }
   
   catch(err){
    console.error(err);
  }
}
 
const checkIn=async(habitId)=>{
  try{
    await fetch("http://localhost:5000/api/habits/checkin",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify({habitId,userId})
    });
    await getHabits();
    await getFeed();
  }
  catch(err){
    console.error(err);
  }

}
const deleteHabit = async (habitId) => {
  try {
    const res = await fetch("http://localhost:5000/api/habits/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ habitId }),
    });

    if (!res.ok) throw new Error("Delete failed");

    await getHabits();
    await getFeed();
  } catch (err) {
    console.error(err);
  }
};

useEffect(()=>{ getHabits(); getFeed();},[userId]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Habit Tracker</h2>
<AddHabit 
habit={habit}
setHabit={setHabit}
sendHabit={sendHabit}
 ></AddHabit>

<HabitList
  habits={habits}
  checkIn={checkIn}
  deleteHabit={deleteHabit}
/>
      <h3>Activity Feed</h3>
<Feed feed={feed}></Feed>
    </div>
    

  );
}

export default App;


