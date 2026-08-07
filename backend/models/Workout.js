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
    },

    duration: {
      type: Number,
      required: [true, "Duration is required"],
      min: [1, "Duration must be at least 1 minute"],
    },

    caloriesBurned: {
      type: Number,
      required: [true, "Calories burned is required"],
      min: [0, "Calories burned cannot be negative"],
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