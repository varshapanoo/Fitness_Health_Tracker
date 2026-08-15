const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    exerciseName: {
      type: String,
      required: [true, "Exercise name is required"],
      trim: true,
      minlength: [2, "Exercise name must be at least 2 characters"],
      maxlength: [100, "Exercise name cannot exceed 100 characters"],
    },

    category: {
      type: String,
      required: [true, "Workout category is required"],
      enum: [
        "Cardio",
        "Strength",
        "Yoga",
        "HIIT",
        "Cycling",
        "Walking",
        "Stretching",
        "Other",
      ],
      default: "Other",
      trim: true,
    },

    duration: {
      type: Number,
      required: [true, "Duration is required"],
      min: [1, "Duration must be at least 1 minute"],
      max: [1440, "Duration cannot exceed 1440 minutes"],
    },

    caloriesBurned: {
      type: Number,
      required: [true, "Calories burned is required"],
      min: [0, "Calories burned cannot be negative"],
      max: [50000, "Calories burned value is too high"],
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Workout", workoutSchema);