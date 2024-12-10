import Blog from "../models/blog.models.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";





const generateAccessToken = (blog) => {
    return jwt.sign({ email: blog.email }, process.env.ACCESS_JWT_TOKEN_SECRET, { expiresIn: '6h' });
}
const generateRefreshToken = (blog) => {
    return jwt.sign({ email: blog.email }, process.env.REFRESH_JWT_TOKEN_SECRET, { expiresIn: '7d' });
}


// registerUser
const registerBlog = async (req, res) => {
    const { email, password } = req.body
    //     if (!user) return res.status(400).json({message:"email is requried"})
    //    if (!password) return res.status(400).json({message:"password is requried"}) 

    const blog = await Blog.findOne({ email})
    if (blog) return res.status(409).json({ message: "user already exicts" })
    const createBlog = await Blog.create({
        email,
        password,

    })
    res.json({ message: "Blog register successfully", data: createBlog })
}


export {registerBlog}