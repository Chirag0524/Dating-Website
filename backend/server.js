import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// HTML email template
function getEmailTemplate(date) {
  return `
    <div style="font-family: Poppins, sans-serif; color:#333; line-height:1.6; max-width:600px; margin:auto; padding:20px; border-radius:10px; background-color:#fef6f6; box-shadow:0 5px 15px rgba(0,0,0,0.1);">
      <h2 style="color:#ec4899;">Date Confirmation ☕</h2>
      <p>Hello!</p>
      <p>Thank you for confirming. Your coffee date has been scheduled on:</p>
      <p style="font-weight:bold; font-size:1.2rem;">${date}</p>
      <p>Looking forward to a warm conversation and good vibes! ✨</p>
      <br>
      <p style="color:#888;">- Sent with 💖 from your friendly app</p>
    </div>
  `;
}

// API endpoint to send email
app.post("/send-mail", async (req, res) => {
  const { selectedDate } = req.body;

  if (!selectedDate) {
    return res.status(400).json({ success: false, message: "Date is required" });
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "chiragadwani24@gmail.com", // recipient
      cc: process.env.EMAIL_USER,      // CC yourself
      subject: "Date Confirmation ☕",
      html: getEmailTemplate(selectedDate),
    });

    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

const PORT = process.env.PORT || 2208;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
