import CategoryModel from "../models/category.model.js";

import { v2 as cloudinary } from "cloudinary";
import { error } from "console";
import fs from "fs";

cloudinary.config({
	cloud_name: process.env.cloudinary_Config_Cloud_Name,
	api_key: process.env.cloudinary_Config_api_key,
	api_secret: process.env.cloudinary_Config_api_secret,
	secure: true,
});

var imagesArr = [];
export async function uploadImage(req, res) {
	try {
		const imageFiles = req.files;

		for (let i = 0; i < imageFiles?.length; i++) {
			const result = await cloudinary.uploader.upload(
				imageFiles[i].path, // this should be the local file path
				{
					folder: "classyshop/categoryimg", // 📁 target folder in Cloudinary
					use_filename: true,
					unique_filename: true,
					overwrite: false,
				}
			);

			imagesArr.push(result.secure_url);

			// Delete file from local uploads folder
			fs.unlinkSync(imageFiles[i].path);
		}

		return res.status(200).json({
			message: "Images uploaded successfully",
			images: imagesArr,
			error: false,
			success: true,
		});
	} catch (error) {
		return res.send(400).json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
}

export async function createCategory(req, res) {
	try {
		let category = new CategoryModel({
			name: req.body.name,
			images: imagesArr,
			parentId: req.body.parentId,
			parentCatName: req.body.parentCatName,
		});

		if (!category) {
			return res.status(500).json({
				message: "Category not created",
				error: true,
				success: false,
			});
		}

		category = await category.save();
		imagesArr = [];

		return res.status(200).json({
			message: "Category created successfully",
			category: category,
			error: false,
			success: true,
		});
	} catch (error) {
		return res.send(400).json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
}

export async function getCategories(req, res) {
	try {
		const categories = await CategoryModel.find();
		const categoryMap = {};

		categories.forEach((cat) => {
			categoryMap[cat._id] = { ...cat._doc, children: [] };
		});

		const rootCategories = [];

		categories.forEach((cat) => {
			if (cat.parentId) {
				categoryMap[cat.parentId].children.push(categoryMap[cat._id]);
			} else {
				rootCategories.push(categoryMap[cat._id]);
			}
		});

		return res.status(200).json({
			data: rootCategories,
			error: false,
			success: true,
		});
	} catch (error) {
		return res.status(400).json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
}

export async function getCategoriesCount(req, res) {
	try {
		const categoryCount = await CategoryModel.countDocuments({
			parentId: undefined,
		});
		if (!categoryCount) {
			res.status(500).json({
				success: false,
				error: true,
			});
		} else {
			res.send({
				categoryCount: categoryCount,
			});
		}
	} catch (error) {
		return res.status(500).json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
}

export async function getSubCategoriesCount(req, res) {
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
		return res.status(400).json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
}

export async function getCategory(req, res) {
	try {
		const category = await CategoryModel.findById(req.params.id);

		if (!category) {
			res.status(500).json({
				message: "The category with the given Id was not found.",
				error: true,
				success: false,
			});
		}

		return res.status(200).json({
			error: false,
			success: true,
			category: category,
		});
	} catch (error) {
		return res.status(400).json({
			message: error.message || message,
			error: true,
			success: false,
		});
	}
}

export async function removeImageFromCloudinary(req, res) {
	try {
		const imgUrl = req.query.img;

		if (!imgUrl) {
			return res.status(400).json({ error: "Image URL is required" });
		}

		// Step 1: Extract public_id
		const match = imgUrl.match(
			/upload\/(?:v\d+\/)?(.+)\.(jpg|jpeg|png|webp|gif)/
		);

		if (!match || !match[1]) {
			return res
				.status(400)
				.json({ error: "Invalid Cloudinary image URL format" });
		}

		const publicId = match[1]; // e.g., classyshop/categoryimg/filename
		console.log("Deleting Cloudinary image with public_id:", publicId);

		// Step 2: Delete from Cloudinary
		const result = await cloudinary.uploader.destroy(publicId);

		if (result.result !== "ok") {
			return res.status(404).json({
				error: "Image not found on Cloudinary or deletion failed",
				result,
			});
		}

		// Step 3: Remove image URL from CategoryModel
		const category = await CategoryModel.findOne({ images: imgUrl });

		if (category) {
			category.images = category.images.filter((img) => img !== imgUrl);
			await category.save();
			console.log(`Removed image URL from category ${category._id}`);
		} else {
			console.warn("No category found with this image URL.");
		}

		// Step 4: Return response
		return res.status(200).json({
			message: "Image deleted from Cloudinary and removed from category",
			result,
		});
	} catch (error) {
		console.error("Cloudinary deletion error:", error);
		return res.status(500).json({ error: "Server error while deleting image" });
	}
}

export async function deleteCategory(req, res) {
	try {
		const category = await CategoryModel.findById(req.params.id);
		const images = category.images;

		for (img of images) {
			const urlUrl = img;
			const urlArr = imgUrl.split("/");
			const image = urlArr[urlArr.length - 1];
			const imageName = image.split(".")[0];

			if (imageName) {
				cloudinary.uploader.destroy(imageName, (error, result) => {
					// console.log(error, result)
				});
				//console.log(imageName)
			}
		}

		const subCategory = await CategoryModel.find({
			parentId: req.params.id,
		});

		for (let i = 0; i < subCategory.length; i++) {
			const thirdsubCategory = await CategoryModel.find({
				parentId: subCategory[i]._id,
			});

			for (let i = 0; i < thirdsubCategory.length; i++) {
				const deletedThirdSubCat = await CategoryModel.findByIdAndDelete(
					thirdsubCategory[i]._id
				);
			}

			const deletedSubCat = await CategoryModel.findByIdAndDelete(
				subCategory[i]._id
			);
		}

		const deleteCat = await CategoryModel.findByIdAndDelete(req.params.id);
		if (!deleteCat) {
			res.status(404).json({
				message: "Category not found!",
				success: false,
				error: true,
			});
		}

		res.status(200).json({
			success: true,
			error: false,
			message: "Category Delete!",
		});
	} catch (error) {
		return res.status(400).json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
}

export async function updateCategory(req, res) {
	try {
		const category = await CategoryModel.findByIdAndUpdate(
			req.params.id,
			{
				name: req.body.name,
				images: imagesArr.length > 0 ? imagesArr[0] : req.body.images,
				parentId: req.body.parentId,
				parentCatName: req.body.parentCatName,
			},
			{ new: true }
		);

		if (!category) {
			return res.status(500).json({
				message: "Category cannot br update!",
				success: false,
				error: true,
			});
		}

		imagesArr = [];

		res.status(200).json({
			error: false,
			success: true,
			category: category,
		});
	} catch (error) {
		return res.status(400).json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
}
