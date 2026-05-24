const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  flatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flat",
    required: true
  },

  dueDate: {
    type: Date,
    required: true
  },

  status: {
    type: String,
    enum: ["PENDING", "COMPLETED"],
    default: "PENDING"
  }
},
{
  timestamps: true
}
);

module.exports = mongoose.model("Task", taskSchema);