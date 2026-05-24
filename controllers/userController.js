const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// CREATE USER
const createUser = async (req, res) => {
  try {
const { name, email, phone, password, flatId } = req.body;
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
const newUser = await User.create({
  name,
  email,
  phone,
  password,
  flatId
});

    const token = jwt.sign(
      { id: newUser._id },
      "supersecretkey",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: token
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
  const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id },
      "supersecretkey",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      id:user._id,
      email:user.email,
      message: "Login successful",
      token
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createUser,
  loginUser
};
   