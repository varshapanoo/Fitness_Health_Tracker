const express = require("express");
const router = express.Router();

const {
  addWorkout,
  getWorkouts,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");

const { protect } = require("../middleware/authMiddleware");

// Add Workout
router.post("/", protect, addWorkout);

// Get All Workouts
router.get("/", protect, getWorkouts);

// Update Workout
router.put("/:id", protect, updateWorkout);

// Delete Workout
router.delete("/:id", protect, deleteWorkout);

module.exports = router;