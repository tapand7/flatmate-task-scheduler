const express = require("express");
const { createTask, getTasks, updateTaskStatus } = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getTasks);
router.post("/", protect, createTask);
router.patch("/:id/status", protect, updateTaskStatus);

module.exports = router;
