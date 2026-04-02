const mongoose = require("mongoose");
const logSchema= new mongoose.Schema({
   userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  habitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Habit"
  },
  date: {
    type: Date,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Log", logSchema);