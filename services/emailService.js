import * as dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

// Helper function to send OTP via email
export const sendOTPByEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: "emailauthorization22@gmail.com",
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: "emailauthorization22@gmail.com",
    to: email,
    subject: "OTP for Admin Login",
    text: `Your OTP for admin login is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

// Helper function to verify OTP
const verifyOTP = (userOTP, storedOTP) => {
  // Compare the user-provided OTP with the stored OTP
  return userOTP === storedOTP;
};
