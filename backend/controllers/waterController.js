const Water = require("../models/Water");

// Set Water Goal
const setWaterGoal = async (req, res) => {
  try {
    const { goal } = req.body;

    let water = await Water.findOne({ user: req.user._id });

    if (water) {
      water.goal = goal;
      await water.save();
    } else {
      water = await Water.create({
        user: req.user._id,
        goal,
        consumed: 0,
      });
    }

    res.status(200).json({
      success: true,
      message: "Water goal set successfully",
      water,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Water Data
const getWaterData = async (req, res) => {
  try {
    let water = await Water.findOne({ user: req.user._id });

    if (!water) {
      water = await Water.create({
        user: req.user._id,
        goal: 3000,
        consumed: 0,
      });
    }

    res.status(200).json({
      success: true,
      water,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Drink Water
const drinkWater = async (req, res) => {
  try {
    const { amount } = req.body;

    const water = await Water.findOne({ user: req.user._id });

    if (!water) {
      return res.status(404).json({
        message: "Water record not found",
      });
    }

    water.consumed += amount;
    await water.save();

    res.status(200).json({
      success: true,
      message: "Water updated successfully",
      water,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Reset Water
const resetWater = async (req, res) => {
  try {
    const water = await Water.findOne({ user: req.user._id });

    if (!water) {
      return res.status(404).json({
        message: "Water record not found",
      });
    }

    water.consumed = 0;
    await water.save();

    res.status(200).json({
      success: true,
      message: "Water reset successfully",
      water,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  setWaterGoal,
  getWaterData,
  drinkWater,
  resetWater,
};