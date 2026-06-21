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
const [refreshInsights, setRefreshInsights] = useState(0);

  const sendHabit = async () => {
    if (!habit.trim()) return;

    try {
      const res = await fetch("https://consistency-tracker-zwqt.onrender.com/api/habits/create", {
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
    setRefreshInsights(prev => prev + 1);
      setHabit(""); 
    } catch (err) {
      console.error(err);
    }
  };

  const getHabits= async()=>{
    try {
      const token=localStorage.getItem("token");
  const res=await fetch( `https://consistency-tracker-zwqt.onrender.com/api/habits`,{

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
    const res = await fetch("https://consistency-tracker-zwqt.onrender.com/api/habits/feed", {
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
    await fetch("https://consistency-tracker-zwqt.onrender.com/api/habits/checkin",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        
  Authorization: `Bearer ${token}`

      },
      body:JSON.stringify({habitId})
    });
    await getHabits();
    await getFeed();
    setRefreshInsights(prev => prev + 1);
  }
  catch(err){
    console.error(err);
  }

}
const deleteHabit = async (habitId) => {
  try {
    const res = await fetch("https://consistency-tracker-zwqt.onrender.com/api/habits/delete", {
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
    setRefreshInsights(prev => prev + 1);
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
   <div className="max-w-5xl mx-auto px-6 py-8">
 <h1
  className="text-4xl font-bold mb-2 text-slate-900"
>
  Consistency Tracker
</h1>
<p
 className="text-slate-500 mb-8"
>
  Track habits and stay consistent.
</p>



<h3 className="text-2xl font-semibold text-slate-800 mt-6 mb-3">Insights</h3>
<button  
  className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg"
onClick={() => setShowInsights(!showInsights)}>
  {showInsights ? "Hide Insights" : "Show Insights"}
</button>
{showInsights && <Insights token={token} refreshInsights={refreshInsights} />}




<h3 className="text-2xl font-semibold text-slate-800 mt-6 mb-3">Your Habits</h3>
<HabitList
  habits={habits}
  checkIn={checkIn}
  deleteHabit={deleteHabit}
/>

 <AddHabit 
habit={habit}
setHabit={setHabit}
sendHabit={sendHabit}
target={target}
setTarget={setTarget}
 ></AddHabit>

<div className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm">
  <div className="flex justify-between items-center mb-3">
    <h3 className="text-lg font-semibold">
      Activity Feed
    </h3>
<button
  onClick={() => setShowFeed(!showFeed)}
  className="bg-slate-800 hover:bg-slate-900 text-white px-3 py-1.5 rounded-lg text-sm"
>
  {showFeed ? "Hide" : "View"}
</button>
  </div>
  
  {showFeed && <Feed feed={feed} />}
</div>
<div className="h-10" />
<div className="flex gap-3 mt-8">
  <button

  className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg"
    onClick={() => {
      localStorage.removeItem("token");
      setToken(null);
      setHabits([]);
      setFeed([]);
    }}
  >
    Logout
  </button>

</div>
   
  <DeleteUser
    token={token}
    setToken={setToken}
    setHabits={setHabits}
    setFeed={setFeed}
  />
 </div>
 

</div>
  );

}

export default App;


