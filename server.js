require("dotenv").config();

const express = require("express");

const connectDB = require("./config/db");

const app = express();


// Connect MongoDB
connectDB();


// Middleware
app.use(express.json());


// Routes
const userRoutes = require("./routes/userRoutes");

const flatRoutes = require("./routes/flatRoutes");

const taskRoutes = require("./routes/taskRoutes");


// Route Middleware
app.use("/api/users", userRoutes);

app.use("/api/flats", flatRoutes);

app.use("/api/tasks", taskRoutes);


// Home Route
app.get("/", (req, res) => {

  res.send("Flatmate Task Scheduler API Running 🚀");

});


// Start Server
const PORT = 5000;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});