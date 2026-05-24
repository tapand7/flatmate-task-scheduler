const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {

  try {

    console.log("EMAIL FUNCTION START");

    const transporter = nodemailer.createTransport({

      host: "smtp.gmail.com",
      port: 587,
      secure: false,

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }

    });

    console.log("TRANSPORT CREATED");

    // // Check SMTP connection
    // await transporter.verify();

    console.log("SMTP VERIFIED");

    const mailOptions = {

      from: process.env.EMAIL_USER,
      to,
      subject,
      text

    };

    const info = await transporter.sendMail(mailOptions);

    console.log("EMAIL SENT SUCCESSFULLY");
    console.log(info.response);

    return true;

  } catch (error) {

    console.log("EMAIL ERROR:");
    console.log(error);

    return false;

  }

};

module.exports = sendEmail;
