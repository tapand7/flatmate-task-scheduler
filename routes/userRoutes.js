const express = require("express");

const router = express.Router();

const {
  createUser,
  loginUser
} = require("../controllers/userController");

const {
  protect
} = require("../middleware/authMiddleware");


// Register
router.post("/", createUser);

// Login
router.post("/login", loginUser);

// Protected Profile Route
router.get("/profile", protect, async (req, res) => {

  res.json(req.user);

});

module.exports = router;