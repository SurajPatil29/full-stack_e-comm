import mongoose from "mongoose";
import fs from "fs";
import cloudinary from "../config/cloudinary.js";
import AddBannerModel from "../models/addBannner.model.js";
import { sendSuccess, sendError } from "../utils/response.js"; // assuming you have these helpers

// ✅ Upload to Cloudinary helper
const uploadToCloudinary = async (
	files = [],
	folder = "classyshop/bannerimg",
) => {
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

// ✅ Create Banner (single or multiple images)
export async function createBanner(req, res, next) {
	try {
		const { images, title, productId } = req.body;

		if (!images) {
			return sendError(res, "Images are required", 422);
		}

		// ✅ Upload images if present
		let uploadedImages = [];
		if (req.files && req.files.length > 0) {
			uploadedImages = await uploadToCloudinary(req.files);
		}

		const banner = new AddBannerModel({
			images: images?.length ? images : uploadedImages,
			title: title || "Banner",
			productId: productId,
		});

		await banner.save();

		return sendSuccess(res, "Banner Added successfully", { banner });
	} catch (error) {
		next(error);
	}
}

// ✅ Get All Banners
export async function getAllBanners(req, res, next) {
	try {
		const banners = await AddBannerModel.find().sort({ createdAt: -1 });
		return sendSuccess(res, "Fetched banners successfully", { data: banners });
	} catch (error) {
		next(error);
	}
}

// ✅ Get Single Banner
export async function getBanner(req, res, next) {
	try {
		const { id } = req.params;
		// console.log(id, "get");

		if (!mongoose.Types.ObjectId.isValid(id))
			return sendError(res, "Invalid banner ID", 400);

		const banner = await AddBannerModel.findById(id).populate("productId");
		if (!banner) return sendError(res, "Banner not found", 404);

		return sendSuccess(res, "Banner fetched successfully", { data: banner });
	} catch (error) {
		next(error);
	}
}

// ✅ Remove Image from Cloudinary & DB (for Banner)
export async function removeBannerImage(req, res, next) {
	try {
		const imgUrl = req.query.img;

		if (!imgUrl) {
			return sendError(res, "Image URL is required", 400);
		}

		// Extract public_id from Cloudinary URL
		const match = imgUrl.match(
			/upload\/(?:v\d+\/)?(.+)\.(jpg|jpeg|png|webp|gif)/,
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
				404,
			);
		}

		// Remove image URL from associated category
		const category = await AddBannerModel.findOne({ images: imgUrl });

		if (category) {
			category.images = category.images.filter((img) => img !== imgUrl);
			await category.save();
		}

		return sendSuccess(res, "Image deleted and removed from category", {
			result,
		});
	} catch (error) {
		console.error("❌ Cloudinary Delete Error:", error);
		next(error);
	}
}

// ✅ Update Banner
export async function updateBanner(req, res, next) {
	try {
		const { id } = req.params;
		// console.log(id, "put");

		const { title, images } = req.body; // images should be an array of URLs

		// Validate ID
		if (!mongoose.Types.ObjectId.isValid(id))
			return sendError(res, "Invalid banner ID", 400);

		// Validate input

		// Build update object
		const updateData = {};
		if (title) updateData.title = title;
		if (images) updateData.images = images; // replaces old images

		// Update in DB
		const updatedBanner = await AddBannerModel.findByIdAndUpdate(
			id,
			updateData,
			{
				new: true,
			},
		);

		if (!updatedBanner) return sendError(res, "Banner not found", 404);

		return sendSuccess(res, "Banner updated successfully", {
			banner: updatedBanner,
		});
	} catch (error) {
		next(error);
	}
}

export async function isActiveBanner(req, res, next) {
	try {
		const { id } = req.params;

		const { isActive } = req.body;

		// Validate ID
		if (!mongoose.Types.ObjectId.isValid(id))
			return sendError(res, "Invalid banner ID", 400);

		// Update in DB
		const updatedBanner = await AddBannerModel.findByIdAndUpdate(
			id,
			{ isActive },
			{ new: true },
		);
		if (!updatedBanner) return sendError(res, "Banner not found", 404);

		return sendSuccess(res, "Banner updated successfully", {
			data: updatedBanner,
		});
	} catch (error) {
		next(error);
	}
}

// ✅ Delete Single Banner
export async function deleteBanner(req, res, next) {
	try {
		const banner = await AddBannerModel.findById(req.params.id);
		if (!banner) {
			return sendError(res, "baneer not found!", 404);
		}

		// Delete all images from Cloudinary
		const deleteImagePromises = banner.images.map(async (imgUrl) => {
			const match = imgUrl.match(
				/upload\/(?:v\d+\/)?(.+)\.(jpg|jpeg|png|webp|gif)/,
			);
			if (match && match[1]) {
				await cloudinary.uploader.destroy(match[1]);
			}
		});
		await Promise.all(deleteImagePromises);

		// Delete main category
		await AddBannerModel.findByIdAndDelete(req.params.id);

		return sendSuccess(res, "Banner deleted!");
	} catch (error) {
		next(error);
	}
}

// ✅ Delete Multiple Banners
export async function deleteMultipleBanners(req, res, next) {
	try {
		const { ids } = req.body; // expect: { ids: ["id1", "id2", "id3"] }

		if (!ids || !Array.isArray(ids) || ids.length === 0) {
			return sendError(res, "No Banner IDs provided", 400);
		}

		for (const id of ids) {
			const banner = await AddBannerModel.findById(id);
			if (!banner) continue;

			// Delete all images from Cloudinary
			const deleteImagePromises = banner.images.map(async (imgUrl) => {
				const match = imgUrl.match(
					/upload\/(?:v\d+\/)?(.+)\.(jpg|jpeg|png|webp|gif)/,
				);
				if (match && match[1]) {
					await cloudinary.uploader.destroy(match[1]);
				}
			});
			await Promise.all(deleteImagePromises);

			// Delete main category
			await AddBannerModel.findByIdAndDelete(id);
		}

		return sendSuccess(res, "Selected Banners deleted!");
	} catch (error) {
		next(error);
	}
}
