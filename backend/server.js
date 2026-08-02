const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const nutritionRoutes = require("./routes/nutritionRoutes");
const waterRoutes = require("./routes/waterRoutes");
const goalRoutes = require("./routes/goalRoutes");
const path = require("path");

dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI ? "Found" : "Missing");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname,"uploads")));

app.use("/api/users", userRoutes);
app.use("/api/workouts",workoutRoutes);
app.use("/api/nutrition",nutritionRoutes);
app.use("/api/water",waterRoutes);
app.use("/api/goals",goalRoutes);


app.get("/", (req, res) => {
  res.send("Fitness Tracker API is Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
 
});