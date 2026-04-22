const express = require("express");
const router = express.Router();
const Habit=require("../models/Habit");

router.post("/create", async(req, res) => {
  try{
 const   {userId,title,targetPerWeek}=req.body;
 if(!userId ||!title){
  return res.status(400).json({message:"userID and title required"});
 }
 const newHabit =new Habit({userId,title, targetPerWeek: targetPerWeek || 7});
await newHabit.save();

    res.status(201).json({
      message: "Habit created successfully",
      habit: newHabit
    });
  
}catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const Log = require("../models/Log");
router.post("/checkin",async (req,res)=>{
  try{
    const {habitId}=req.body;
    const habit=await Habit.findById(habitId);
    if(!habit){
      return res.status(404).json({message:"Habit not found"});
    }
  const today=new Date();
  const last=habit.lastCompleted;
  const todayStr=today.toDateString();
  const lastStr=last?new Date(last).toDateString():null;
  if(todayStr===lastStr){
    return res.json({message:"Already checked in today"});
  }
  const yesterday=new Date();
 yesterday.setDate(today.getDate()-1);
 const yesterdayStr=yesterday.toDateString();
 if(lastStr===yesterdayStr){
  habit.streak+=1;
 }
 else habit.streak=1;
  habit.lastCompleted=today;
  await habit.save();
  await Log.create({
    userId:habit.userId,
    habitId:habit._id,
    date:today
  });
  res.json(
     { message: "Check-in successful",
      streak: habit.streak}
   );

  }
  catch(err){
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req,res)=>{
  try{const {userId}=req.query;
  const habits=await Habit.find({userId});
  if (!userId) {
  return res.status(400).json({ message: "userId required" });
}
  return res.json({
    message:"habits of that user are",
    habits
  });

}
catch(err){
    res.status(500).json({ error: err.message });
  }

})


router.get("/feed", async(req, res) => {
 try{
  const userId=req.query.userId;
  if(!userId){ return res.status(400).json({ message: "userId required" });}
  const logs=await Log.find({userId}).sort({date:-1}).limit(10).populate("habitId");
   res.json({
      message: "Feed fetched successfully",
      logs
    });
 } 
   catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete",async(req,res)=>{
  try{
    const {habitId}=req.body;
    await Habit.findByIdAndDelete(habitId);
    res.json( {message: "Habit Successfully deleted"});
  }
  catch(err){
      res.status(500).json({ error: err.message });
  }
})
router.get("/insights",async(req,res)=>{
  try{
  const {userId}=req.query;
  const logs = await Log.find({ userId });
  const habits = await Habit.find({ userId });
  if (!logs.length) {
  return res.json({
    message: "No data yet"
  });
}
 const last7=new Date;
 last7.setDate(last7.getDate()-7);
 const weeklyLogs=logs.filter(log=> new Date(log.date)>=last7);
 const habitStats = {};

weeklyLogs.forEach(logs=>{
  const id=logs.habitId.toString();
  if(!habitStats[id])habitStats[id]=0;
   habitStats[id]++;
});

const habitPerformance = habits.map(h => ({
  title: h.title,
  done: habitStats[h._id] || 0,
  target: h.targetPerWeek
}));

res.json({
  habitPerformance
});
  }
catch(err){
    res.status(500).json({ error: err.message });
}
})

module.exports = router;