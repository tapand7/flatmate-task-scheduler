const express = require("express");
const { createFlat, getFlats } = require("../controllers/flatController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getFlats);
router.post("/", protect, createFlat);

module.exports = router;
