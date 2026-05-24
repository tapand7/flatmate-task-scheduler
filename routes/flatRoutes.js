const express = require("express");
const router = express.Router();

const { createFlat } = require("../controllers/flatController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createFlat);

module.exports = router;