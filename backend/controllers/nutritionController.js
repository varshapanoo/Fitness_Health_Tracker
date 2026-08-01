const Nutrition = require("../models/Nutrition");

// Add Meal
const addMeal = async (req, res) => {
  try {
    const {
      foodName,
      calories,
      protein,
      carbohydrates,
      fat,
      mealType,
      date,
    } = req.body;

    const meal = await Nutrition.create({
      user: req.user._id,
      foodName,
      calories,
      protein,
      carbohydrates,
      fat,
      mealType,
      date,
    });

    res.status(201).json({
      success: true,
      message: "Meal added successfully",
      meal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Meals
const getMeals = async (req, res) => {
  try {
    const meals = await Nutrition.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      count: meals.length,
      meals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Meal
const updateMeal = async (req, res) => {
  try {
    const meal = await Nutrition.findById(req.params.id);

    if (!meal) {
      return res.status(404).json({
        message: "Meal not found",
      });
    }

    if (meal.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const updatedMeal = await Nutrition.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Meal updated successfully",
      updatedMeal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Meal
const deleteMeal = async (req, res) => {
  try {
    const meal = await Nutrition.findById(req.params.id);

    if (!meal) {
      return res.status(404).json({
        message: "Meal not found",
      });
    }

    if (meal.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await meal.deleteOne();

    res.status(200).json({
      success: true,
      message: "Meal deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addMeal,
  getMeals,
  updateMeal,
  deleteMeal,
};