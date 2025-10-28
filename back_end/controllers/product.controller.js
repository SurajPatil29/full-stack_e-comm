// product.controller.js
import ProductModel from "../models/product.model.js";
import fs from "fs";
import cloudinary from "../config/cloudinary.js";
import { sendError, sendSuccess } from "../utils/response.js";
import { buildProductQuery } from "../utils/filterQuery.js";
import { extractPublicIdFromUrl } from "../utils/cloudinary.js";
import mongoose from "mongoose";
import { error } from "console";

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

// ✅ Create Product
export async function createProduct(req, res, next) {
	try {
		const {
			name,
			description,
			brand,
			price,
			oldPrice,
			catId,
			catName,
			subCatId,
			subCat,
			thirdsubCatId,
			thirdsubCat,
			countInStock,
			rating,
			isFeatured,
			discount,
			productRam,
			size,
			productWeight,
			images,
		} = req.body;

		if (!name || !description || !price) {
			return sendError(res, "Name, description, and price are required", 422);
		}

		let uploadedImages = [];
		if (req.files && req.files.length > 0) {
			uploadedImages = await uploadToCloudinary(req.files);
		}

		const product = new ProductModel({
			name,
			description,
			images: images || uploadedImages,
			brand: brand || "",
			price,
			oldPrice: oldPrice || null,
			catId: catId || null,
			catName: catName || "",
			subCatId: subCatId || null,
			subCat: subCat || "",
			thirdsubCatId: thirdsubCatId || null,
			thirdsubCat: thirdsubCat || "",
			stock: countInStock || 0,
			rating: rating || 0,
			isFeatured: isFeatured || false,
			discount: discount || 0,
			productRam: productRam || "",
			size: size || "",
			productWeight: productWeight || "",
		});

		await product.save();

		return sendSuccess(res, "Product created successfully", { product });
	} catch (error) {
		next(error);
	}
}

// ✅ Get All Products (no pagination, handled frontend)
export async function getAllProducts(req, res, next) {
	try {
		const products = await ProductModel.find().sort({ createdAt: -1 });
		return sendSuccess(res, "Fetched products successfully", { products });
	} catch (error) {
		next(error);
	}
}

// ✅ Get Products by Category / SubCategory / ThirdLevel
export async function getAllProductsByCatId(req, res, next) {
	try {
		const products = await ProductModel.find({ catId: req.params.id });
		return sendSuccess(res, "Products by Category ID fetched", { products });
	} catch (error) {
		next(error);
	}
}

export async function getAllProductsByCatName(req, res, next) {
	try {
		const products = await ProductModel.find({ catName: req.query.catName });
		return sendSuccess(res, "Products by Category Name fetched", { products });
	} catch (error) {
		next(error);
	}
}

export async function getAllProductsBySubCatId(req, res, next) {
	try {
		const products = await ProductModel.find({ subCatId: req.params.id });
		return sendSuccess(res, "Products by SubCategory ID fetched", { products });
	} catch (error) {
		next(error);
	}
}

export async function getAllProductsBySubCatName(req, res, next) {
	try {
		const products = await ProductModel.find({ subCat: req.query.subCat });
		return sendSuccess(res, "Products by SubCategory Name fetched", {
			products,
		});
	} catch (error) {
		next(error);
	}
}

export async function getAllProductsByThirdLevelCatId(req, res, next) {
	try {
		const products = await ProductModel.find({ thirdsubCatId: req.params.id });
		return sendSuccess(res, "Products by Third-Level SubCategory ID fetched", {
			products,
		});
	} catch (error) {
		next(error);
	}
}

export async function getAllProductsByThirdLevelCatName(req, res, next) {
	try {
		const products = await ProductModel.find({
			thirdsubCat: req.query.thirdsubCat,
		});
		return sendSuccess(
			res,
			"Products by Third-Level SubCategory Name fetched",
			{ products }
		);
	} catch (error) {
		next(error);
	}
}

