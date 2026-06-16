import { useState } from "react";
import { useEffect } from "react";
import AddHabit from "./components/AddHabit";
import Feed from "./components/Feed";
import HabitList from "./components/HabitList";
import Insights from "./components/Insights";
import Login from "./components/Login";
import DeleteUser from "./components/DeleteUser";
function App() {
  const [habit, setHabit] = useState("");
  const [habits, setHabits] = useState([]);
  const [feed, setFeed] = useState([]);
  const [target, setTarget] = useState(7);
  const [showInsights, setShowInsights] = useState(true);
  const [token, setToken] =useState(localStorage.getItem("token"));
const [showFeed, setShowFeed] = useState(false);

  const sendHabit = async () => {
    if (!habit.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/api/habits/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
         Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({

  title: habit,
  targetPerWeek: target
}),
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
      const token=localStorage.getItem("token");
  const res=await fetch( `http://localhost:5000/api/habits`,{

  headers:{
    Authorization: `Bearer ${token}`
  }

  }); 
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
    const res = await fetch("http://localhost:5000/api/habits/feed", {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

const data = await res.json();
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
        
  Authorization: `Bearer ${token}`

      },
      body:JSON.stringify({habitId})
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
        
  Authorization: `Bearer ${token}`
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
useEffect(() => {
  if (!token) return;

  getHabits();
  getFeed();
}, [token]);

if (!token) {
  return <Login setToken={setToken} />;
}

  return (
   <div>
    <div  style={{
  maxWidth: "600px",
  margin: "60px auto 40px auto",
  padding: "20px",
  backgroundColor: "#ffffff",
  color: "#000",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",

}}>
 

<h2>Consistency Tracker</h2>

<h3>Add Habit</h3>
<AddHabit 
habit={habit}
setHabit={setHabit}
sendHabit={sendHabit}
target={target}
setTarget={setTarget}
 ></AddHabit>

<h3>Your Habits</h3>
<HabitList
  habits={habits}
  checkIn={checkIn}
  deleteHabit={deleteHabit}
/>
<h3>INSIGHTS</h3>
<button onClick={() => setShowInsights(!showInsights)}>
  {showInsights ? "Hide Insights" : "Show Insights"}
</button>
{showInsights && <Insights token={token} />}

<h3>Activity Feed</h3>
<button onClick={() => setShowFeed(!showFeed)}>
  {showFeed ? "Hide Activity" : "Show Activity"}
</button>
{showFeed &&<Feed feed={feed}></Feed>}
<DeleteUser
  token={token}
  setToken={setToken}
  setHabits={setHabits}
  setFeed={setFeed}
/>
    <button
  onClick={() => {
    localStorage.removeItem("token");
    setToken(null);
    setHabits([]);
    setFeed([]);
  }}
>
  Logout
</button>
<></>
 </div>
 

</div>
  );

}

export default App;


