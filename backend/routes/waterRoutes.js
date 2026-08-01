const express = require("express");
const router = express.Router();

const {
  setWaterGoal,
  getWaterData,
  drinkWater,
  resetWater,
} = require("../controllers/waterController");

const { protect } = require("../middleware/authMiddleware");

// Set daily water goal
router.post("/", protect, setWaterGoal);

// Get water data
router.get("/", protect, getWaterData);

// Add water intake
router.put("/drink", protect, drinkWater);

// Reset water intake
router.put("/reset", protect, resetWater);

module.exports = router;