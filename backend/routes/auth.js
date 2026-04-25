const express=require ("express");
const router= express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

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
     
       res.json({
      message: "User created",
      userId: user._id
    })
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
})
router.post("/login",async(req,res)=>{
   try{ const {userName,password}=req.body;
    const user=await User.findOne({userName});
    if(!user){
        return res.status(400).json({
            message:"Wrong username or password"
        });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({
            message:"Wrong username or password"
        });
    }

      res.json({
      message: "Login successful",
      userId: user._id
    });
}
    catch (err) {
    res.status(500).json({ error: err.message });
  }

});

module.exports = router;