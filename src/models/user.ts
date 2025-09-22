import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["OWNER", "VET", "VENDOR", "SHELTER", "ADMIN"],
    default: "OWNER",
  },
  phoneNumber: {
    type: String,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
});

export const User = model("User", userSchema);
