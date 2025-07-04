// product.controller.js
import ProductModel from "../models/product.model.js";
import fs from "fs";
import cloudinary from "../config/cloudinary.js";
import { sendError, sendSuccess } from "../utils/response.js";
import { paginate } from "../utils/pagination.js";
import { buildProductQuery } from "../utils/filterQuery.js";
import { extractPublicIdFromUrl } from "../utils/cloudinary.js";
import mongoose from "mongoose";

// Helper: Upload to Cloudinary
const uploadToCloudinary = async (
	files = [],
	folder = "classyshop/productimg"
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

export async function createProduct(req, res, next) {
	try {
		const files = req.files;
		if (!files || files.length === 0)
			return sendError(res, "No images provided", 422);
		const uploadedImages = await uploadToCloudinary(files);
		const product = new ProductModel({ ...req.body, images: uploadedImages });
		await product.save();
		return sendSuccess(res, "Product created successfully", { product });
	} catch (error) {
		next(error);
	}
}

export async function getAllProducts(req, res, next) {
	try {
		const page = parseInt(req.query.page) || 1;
		const perPage = parseInt(req.query.perPage) || 10;
		const sort = req.query.sort || "createdAt";
		const order = req.query.order === "desc" ? -1 : 1;

		const { totalPages } = await paginate(ProductModel, {}, page, perPage);
		if (page > totalPages && totalPages !== 0)
			return sendError(res, "Page not found", 404);

		const products = await ProductModel.find()
			.sort({ [sort]: order })
			.skip((page - 1) * perPage)
			.limit(perPage)
			.populate("category");

		return sendSuccess(res, "Fetched products successfully", {
			data: products,
			page,
			totalPages,
		});
	} catch (error) {
		next(error);
	}
}

export async function getAllProductsByCatId(req, res, next) {
	const page = parseInt(req.query.page) || 1;
	const perPage = parseInt(req.query.perPage) || 10;
	return fetchPaginatedProducts(
		res,
		{ catId: req.params.id },
		page,
		perPage,
		"Products by Category ID fetched"
	);
}

export async function getAllProductsByCatName(req, res) {
	const { catName, page = 1, perPage = 10 } = req.query;
	return fetchPaginatedProducts(
		res,
		{ catName },
		parseInt(page),
		parseInt(perPage),
		"Products by Category Name fetched"
	);
}

export async function getAllProductsBySubCatId(req, res) {
	const { page = 1, perPage = 10 } = req.query;
	return fetchPaginatedProducts(
		res,
		{ subCatId: req.params.id },
		parseInt(page),
		parseInt(perPage),
		"Products by SubCategory ID fetched"
	);
}

export async function getAllProductsBySubCatName(req, res) {
	const { subCat, page = 1, perPage = 10 } = req.query;
	return fetchPaginatedProducts(
		res,
		{ subCat },
		parseInt(page),
		parseInt(perPage),
		"Products by SubCategory Name fetched"
	);
}

export async function getAllProductsByThirdLevelCatId(req, res) {
	const { page = 1, perPage = 10 } = req.query;
	return fetchPaginatedProducts(
		res,
		{ thirdsubCatId: req.params.id },
		parseInt(page),
		parseInt(perPage),
		"Products by Third-Level SubCategory ID fetched"
	);
}

export async function getAllProductsByThirdLevelCatName(req, res) {
	const { thirdsubCat, page = 1, perPage = 10 } = req.query;
	return fetchPaginatedProducts(
		res,
		{ thirdsubCat },
		parseInt(page),
		parseInt(perPage),
		"Products by Third-Level SubCategory Name fetched"
	);
}

export async function getAllProductsByPrice(req, res) {
	try {
		const { minPrice, maxPrice, ...rest } = req.query;
		const query = buildProductQuery(rest);
		let products = await ProductModel.find(query).populate("category");

		products = products.filter((p) => {
			if (minPrice && p.price < parseInt(minPrice)) return false;
			if (maxPrice && p.price > parseInt(maxPrice)) return false;
			return true;
		});

		return sendSuccess(res, "Filtered products by price", { products });
	} catch (error) {
		return sendError(res, error.message);
	}
}

export async function getAllProductsByRating(req, res) {
	try {
		const { rating, page = 1, perPage = 10, ...rest } = req.query;
		const query = buildProductQuery({ ...rest, rating });
		const { data, totalPages } = await paginate(
			ProductModel,
			query,
			parseInt(page),
			parseInt(perPage),
			"category"
		);
		if (page > totalPages && totalPages !== 0)
			return sendError(res, "Page not found", 404);
		return sendSuccess(res, "Products filtered by rating", {
			products: data,
			page,
			totalPages,
		});
	} catch (error) {
		return sendError(res, error.message);
	}
}

export async function getProductsCount(req, res) {
	try {
		const count = await ProductModel.countDocuments();
		return sendSuccess(res, "Product count fetched", { productsCount: count });
	} catch (error) {
		return sendError(res, error.message);
	}
}

export async function getFeaturesProducts(req, res) {
	try {
		const products = await ProductModel.find({ isFeatured: true }).populate(
			"category"
		);
		return sendSuccess(res, "Featured products", { products });
	} catch (error) {
		return sendError(res, error.message);
	}
}

export async function deleteProduct(req, res, next) {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id))
			return sendError(res, "Invalid product ID", 400);
		const product = await ProductModel.findById(req.params.id);
		if (!product) return sendError(res, "Product not found", 404);
		for (const imageUrl of product.images) {
			const publicId = extractPublicIdFromUrl(imageUrl);
			if (publicId) await cloudinary.uploader.destroy(publicId);
		}
		await product.deleteOne();
		return sendSuccess(res, "Product deleted successfully");
	} catch (error) {
		next(error);
	}
}

