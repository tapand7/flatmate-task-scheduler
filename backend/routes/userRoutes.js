const express = require("express");
const {
  createUser,
  getUsers,
  loginUser,
  updateUserStatus,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", createUser);
router.post("/login", loginUser);
router.get("/", protect, getUsers);
router.patch("/:id/status", protect, updateUserStatus);
router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
