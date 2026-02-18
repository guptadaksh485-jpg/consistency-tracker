const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Backend running");
});
app.post("/habit", (req, res) => {
  console.log(req.body);
  res.json({ message: "Habit received" });
});
app.listen(5000, () => console.log("Server running"));

