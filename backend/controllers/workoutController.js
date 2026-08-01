const Workout = require("../models/Workout");

// Add Workout
const addWorkout = async (req, res) => {
  try {
    const { exerciseName, category, duration, caloriesBurned, date } = req.body;

    const workout = await Workout.create({
      user: req.user._id,
      exerciseName,
      category,
      duration,
      caloriesBurned,
      date,
    });

    res.status(201).json({
      success: true,
      message: "Workout added successfully",
      workout,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Workouts
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      count: workouts.length,
      workouts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Workout
const updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found",
      });
    }

    if (workout.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const updatedWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Workout updated successfully",
      updatedWorkout,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Workout
const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found",
      });
    }

    if (workout.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await workout.deleteOne();

    res.status(200).json({
      success: true,
      message: "Workout deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addWorkout,
  getWorkouts,
  updateWorkout,
  deleteWorkout,
};