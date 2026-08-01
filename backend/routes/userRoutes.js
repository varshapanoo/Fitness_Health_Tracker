const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const { registerUser,
     loginUser,
     getUserProfile,
     uploadProfileImage,
     } = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.put("/upload",
     protect,
     upload.single("profileImage"),
     uploadProfileImage
);

module.exports = router;