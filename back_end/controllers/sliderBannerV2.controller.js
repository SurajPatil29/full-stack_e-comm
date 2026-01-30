import mongoose from "mongoose";
import fs from "fs";
import cloudinary from "../config/cloudinary.js";
import { sendSuccess, sendError } from "../utils/response.js";
import SliderBannerV2 from "../models/sliderBannerV2.model.js";

// ✅ Upload to Cloudinary helper
const uploadToCloudinary = async (
	files = [],
	folder = "classyshop/bannerimgV2",
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
		const { images, title, price, productId } = req.body;

		if (!images) {
			return sendError(res, "Images are required", 422);
		}

		const banner = new SliderBannerV2({
			images: images,
			title: title || "BannerV2",
			price: price,
			productId: productId,
		});

		await banner.save();

		return sendSuccess(res, "Banner Added successfully", { data: banner });
	} catch (error) {
		next(error);
	}
}

// ✅ Get All Banners
export async function getAllBanners(req, res, next) {
	try {
		const banners = await SliderBannerV2.find().sort({ createdAt: -1 });
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

		const banner = await SliderBannerV2.findById(id).populate("productId");
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

		const publicId = match[1]; // e.g., classyshop/bannerV2img/filename

		// Delete image from Cloudinary
		const result = await cloudinary.uploader.destroy(publicId);

		if (result.result !== "ok") {
			return sendError(
				res,
				"Image not found on Cloudinary or deletion failed",
				404,
			);
		}

		// Remove image URL from associated bannerV2
		const bannerV2 = await SliderBannerV2.findOne({ images: imgUrl });

		if (bannerV2) {
			bannerV2.images = bannerV2.images.filter((img) => img !== imgUrl);
			await bannerV2.save();
		}

		return sendSuccess(res, "Image deleted and removed from bannerV2", {
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

		const { title, images, price } = req.body; // images should be an array of URLs

		// Validate ID
		if (!mongoose.Types.ObjectId.isValid(id))
			return sendError(res, "Invalid banner ID", 400);

		// Validate input

		// Build update object
		const updateData = {};
		if (title) updateData.title = title;
		if (images) updateData.images = images; // replaces old images
		if (price) updateData.price = price;

		// Update in DB
		const updatedBanner = await SliderBannerV2.findByIdAndUpdate(
			id,
			updateData,
			{
				new: true,
			},
		);

		if (!updatedBanner) return sendError(res, "Banner not found", 404);

		return sendSuccess(res, "Banner updated successfully", {
			data: updatedBanner,
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
		const updatedBanner = await SliderBannerV2.findByIdAndUpdate(
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
		const banner = await SliderBannerV2.findById(req.params.id);
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
		await SliderBannerV2.findByIdAndDelete(req.params.id);

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
			const banner = await SliderBannerV2.findById(id);
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

			// Delete main Banner
			await SliderBannerV2.findByIdAndDelete(id);
		}

		return sendSuccess(res, "Selected Banners deleted!");
	} catch (error) {
		next(error);
	}
}
