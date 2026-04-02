
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
const habitRoutes = require("./routes/habitRoutes");
app.use("/api/habits", habitRoutes);


app.get("/", (req, res) => {
  res.send("Backend running");
});
app.listen(5000, () => console.log("Server running"));

