const express = require("express");
const router = express.Router();

const {
  addMeal,
  getMeals,
  updateMeal,
  deleteMeal,
} = require("../controllers/nutritionController");

const { protect } = require("../middleware/authMiddleware");

// Add Meal
router.post("/", protect, addMeal);

// Get All Meals
router.get("/", protect, getMeals);

// Update Meal
router.put("/:id", protect, updateMeal);

// Delete Meal
router.delete("/:id", protect, deleteMeal);

module.exports = router;