// ✅ Filter by Price
export async function getAllProductsByPrice(req, res, next) {
	try {
		const { minPrice, maxPrice, ...rest } = req.query;
		const query = buildProductQuery(rest);

		let products = await ProductModel.find(query);

		products = products.filter((p) => {
			if (minPrice && p.price < parseInt(minPrice)) return false;
			if (maxPrice && p.price > parseInt(maxPrice)) return false;
			return true;
		});

		return sendSuccess(res, "Filtered products by price", { products });
	} catch (error) {
		next(error);
	}
}

// ✅ Filter by Rating
export async function getAllProductsByRating(req, res, next) {
	try {
		const { rating, ...rest } = req.query;
		const query = buildProductQuery({ ...rest, rating });
		const products = await ProductModel.find(query);

		return sendSuccess(res, "Products filtered by rating", { products });
	} catch (error) {
		next(error);
	}
}

// ✅ Count
export async function getProductsCount(req, res, next) {
	try {
		const count = await ProductModel.countDocuments();
		return sendSuccess(res, "Product count fetched", { productsCount: count });
	} catch (error) {
		next(error);
	}
}

// ✅ Featured
export async function getFeaturesProducts(req, res, next) {
	try {
		const products = await ProductModel.find({ isFeatured: true });
		return sendSuccess(res, "Featured products", { products });
	} catch (error) {
		next(error);
	}
}

// ✅ Delete Product
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

// ✅ Delete multiple products
export async function deleteMultipleProduct(req, res, next) {
	try {
		const { ids } = req.body;

		// ✅ Validate input
		if (!ids || !Array.isArray(ids) || ids.length === 0) {
			return res
				.status(400)
				.json({ error: true, success: false, message: "Invalid input" });
		}

		// ✅ Find all products to delete (to get image URLs)
		const products = await ProductModel.find({ _id: { $in: ids } });

		// ✅ Delete all Cloudinary images in parallel for efficiency
		const deleteImagePromises = [];

		for (const product of products) {
			if (product?.images?.length > 0) {
				for (const imgUrl of product.images) {
					const parts = imgUrl.split("/");
					const fileName = parts[parts.length - 1];
					const publicId = fileName.split(".")[0];

					if (publicId) {
						// Push promise instead of callback style
						deleteImagePromises.push(cloudinary.uploader.destroy(publicId));
					}
				}
			}
		}

		// ✅ Wait for all image deletions to complete
		await Promise.all(deleteImagePromises);

		// ✅ Delete products from DB
		await ProductModel.deleteMany({ _id: { $in: ids } });

		// ✅ Send success response
		return res.status(200).json({
			message: "Products deleted successfully",
			error: false,
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// ✅ Single Product
export async function getProduct(req, res, next) {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id))
			return sendError(res, "Invalid product ID", 400);

		const product = await ProductModel.findById(req.params.id);
		if (!product) return sendError(res, "Product not found", 404);
		// console.log(product);
		return sendSuccess(res, "Product fetched", { data: product });
	} catch (error) {
		next(error);
	}
}

// ✅ Update Product
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

// ✅ Remove Image from Cloudinary & DB
export async function removeImageFromCloudinary(req, res, next) {
	try {
		const imgUrl = req.query.img;
		if (!imgUrl) return sendError(res, "Image URL required", 400);

		const publicId = extractPublicIdFromUrl(imgUrl);
		if (!publicId) return sendError(res, "Invalid image URL", 400);

		const result = await cloudinary.uploader.destroy(publicId);

		if (result.result !== "ok" && result.result !== "not found") {
			return sendError(res, "Failed to delete from Cloudinary", 500);
		}

		const updated = await ProductModel.updateMany(
			{ images: imgUrl },
			{ $pull: { images: imgUrl } }
		);

		return sendSuccess(res, "Image removed successfully", {
			cloudinary: result,
			db: updated,
		});
	} catch (error) {
		next(error);
	}
}
