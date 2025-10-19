import express from "express";
import sgMail from "@sendgrid/mail";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
console.log("SendGrid Key:", process.env.SENDGRID_API_KEY ? "Loaded ✅" : "Missing ❌");
// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

// Routes for HTML files
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
app.get("/main.html", (req, res) => res.sendFile(path.join(__dirname, "public", "main.html")));
app.get("/date.html", (req, res) => res.sendFile(path.join(__dirname, "public", "date.html")));

// Send-mail API using SendGrid
app.post("/send-mail", async (req, res) => {
  const { selectedDate } = req.body;
  if (!selectedDate) {
    return res.status(400).json({ success: false, message: "Date is required" });
  }
  const dateObj = new Date(selectedDate);
  const formattedDate = `${String(dateObj.getDate()).padStart(2, '0')}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${dateObj.getFullYear()}`;

  const msg = {
    to: "chiragadwani24@gmail.com",        // recipient
    cc: "chiragadwani00@gmail.com",        // CC yourself
    from: "chiragadwani00@gmail.com",      // verified sender in SendGrid
    subject: "Date Confirmation ☕",
    html: getEmailTemplate(formattedDate),
  };

  try {
    await sgMail.send(msg);
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Failed to send email:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

// Catch-all route
app.get("*", (req, res) => res.redirect("/"));

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
