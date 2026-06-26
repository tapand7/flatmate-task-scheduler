const Task = require("../models/Task");
const { getNextUser } = require("../services/roundRobinService");
const sendEmail = require("../services/emailService");

const createTask = async (req, res) => {
  try {
    const { title, description, flatId, dueDate } = req.body;

    if (!title || !flatId || !dueDate) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const user = await getNextUser(flatId);
    if (!user) {
      return res.status(404).json({ message: "No active users found in this flat" });
    }

    const task = await Task.create({
      title,
      description,
      assignedTo: user._id,
      flatId,
      dueDate,
    });

    try {
      await sendEmail(
        user.email,
        "New alterno task assigned",
        `Hi ${user.name}, you have been assigned: ${title}`,
        `<p>Hi <strong>${user.name}</strong>,</p><p>You have been assigned: <strong>${title}</strong>.</p>`,
      );
    } catch (emailError) {
      console.log("Task created, but email failed:", emailError.message);
    }

    const populatedTask = await Task.findById(task._id).populate("assignedTo", "name email role status");

    res.status(201).json({
      message: "Task assigned successfully",
      task: populatedTask,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const { flatId } = req.query;
    if (!flatId) {
      return res.status(400).json({ message: "flatId is required" });
    }

    const tasks = await Task.find({ flatId })
      .populate("assignedTo", "name email role status")
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["PENDING", "COMPLETED"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const task = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate(
      "assignedTo",
      "name email role status",
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTask, getTasks, updateTaskStatus };
