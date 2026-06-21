const express = require("express");
const router = express.Router();
const Habit=require("../models/Habit");
const verifyAuth = require("../middlewares/authMiddleware");

router.post("/create", verifyAuth,async(req, res) => {
  try{
  const  userId=req.user.userId;
 const   {title,targetPerWeek}=req.body;
 if(!title){
  return res.status(400).json({message:" title required"});
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
router.post("/checkin",verifyAuth,async (req,res)=>{
  try{
    const {habitId}=req.body;
    const userId = req.user.userId;

     const habit = await Habit.findOne({
      _id: habitId,
      userId
});
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

router.get("/",verifyAuth, async (req,res)=>{
  try{
  const userId=req.user.userId;
  const habits=await Habit.find({userId});
 
  return res.json({
    message:"habits of that user are",
    habits
  });

}
catch(err){
    res.status(500).json({ error: err.message });
  }

})


router.get("/feed", verifyAuth,async(req, res) => {
 try{
  const userId=req.user.userId;
 
  const logs=await Log.find({userId}).sort({date:-1}).limit(5).populate("habitId");
   res.json({
      message: "Feed fetched successfully",
      logs
    });
 } 
   catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete",verifyAuth,async(req,res)=>{
  try{
    const userId = req.user.userId;
    const {habitId}=req.body;
    await Habit.findOneAndDelete({ 
      _id: habitId,
      userId
    });

await Log.deleteMany({
  habitId,
  userId
});
    res.json( {message: "Habit Successfully deleted"});
  }
  catch(err){
      res.status(500).json({ error: err.message });
  }
})
router.get("/insights",verifyAuth,async(req,res)=>{
  try{
  const userId=req.user.userId;
  const logs = await Log.find({ userId });
  const habits = await Habit.find({ userId });
 
  if (!logs.length || !habits.length) {
  return res.json({  
    habitPerformance: [],
    totalLogs: 0,
    weeklyCount: 0,
    bestHabit: null,
    worstHabit: null
  });
}
const totalLogs=logs.length;
 const last7=new Date();
 last7.setDate(last7.getDate()-7);
 const weeklyLogs=logs.filter(log=> new Date(log.date)>=last7);
 const habitStats = {};
const weeklyCount = weeklyLogs.length;
weeklyLogs.forEach(log=>{
  const id=log.habitId.toString();
  if(!habitStats[id])habitStats[id]=0;
   habitStats[id]++;
});

const habitPerformance = habits.map(h => {
  const done = habitStats[h._id.toString()] || 0;
  const target = h.targetPerWeek||1;
  const score= target > 0 ? done / target : 0;
  return {
    title: h.title,
    done,
    target,
   score
  };
});
const bestHabit = habitPerformance.reduce((a, b) =>
  a.score> b.score? a : b
);
const worstHabit = habitPerformance.reduce((a, b) =>
  a.score < b.score ? a : b
);

res.json({
  habitPerformance,
  totalLogs,
  weeklyCount,
  bestHabit,
  worstHabit
});
  }
catch(err){
    res.status(500).json({ error: err.message });
}
})

module.exports = router;