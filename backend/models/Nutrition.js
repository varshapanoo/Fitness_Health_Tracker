const mongoose = require("mongoose");

const nutritionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    foodName: {
      type: String,
      required: [true, "Food name is required"],
      trim: true,
      minlength: [2, "Food name must be at least 2 characters"],
      maxlength: [100, "Food name cannot exceed 100 characters"],
    },

    calories: {
      type: Number,
      required: [true, "Calories are required"],
      min: [0, "Calories cannot be negative"],
      max: [50000, "Calories value is too high"],
    },

    protein: {
      type: Number,
      required: [true, "Protein is required"],
      min: [0, "Protein cannot be negative"],
      max: [1000, "Protein value is too high"],
    },

    carbohydrates: {
      type: Number,
      required: [true, "Carbohydrates are required"],
      min: [0, "Carbohydrates cannot be negative"],
      max: [2000, "Carbohydrates value is too high"],
    },

    fat: {
      type: Number,
      required: [true, "Fat is required"],
      min: [0, "Fat cannot be negative"],
      max: [1000, "Fat value is too high"],
    },

    mealType: {
      type: String,
      enum: ["Breakfast", "Lunch", "Dinner", "Snack"],
      required: [true, "Meal type is required"],
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

module.exports = mongoose.model("Nutrition", nutritionSchema);