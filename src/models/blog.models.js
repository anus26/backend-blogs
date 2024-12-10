import mongoose from "mongoose";
import bcrypt from "bcrypt"
const blogSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  
});


export default mongoose.model("blog", blogSchema);