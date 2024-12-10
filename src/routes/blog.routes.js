import  express from "express";
import { registerBlog} from '../controllers/blog.controllers.js'

const router=express.Router()
router.post("/register", registerBlog);

export default router;