export async function getProduct(req, res, next) {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id))
			return sendError(res, "Invalid product ID", 400);
		const product = await ProductModel.findById(req.params.id).populate(
			"category"
		);
		if (!product) return sendError(res, "Product not found", 404);
		return sendSuccess(res, "Product fetched", { product });
	} catch (error) {
		next(error);
	}
}

export async function updateProduct(req, res, next) {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id))
			return sendError(res, "Invalid product ID", 400);
		const updateFields = { ...req.body };
		const updated = await ProductModel.findByIdAndUpdate(
			req.params.id,
			updateFields,
			{ new: true }
		);
		if (!updated) return sendError(res, "Product not updated", 404);
		return sendSuccess(res, "Product updated", { product: updated });
	} catch (error) {
		next(error);
	}
}

export async function removeImageFromCloudinary(req, res, next) {
	try {
		const imgUrl = req.query.img;
		if (!imgUrl) return sendError(res, "Image URL required", 400);
		const publicId = extractPublicIdFromUrl(imgUrl);
		if (!publicId) return sendError(res, "Invalid image URL", 400);
		const result = await cloudinary.uploader.destroy(publicId);
		if (result.result !== "ok")
			return sendError(res, "Failed to delete from Cloudinary", 404);

		const product = await ProductModel.findOne({ images: imgUrl });
		if (product) {
			product.images = product.images.filter((img) => img !== imgUrl);
			await product.save();
		}
		return sendSuccess(res, "Image removed", { result });
	} catch (error) {
		next(error);
	}
}

// Shared fetch function
async function fetchPaginatedProducts(res, query, page, perPage, message) {
	try {
		const { data, totalPages } = await paginate(
			ProductModel,
			query,
			page,
			perPage,
			"category"
		);
		if (page > totalPages && totalPages !== 0)
			return sendError(res, "Page not found", 404);
		return sendSuccess(res, message, { data, page, totalPages });
	} catch (error) {
		return sendError(res, error.message);
	}
}
