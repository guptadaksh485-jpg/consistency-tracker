const express=require ("express");
const router= express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Habit = require("../models/Habit");
const Log = require("../models/Log");
const jwt=require("jsonwebtoken");

router.post("/signup",async(req,res)=>{
    try{
        const {userName,password}=req.body;
        if(!userName || !password) {
            return res.status(400).json({message: "All username and password required" });
        }
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
      userName,
      password: hashedPassword
    });
     await user.save();
     
      const token=jwt.sign(
        {
        userId:user._id
      },
      process.env.JWT_SECRET,
      {
     expiresIn:"7d"
      })
      res.json({
  message: "Login successful",
  token
});
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
})
router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(400).json({
        message: "Wrong username or password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong username or password"
      });
    }

    const token = jwt.sign(
      {
        userId: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId required" });
    }

    await User.findByIdAndDelete(userId);

    await Habit.deleteMany({ userId });
    await Log.deleteMany({ userId });

    res.json({ message: "User deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;