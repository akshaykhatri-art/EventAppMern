import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { generateOTP, sendOTPByEmail } from "../services/emailService.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const usersCount = await User.countDocuments();
    let isAdmin = false;

    if (usersCount === 0) {
      isAdmin = true;
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin: isAdmin,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (user.devices.length >= 4) {
      return res.status(400).json({
        message: "User has reached the maximum limit of device logins",
      });
    }

    if (user.isAdmin) {
      const otp = generateOTP();
      user.otp = otp;
      await user.save();
      await sendOTPByEmail(email, otp);
      return res
        .status(200)
        .json({ message: "OTP sent to your email for admin login" });
    }

    const token = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      "akshayhere"
    );

    user.devices.push(req.ip);
    await user.save();
    res.header("auth-token", token).json({ token, isAdmin: user.isAdmin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    console.log("reqBody", req.body);
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.otp) {
      return res.status(400).json({ message: "No OTP found for the user" });
    }

    if (otp === user.otp) {
      user.otp = null;
      await user.save();
      const token = jwt.sign(
        { _id: user._id, isAdmin: user.isAdmin },
        "akshayhere"
      );

      return res
        .status(200)
        .json({ message: "OTP verified successfully", token });
    } else {
      return res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const decodedToken = jwt.verify(token, "akshayhere");

    const userId = decodedToken._id;
    if (!userId) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const index = user.devices.indexOf(req.deviceId);
    if (index !== -1) {
      user.devices.splice(index, 1);
    }

    await user.save();
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller Below

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.resetPasswordToken = "your-reset-password-token";
    user.resetPasswordExpires = Date.now() + 900000;
    await user.save();

    // Send email with reset password link containing token
    // You can implement this functionality using nodemailer or any other email service

    res.status(200).json({ message: "Reset password email sent" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (
      !user ||
      user.resetPasswordToken !== token ||
      user.resetPasswordExpires < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = newPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid current password" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
