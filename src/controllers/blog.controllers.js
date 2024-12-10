import {User} from "../models/blog.models.js";
import { Blog } from "../models/blog.models.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";





const generateAccessToken = (user) => {
    return jwt.sign({ email: user.email }, process.env.ACCESS_JWT_TOKEN_SECRET, { expiresIn: '6h' });
}
const generateRefreshToken = (user) => {
    return jwt.sign({ email: user.email }, process.env.REFRESH_JWT_TOKEN_SECRET, { expiresIn: '7d' });
}


// registerUser
const registerUser = async (req, res) => {
    try {
        const { username, fullname, email, password } = req.body;

        // Validate fields
        if (!username || !fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save user
        const newUser = await User.create({
            username,
            fullname,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "User registered successfully",
            data: newUser,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


// login user
const loginUser=async(req,res)=>{
    const {email,password}=req.body
    if(!email)return res.status (400).json({message:"user is required"})
    if(!password)return res.status(400).json({message:"password is required"})   
     const user =await User.findOne({email})   
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!user )return res.status(400).json({message:"user not found"})
      const accesstoken=generateAccessToken(user)
    const refreshtoken=generateRefreshToken(user)
    res.cookie('refreshtoken',refreshtoken,{https:true,secure:false})
    res.json({message:"successfully",
        accesstoken,
        refreshtoken,
        data:user,
    })
}

9
// logout user
const logoutUser=async(req,res)=>{
    res.clearCookie("refreshtoken")
    res.json({message:"successfully login"})
}

// const Blogtitledescription = async (req, res) => {
//     try {
//         const { title, description } = req.body;

//         // Validate inputs
//         if (!title) return res.status(400).json({ message: "Title is required" });
//         if (!description) return res.status(400).json({ message: "Description is required" });

        // Search for blog post
//         const blog = await Blog.findOne({ title, description });
//         if (!blog) return res.status(404).json({ message: "Blog not found" });

//         res.status(200).json({
//             message: "Successfully fetched the blog",
//             data: newblog,
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: "Internal Server Error",
//             error: error.message,
//         });
//     }
// };


const createBlog = async (req, res) => {
    try {
      const { title, description } = req.body;
  
      // Validate inputs
      if (!title || !description)
        return res.status(400).json({ message: "Title and description are required" });
  
      // Check if the blog already exists
      const existingBlog = await Blog.findOne({ title, description });
      if (existingBlog)
        return res.status(409).json({ message: "Blog already exists" });
  
      // Create new blog post
      const newBlog = await Blog.create({
        title,
        description,
        postedBy: req.userId || "64ffedb80abc123456789abc",  // Placeholder for testing
      });
  
      res.status(201).json({
        message: "Blog created successfully",
        data: newBlog,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };
  



export {registerUser,loginUser,logoutUser,createBlog}