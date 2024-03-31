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
