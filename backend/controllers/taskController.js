const Task = require("../models/Task");
const { getNextUser } = require("../services/roundRobinService");
const sendEmail = require("../services/emailService");
const getSignature = (name, designation) => `
<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;margin-top:24px;">
  <tr>
    <td style="vertical-align:top;padding-right:20px;border-right:2px solid #1a23c9;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="background:#1A1F8C;border-radius:10px;padding:10px 14px;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="background:#2D35D4;border-radius:8px;width:40px;height:40px;text-align:center;vertical-align:middle;">
                  <span style="font-family:Arial,sans-serif;font-size:14px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">aN</span>
                </td>
                <td style="padding-left:12px;vertical-align:middle;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="vertical-align:middle;">
                        <span style="font-family:Arial,sans-serif;font-size:22px;font-weight:900;color:#ffffff;letter-spacing:-1px;white-space:nowrap;">alterno</span>
                      </td>
                      <td style="padding-left:8px;vertical-align:middle;">
                        <table cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td style="background:rgba(127,137,218,0.25);border-radius:4px;padding:3px 8px;">
                              <span style="font-family:Arial,sans-serif;font-size:9px;font-weight:700;color:#87CEEB;letter-spacing:0.8px;">beta</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
    <td style="vertical-align:top;padding-left:20px;">
      <p style="margin:0 0 2px;font-size:15px;font-weight:700;color:#1A1F8C;">${name}</p>
      <p style="margin:0 0 10px;font-size:12px;color:#6B75D4;">${designation} · alterno</p>
      <p style="margin:0 0 6px;font-size:11px;">
        <a href="https://alterno.app" style="color:#2D35D4;text-decoration:none;font-weight:600;">alterno.app</a>
        <span style="color:#6B75D4;margin-left:10px;">Task &amp; workflow manager</span>
      </p>
    </td>
  </tr>
</table>`;
const createTask = async (req, res) => {
  try {
    const { title, description, flatId, dueDate } = req.body;

    if (!title || !flatId || !dueDate) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const user = await getNextUser(flatId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "No active users found in this flat" });
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
        `New Task Assigned: ${title}`,
        `Hi ${user.name}, you have been assigned a new task: ${title}. Due: ${dueDate}.`,
        `<div style="font-family:Arial,sans-serif;max-width:560px;padding:32px 24px;">

          <!-- Header banner -->
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:28px;">
            <tr>
              <td style="background:#1A1F8C;border-radius:12px;padding:28px 24px;text-align:center;">
                <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:28px;font-weight:900;color:#ffffff;letter-spacing:-1px;">alterno</p>
                <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
                  <tr>
                    <td style="background:rgba(127,137,218,0.3);border-radius:4px;padding:3px 10px;">
                      <span style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;color:#87CEEB;letter-spacing:1px;">BETA</span>
                    </td>
                  </tr>
                </table>
                <p style="margin:12px 0 0;font-family:Arial,sans-serif;font-size:13px;color:rgba(255,255,255,0.6);letter-spacing:0.3px;">Task &amp; workflow manager</p>
              </td>
            </tr>
          </table>

          <!-- Greeting -->
          <p style="font-size:16px;color:#1A1F8C;margin:0 0 8px;">Hi <strong>${user.name}</strong>,</p>
          <p style="font-size:14px;color:#333;line-height:1.8;margin:0 0 20px;">
            A new task has been assigned to you via <strong>alterno</strong>'s round-robin workflow. 
            Here are the details:
          </p>

          <!-- Task details box -->
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:24px;">
            <tr>
              <td style="background:#F5F6FF;border-left:3px solid #2D35D4;border-radius:6px;padding:18px 20px;">
                <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:#6B75D4;letter-spacing:0.7px;text-transform:uppercase;">Task Details</p>
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="padding:5px 0;font-size:13px;color:#333;line-height:1.6;">
                      <span style="color:#2D35D4;font-weight:700;margin-right:8px;">→</span>
                      <strong>Task:</strong>&nbsp;${title}
                    </td>
                  </tr>
                  ${
                    description
                      ? `<tr>
                    <td style="padding:5px 0;font-size:13px;color:#333;line-height:1.6;">
                      <span style="color:#2D35D4;font-weight:700;margin-right:8px;">→</span>
                      <strong>Description:</strong>&nbsp;${description}
                    </td>
                  </tr>`
                      : ""
                  }
                  <tr>
                    <td style="padding:5px 0;font-size:13px;color:#333;line-height:1.6;">
                      <span style="color:#2D35D4;font-weight:700;margin-right:8px;">→</span>
                      <strong>Due Date:</strong>&nbsp;${new Date(dueDate).toDateString()}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <p style="font-size:14px;color:#333;line-height:1.8;margin:0 0 24px;">
            Please log in to <strong>alterno</strong> to view and manage your task. 
            Mark it complete once done — your flatmates are counting on you! 🙌
          </p>

          <!-- CTA -->
          <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
            <tr>
              <td style="background:#2D35D4;border-radius:8px;padding:13px 30px;text-align:center;">
                <a href="https://alterno.app" style="font-family:Arial,sans-serif;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;white-space:nowrap;">View My Task →</a>
              </td>
            </tr>
          </table>

          <p style="font-size:13px;color:#888;line-height:1.7;margin:0 0 4px;">
            Have questions? Just reply to this email — we read every message personally.
          </p>
          <p style="font-size:14px;color:#333;margin:16px 0 0;">
            Warm regards,<br/>
            <strong style="color:#1A1F8C;">Tapan</strong>
          </p>

          <hr style="border:none;border-top:1px solid #E8EAFF;margin:24px 0;" />

          ${getSignature("Tapan", "Product Owner")}

        </div>`,
      );
    } catch (emailError) {
      console.log("Task created, but email failed:", emailError.message);
    }
    const populatedTask = await Task.findById(task._id).populate(
      "assignedTo",
      "name email role status",
    );

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

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    ).populate("assignedTo", "name email role status");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTask, getTasks, updateTaskStatus };
