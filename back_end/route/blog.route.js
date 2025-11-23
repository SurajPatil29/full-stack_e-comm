import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

import {
	createBlog,
	getAllBlogs,
	getBlog,
	updateBlog,
	removeBlogImage,
	deleteBlog,
	deleteMultipleBlogs,
	updateBlogStatus,
	uploadImage,
} from "../controllers/blog.controller.js";

const blogRoute = Router();

/* -------------------------- BLOG ROUTES -------------------------- */

// ✅ Upload images separately (optional)
blogRoute.post("/upload", auth, upload.array("images"), uploadImage);

// ✅ Create blog
blogRoute.post("/create", auth, createBlog);

// ✅ Get all blogs
blogRoute.get("/all", getAllBlogs);

// ✅ Get single blog
blogRoute.get("/:id", getBlog);

// ✅ Update blog (title, desc, images)
blogRoute.post("/:id", auth, updateBlog);

// ✅ Update blog active status
blogRoute.put("/:id", auth, updateBlogStatus);

// ✅ Remove single image from a blog
blogRoute.delete("/remove-image", auth, removeBlogImage);

// ✅ Delete multiple blogs
blogRoute.delete("/delete-multiple", auth, deleteMultipleBlogs);

// ✅ Delete single blog
blogRoute.delete("/:id", auth, deleteBlog);

export default blogRoute;
