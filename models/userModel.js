import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  otp: { type: String },
  isAdmin: { type: Boolean, default: false },
  devices: [{ type: String }],
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

export default mongoose.model("User", userSchema);
