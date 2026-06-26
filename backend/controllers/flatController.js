const Flat = require("../models/Flat");

const getFlats = async (req, res) => {
  try {
    const flats = await Flat.find().sort({ createdAt: -1 });
    res.json(flats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFlat = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Flat name is required" });
    }

    const flat = await Flat.create({
      name,
      description,
      createdBy: req.user._id,
    });

    res.status(201).json(flat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createFlat, getFlats };
