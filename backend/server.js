if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-frontend.vercel.app", // update this after frontend deploys
    ],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/flats", require("./routes/flatRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

app.get("/", (req, res) => {
  res.send("Flatmate Task Scheduler API Running");
});

const PORT = process.env.PORT || 5000;

// ← CHANGED: only listen locally, not on Vercel
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// ← ADDED: Vercel needs this
module.exports = app;
