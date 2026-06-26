const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || "supersecretkey", {
    expiresIn: "7d",
  });

const userResponse = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role,
  status: user.status,
  notificationPreference: user.notificationPreference,
  flatId: user.flatId,
  lastAssignedAt: user.lastAssignedAt,
  createdAt: user.createdAt,
});

const createUser = async (req, res) => {
  try {
    const { name, email, phone, password, flatId } = req.body;
    if (!name || !email || !phone || !password || !flatId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const existingFlatUsers = await User.countDocuments({ flatId });
    const newUser = await User.create({
      name,
      email,
      phone,
      password,
      flatId,
      role: existingFlatUsers === 0 ? "ADMIN" : "MEMBER",
    });

    res.status(201).json({
      user: userResponse(newUser),
      token: signToken(newUser._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: userResponse(user),
      token: signToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const { flatId } = req.query;
    if (!flatId) {
      return res.status(400).json({ message: "flatId is required" });
    }

    const users = await User.find({ flatId }).sort({ createdAt: 1 });
    res.json(users.map(userResponse));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["ACTIVE", "OOF"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const user = await User.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(userResponse(user));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
  getUsers,
  updateUserStatus,
};
