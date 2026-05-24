const Task = require("../models/Task");
const { getNextUser } = require("../services/roundRobinService");
const sendEmail = require("../services/emailService");

const createTask = async (req, res) => {

  try {

    console.log("Task API Hit");

    const { title, description, flatId, dueDate } = req.body;

    console.log(req.body);

    if (!title || !flatId || !dueDate) {

      return res.status(400).json({
        message: "Required fields missing"
      });

    }

    console.log("Before getNextUser");

    const user = await getNextUser(flatId);

    console.log("After getNextUser");

    if (!user) {

      return res.status(404).json({
        message: "No users found in this flat"
      });

    }

    console.log("User Found:", user.email);

    const task = await Task.create({

      title,
      description,
      assignedTo: user._id,
      flatId,
      dueDate

    });

    console.log("Task Created");

    console.log("Before Email");
const emailResult = await sendEmail(

  user.email,

  "🍻 House Party Invitation - Good Food, Live Music & Catan Night!",

  `Hey ${user.name} 👋

You're officially invited for an awesome evening at our place! 🏠✨

Get ready for:

🍕 Delicious food  
🎶 Live music vibes  
🎲 Intense Catan battles  
😂 Crazy conversations  
🔥 Chill environment & fun memories  

Date: ${dueDate}

Bring your energy and appetite 😄

Looking forward to having you with us!

Cheers 🍻
Tapan U`
);

    console.log("After Email");

    console.log("EMAIL RESULT:", emailResult);

    res.status(201).json({

      message: "Task assigned successfully",
      task

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = { createTask };