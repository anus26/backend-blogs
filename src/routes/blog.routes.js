import  express from "express";
import {   createBlog, loginUser, logoutUser, registerUser} from '../controllers/blog.controllers.js'


const router=express.Router()
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/blogs", createBlog);
export default router;