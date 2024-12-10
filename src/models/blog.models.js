import mongoose from "mongoose";
import bcrypt from "bcrypt";

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
  },
  fullname: {
    type: String,
    required: [true, "full name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
}, { timestamps: true });

// Blog Schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "postedBy is required"],
  },
}, { timestamps: true });

// Export Models
export const User = mongoose.model("User", userSchema);
export const Blog = mongoose.model("Blog", blogSchema);
