import CategoryModel from "../models/category.model.js";
import cloudinary from "../config/cloudinary.js";
import { sendSuccess, sendError } from "../utils/response.js";
import fs from "fs";

// Utility to upload images
async function uploadToCloudinary(files, folder) {
	const uploadedUrls = [];

	for (const file of files) {
		const result = await cloudinary.uploader.upload(file.path, {
			folder,
			use_filename: true,
			unique_filename: true,
			overwrite: false,
		});
		uploadedUrls.push(result.secure_url);
		fs.unlinkSync(file.path); // delete local file
	}

	return uploadedUrls;
}

// Upload category images
export async function uploadImage(req, res, next) {
	try {
		if (!req.files || req.files.length === 0) {
			return sendError(res, "No images provided", 400);
		}

		// Optional: Validate file types
		const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
		for (const file of req.files) {
			if (!allowedTypes.includes(file.mimetype)) {
				return sendError(res, "Invalid file type. Only images allowed", 400);
			}
		}

		const images = await uploadToCloudinary(
			req.files,
			"classyshop/categoryimg"
		);
		return sendSuccess(res, "Images uploaded successfully", { images });
	} catch (error) {
		next(error);
	}
}

// Create category
export async function createCategory(req, res, next) {
	try {
		const { name, parentId, parentCatName, image } = req.body;
		if (!name?.trim() || !image?.length) {
			return sendError(res, "Category name and images are required", 400);
		}

		// Prevent duplicate category names
		const exists = await CategoryModel.findOne({ name });
		if (exists) return sendError(res, "Category already exists", 409);

		// Optional: Verify parentId exists
		let parent = null;
		if (parentId) {
			parent = await CategoryModel.findById(parentId);
			if (!parent) return sendError(res, "Parent category not found", 404);
		}

		const category = new CategoryModel({
			name: name.trim(),
			images: image,
			parentId: parent ? parent._id : null,
			parentCatName: parent ? parent.name : null,
		});

		await category.save();
		return sendSuccess(res, "Category created successfully", { category });
	} catch (error) {
		next(error);
	}
}

export async function getCategories(req, res, next) {
	try {
		const categories = await CategoryModel.find();
		const categoryMap = {};

		// Step 1: Map each category by ID and add `children` array
		categories.forEach((cat) => {
			categoryMap[cat._id] = { ...cat._doc, children: [] };
		});

		// Step 2: Build nested structure
		const rootCategories = [];
		categories.forEach((cat) => {
			if (cat.parentId) {
				if (categoryMap[cat.parentId]) {
					categoryMap[cat.parentId].children.push(categoryMap[cat._id]);
				}
			} else {
				rootCategories.push(categoryMap[cat._id]);
			}
		});

		return sendSuccess(res, "Categories fetched successfully", {
			data: rootCategories,
		});
	} catch (error) {
		next(error);
	}
}

export async function getCategoriesCount(req, res, next) {
	try {
		// Counting only top-level categories (parentId: null)
		const categoryCount = await CategoryModel.countDocuments({
			parentId: null,
		});

		return sendSuccess(res, "Top-level categories count", { categoryCount });
	} catch (error) {
		next(error);
	}
}

export async function getSubCategoriesCount(req, res, next) {
	try {
		const categories = await CategoryModel.find();
		if (!categories) {
			res.status(500).json({ success: false, error: true });
		} else {
			const subCatList = [];
			for (let cat of categories) {
				if (cat.parentId !== undefined) {
					subCatList.push(cat);
				}
			}

			res.send({
				subCategoryCount: subCatList.length - 1,
			});
		}
	} catch (error) {
		next(error);
	}
}

export async function getCategory(req, res, next) {
	try {
		const category = await CategoryModel.findById(req.params.id);

		if (!category) {
			return sendError(
				res,
				"The category with the given ID was not found.",
				404
			);
		}

		return sendSuccess(res, "Category fetched successfully", { category });
	} catch (error) {
		next(error);
	}
}

export async function removeImageFromCloudinary(req, res, next) {
	try {
		const imgUrl = req.query.img;

		if (!imgUrl) {
			return sendError(res, "Image URL is required", 400);
		}

		// Extract public_id from Cloudinary URL
		const match = imgUrl.match(
			/upload\/(?:v\d+\/)?(.+)\.(jpg|jpeg|png|webp|gif)/
		);

		if (!match || !match[1]) {
			return sendError(res, "Invalid Cloudinary image URL format", 400);
		}

		const publicId = match[1]; // e.g., classyshop/categoryimg/filename

		// Delete image from Cloudinary
		const result = await cloudinary.uploader.destroy(publicId);

		if (result.result !== "ok") {
			return sendError(
				res,
				"Image not found on Cloudinary or deletion failed",
				404
			);
		}

		// Remove image URL from associated category
		const category = await CategoryModel.findOne({ images: imgUrl });

		if (category) {
			category.images = category.images.filter((img) => img !== imgUrl);
			await category.save();
		}

		return sendSuccess(res, "Image deleted and removed from category", {
			result,
		});
	} catch (error) {
		console.error("Cloudinary deletion error:", error);
		next(error);
	}
}

export async function deleteCategory(req, res, next) {
	try {
		const category = await CategoryModel.findById(req.params.id);
		console.log(category);
		if (!category) {
			return sendError(res, "Category not found!", 404);
		}

		// Delete all images from Cloudinary
		const deleteImagePromises = category.images.map(async (imgUrl) => {
			const match = imgUrl.match(
				/upload\/(?:v\d+\/)?(.+)\.(jpg|jpeg|png|webp|gif)/
			);
			if (match && match[1]) {
				await cloudinary.uploader.destroy(match[1]);
			}
		});
		await Promise.all(deleteImagePromises);

		// Delete all sub-sub-categories
		const subCategories = await CategoryModel.find({ parentId: req.params.id });
		for (const sub of subCategories) {
			await CategoryModel.deleteMany({ parentId: sub._id }); // delete 3rd-level subs
			await CategoryModel.findByIdAndDelete(sub._id); // delete sub-category
		}

		// Delete main category
		await CategoryModel.findByIdAndDelete(req.params.id);

		return sendSuccess(res, "Category and all nested categories deleted!");
	} catch (error) {
		next(error);
	}
}

export async function updateCategory(req, res, next) {
	try {
		const { name, images, parentId, parentCatName } = req.body;
		// console.log(name, images, parentId, parentCatName);

		if (!name || !images?.length) {
			return sendError(res, "Name and images are required", 400);
		}

		const category = await CategoryModel.findByIdAndUpdate(
			req.params.id,
			{
				name,
				images,
				parentId: parentId || null,
				parentCatName: parentCatName || null,
			},
			{ new: true }
		);

		if (!category) {
			return sendError(res, "Category could not be updated", 500);
		}

		return sendSuccess(res, "Category updated successfully", { category });
	} catch (error) {
		next(error);
	}
}
