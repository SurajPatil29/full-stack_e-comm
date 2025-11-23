import mongoose from "mongoose";
import fs from "fs";
import cloudinary from "../config/cloudinary.js";
import { sendSuccess, sendError } from "../utils/response.js";
import BlogModel from "../models/Blog.model.js";

// ✅ Upload to Cloudinary helper
const uploadToCloudinary = async (files = [], folder = "classyshop/blog") => {
	const uploadedImages = [];
	const validMimeTypes = ["image/jpeg", "image/png", "image/webp"];

	for (const file of files) {
		if (!validMimeTypes.includes(file.mimetype)) {
			fs.unlinkSync(file.path);
			throw new Error("Unsupported image type");
		}
		const result = await cloudinary.uploader.upload(file.path, {
			folder,
			use_filename: true,
			unique_filename: true,
			overwrite: false,
		});
		uploadedImages.push(result.secure_url);
		fs.unlinkSync(file.path);
	}
	return uploadedImages;
};

// ✅ Upload Images
export async function uploadImage(req, res, next) {
	try {
		const files = req.files;
		if (!files || files.length === 0)
			return sendError(res, "No files provided", 422);

		const images = await uploadToCloudinary(files);
		return sendSuccess(res, "Images uploaded successfully", { images });
	} catch (error) {
		next(error);
	}
}

// ✅ Create Blog
export async function createBlog(req, res, next) {
	try {
		const { images, title, description } = req.body;

		if (!images || images.length === 0)
			return sendError(res, "Images are required", 422);
		if (!title) return sendError(res, "Title is required", 422);
		if (!description) return sendError(res, "Description is required", 422);

		const blog = new BlogModel({
			images,
			title,
			description,
		});

		await blog.save();

		return sendSuccess(res, "Blog created successfully", { data: blog });
	} catch (error) {
		next(error);
	}
}

// ✅ Get All Blogs
export async function getAllBlogs(req, res, next) {
	try {
		const blogs = await BlogModel.find().sort({ createdAt: -1 });
		return sendSuccess(res, "Blogs fetched successfully", { data: blogs });
	} catch (error) {
		next(error);
	}
}

// ✅ Get Single Blog
export async function getBlog(req, res, next) {
	try {
		const { id } = req.params;

		if (!mongoose.Types.ObjectId.isValid(id))
			return sendError(res, "Invalid blog ID", 400);

		const blog = await BlogModel.findById(id);
		if (!blog) return sendError(res, "Blog not found", 404);

		return sendSuccess(res, "Blog fetched successfully", { data: blog });
	} catch (error) {
		next(error);
	}
}

// ✅ Remove Single Image From Blog
export async function removeBlogImage(req, res, next) {
	try {
		const imgUrl = req.query.img;

		if (!imgUrl) return sendError(res, "Image URL is required", 400);

		const match = imgUrl.match(
			/\/upload\/(?:v\d+\/)?(.+)\.(jpg|jpeg|png|webp|gif)/
		);

		if (!match || !match[1])
			return sendError(res, "Invalid Cloudinary URL format", 400);

		const publicId = match[1];

		const result = await cloudinary.uploader.destroy(publicId);

		if (result.result !== "ok")
			return sendError(res, "Cloudinary deletion failed", 404);

		await BlogModel.updateOne(
			{ images: imgUrl },
			{ $pull: { images: imgUrl } }
		);

		return sendSuccess(res, "Image removed successfully", { result });
	} catch (error) {
		next(error);
	}
}

// ✅ Update Blog
export async function updateBlog(req, res, next) {
	try {
		const { id } = req.params;
		const { title, images, description } = req.body;

		if (!mongoose.Types.ObjectId.isValid(id))
			return sendError(res, "Invalid blog ID", 400);

		const updateData = {};
		if (title) updateData.title = title;
		if (images) updateData.images = images;
		if (description) updateData.description = description;

		const updatedBlog = await BlogModel.findByIdAndUpdate(id, updateData, {
			new: true,
		});

		if (!updatedBlog) return sendError(res, "Blog not found", 404);

		return sendSuccess(res, "Blog updated successfully", { data: updatedBlog });
	} catch (error) {
		next(error);
	}
}

// ✅ Update Blog Status (isActive)
export async function updateBlogStatus(req, res, next) {
	try {
		const { id } = req.params;
		const { isActive } = req.body;

		if (!mongoose.Types.ObjectId.isValid(id))
			return sendError(res, "Invalid blog ID", 400);

		const updatedBlog = await BlogModel.findByIdAndUpdate(
			id,
			{ isActive },
			{ new: true }
		);

		if (!updatedBlog) return sendError(res, "Blog not found", 404);

		return sendSuccess(res, "Blog status updated", { data: updatedBlog });
	} catch (error) {
		next(error);
	}
}

// ✅ Delete Single Blog
export async function deleteBlog(req, res, next) {
	try {
		const blog = await BlogModel.findById(req.params.id);

		if (!blog) return sendError(res, "Blog not found!", 404);

		await Promise.all(
			blog.images.map(async (imgUrl) => {
				const match = imgUrl.match(
					/\/upload\/(?:v\d+\/)?(.+)\.(jpg|jpeg|png|webp|gif)/
				);
				if (match && match[1]) await cloudinary.uploader.destroy(match[1]);
			})
		);

		await BlogModel.findByIdAndDelete(req.params.id);

		return sendSuccess(res, "Blog deleted successfully");
	} catch (error) {
		next(error);
	}
}

// ✅ Delete Multiple Blogs
export async function deleteMultipleBlogs(req, res, next) {
	try {
		const { ids } = req.body;

		if (!ids || !Array.isArray(ids) || ids.length === 0)
			return sendError(res, "No blog IDs provided", 400);

		for (const id of ids) {
			const blog = await BlogModel.findById(id);
			if (!blog) continue;

			await Promise.all(
				blog.images.map(async (imgUrl) => {
					const match = imgUrl.match(
						/\/upload\/(?:v\d+\/)?(.+)\.(jpg|jpeg|png|webp|gif)/
					);
					if (match && match[1]) await cloudinary.uploader.destroy(match[1]);
				})
			);

			await BlogModel.findByIdAndDelete(id);
		}

		return sendSuccess(res, "Selected blogs deleted successfully");
	} catch (error) {
		next(error);
	}
}
