const mongoose = require("mongoose");
const userSchema= new mongoose.Schema({
  userName:{
    type: String,
    required: true
  },
  email:{
    type:String
  },
  password:{
    type:String,
    required: true
  },
   friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group"
    }
  ]
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema);