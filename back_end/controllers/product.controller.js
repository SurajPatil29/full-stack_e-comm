// product.controller.js
import ProductModel from "../models/product.model.js";
import fs from "fs";
import cloudinary from "../config/cloudinary.js";
import { sendError, sendSuccess } from "../utils/response.js";
import { buildProductQuery } from "../utils/filterQuery.js";
import { extractPublicIdFromUrl } from "../utils/cloudinary.js";
import mongoose from "mongoose";
import productRAMsModel from "../models/productRams.model.js";
import productSizesModel from "../models/produtsSize.model.js";
import productWeightsModel from "../models/productWeight.model.js";

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

		// ✅ Upload images if present
		let uploadedImages = [];
		if (req.files && req.files.length > 0) {
			uploadedImages = await uploadToCloudinary(req.files);
		}

		// ✅ Normalize string → array
		const parseToArray = (val) => {
			if (!val) return [];
			if (Array.isArray(val)) return val;
			return val.split(",").map((v) => v.trim());
		};

		const product = new ProductModel({
			name,
			description,
			images: images?.length ? images : uploadedImages,
			brand: brand || "",
			price,
			oldPrice: oldPrice || null,
			catId: catId || null,
			catName: catName || "",
			subCatId: subCatId || null,
			subCat: subCat || "",
			thirdsubCatId: thirdsubCatId || null,
			thirdsubCat: thirdsubCat || "",
			countInStock: countInStock || 0,
			rating: rating || 0,
			isFeatured: isFeatured || false,
			discount: discount || 0,

			// ✅ Arrays
			productRam: parseToArray(productRam),
			size: parseToArray(size),
			productWeight: parseToArray(productWeight),
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

// controllers/product.controller.js
export async function getFilteredProducts(req, res, next) {
	try {
		const { catId, subCatId, thirdsubCatId } = req.query;
		console.log(thirdsubCatId);

		const query = {
			...(catId && { catId }),
			...(subCatId && { subCatId }),
			...(thirdsubCatId && { thirdsubCatId }),
		};

		const products = await ProductModel.find(query);
		return sendSuccess(res, "Filtered products fetched", { products });
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
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return sendError(res, "Invalid product ID", 400);
		}

		const updateData = { ...req.body };

		// ✅ If frontend sends string like "4GB,8GB" → convert to array
		const parseToArray = (val) => {
			if (!val) return [];
			if (Array.isArray(val)) return val;
			return val.split(",").map((v) => v.trim());
		};

		if (updateData.productRam)
			updateData.productRam = parseToArray(updateData.productRam);
		if (updateData.size) updateData.size = parseToArray(updateData.size);
		if (updateData.productWeight)
			updateData.productWeight = parseToArray(updateData.productWeight);

		// ✅ Handle file uploads if any new images
		if (req.files && req.files.length > 0) {
			const uploadedImages = await uploadToCloudinary(req.files);
			updateData.images = uploadedImages;
		}

		const updated = await ProductModel.findByIdAndUpdate(
			req.params.id,
			updateData,
			{ new: true }
		);

		if (!updated) return sendError(res, "Product not updated", 404);
		return sendSuccess(res, "Product updated successfully", {
			product: updated,
		});
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

// ✅ Create Product RAM
export async function createProductRAMs(req, res, next) {
	try {
		const { name } = req.body;

		// Validate input
		if (!name || name.trim() === "") {
			return sendError(res, "RAM name is required", 400);
		}

		// Check for duplicate
		const existingRAM = await productRAMsModel.findOne({
			name: { $regex: new RegExp(`^${name}$`, "i") },
		});
		if (existingRAM) {
			return sendError(res, "RAM with this name already exists", 400);
		}

		// Create new RAM
		const productRAMs = await productRAMsModel.create({ name });

		// Send success response
		return sendSuccess(res, "Product RAM created successfully", {
			productRAMs,
		});
	} catch (error) {
		next(error);
	}
}

// ✅ Delete single Product RAM
export async function deleteProductRAMs(req, res, next) {
	try {
		// Validate ObjectId
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return sendError(res, "Invalid RAM ID", 400);
		}

		// Find RAM entry
		const productRAM = await productRAMsModel.findById(req.params.id);
		if (!productRAM) {
			return sendError(res, "Product RAM not found", 404);
		}

		// Delete from DB
		await productRAM.deleteOne();

		// Send success response
		return sendSuccess(res, "Product RAM deleted successfully");
	} catch (error) {
		next(error);
	}
}

// ✅ Delete multiple Product RAMs
export async function deleteMultipleProductRAMs(req, res, next) {
	try {
		const ids = req.body;
		// Validate input
		if (!ids || !Array.isArray(ids) || ids.length === 0) {
			return sendError(res, "Invalid input: Expected array of IDs", 400);
		}

		// Optional: validate each ID
		const invalidIds = ids.filter((id) => !mongoose.Types.ObjectId.isValid(id));
		if (invalidIds.length > 0) {
			return sendError(
				res,
				`Invalid Object IDs: ${invalidIds.join(", ")}`,
				400
			);
		}

		// Check if RAMs exist before deletion
		const existing = await productRAMsModel.find({ _id: { $in: ids } });
		if (existing.length === 0) {
			return sendError(res, "No Product RAMs found for the given IDs", 404);
		}

		// Delete from DB
		await productRAMsModel.deleteMany({ _id: { $in: ids } });

		return sendSuccess(res, "Product RAMs deleted successfully");
	} catch (error) {
		next(error);
	}
}

// ✅ Update Product RAM
export async function updateProductRAMs(req, res, next) {
	try {
		const { name } = req.body;
		const { id } = req.params;

		// ✅ Validate ID
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return sendError(res, "Invalid RAM ID", 400);
		}

		// ✅ Validate name
		if (!name || name.trim() === "") {
			return sendError(res, "RAM name is required", 400);
		}

		// ✅ Check if another RAM with the same name already exists
		const existingRAM = await productRAMsModel.findOne({
			name: { $regex: new RegExp(`^${name}$`, "i") },
			_id: { $ne: id }, // exclude current record
		});

		if (existingRAM) {
			return sendError(res, "A RAM with this name already exists", 400);
		}

		// ✅ Update the record
		const updatedRAM = await productRAMsModel.findByIdAndUpdate(
			id,
			{ name },
			{ new: true }
		);

		if (!updatedRAM) {
			return sendError(res, "Product RAM not found or update failed", 404);
		}

		return sendSuccess(res, "Product RAM updated successfully", { updatedRAM });
	} catch (error) {
		next(error);
	}
}

// ✅ Get all Product RAMs
export async function getProductRAMs(req, res, next) {
	try {
		const productRAMs = await productRAMsModel.find().sort({ createdAt: -1 });

		// ✅ Check if empty
		if (!productRAMs || productRAMs.length === 0) {
			return sendError(res, "No Product RAMs found", 404);
		}

		return sendSuccess(res, "Product RAMs fetched successfully", {
			productRAMs,
		});
	} catch (error) {
		next(error);
	}
}

// ✅ Create Product Size
export async function createProductSize(req, res, next) {
	try {
		const { name } = req.body;

		if (!name || name.trim() === "") {
			return sendError(res, "Size name is required", 400);
		}

		const existingSize = await productSizesModel.findOne({
			name: { $regex: new RegExp(`^${name}$`, "i") },
		});
		if (existingSize) {
			return sendError(res, "Size with this name already exists", 400);
		}

		const productSize = await productSizesModel.create({ name });
		return sendSuccess(res, "Product Size created successfully", {
			productSize,
		});
	} catch (error) {
		next(error);
	}
}

// ✅ Delete single Product Size
export async function deleteProductSize(req, res, next) {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return sendError(res, "Invalid Size ID", 400);
		}

		const productSize = await productSizesModel.findById(req.params.id);
		if (!productSize) {
			return sendError(res, "Product Size not found", 404);
		}

		await productSize.deleteOne();
		return sendSuccess(res, "Product Size deleted successfully");
	} catch (error) {
		next(error);
	}
}

// ✅ Delete multiple Product Sizes
export async function deleteMultipleProductSizes(req, res, next) {
	try {
		const ids = req.body;
		if (!ids || !Array.isArray(ids) || ids.length === 0) {
			return sendError(res, "Invalid input: Expected array of IDs", 400);
		}

		const invalidIds = ids.filter((id) => !mongoose.Types.ObjectId.isValid(id));
		if (invalidIds.length > 0) {
			return sendError(
				res,
				`Invalid Object IDs: ${invalidIds.join(", ")}`,
				400
			);
		}

		const existing = await productSizesModel.find({ _id: { $in: ids } });
		if (existing.length === 0) {
			return sendError(res, "No Product Sizes found for the given IDs", 404);
		}

		await productSizesModel.deleteMany({ _id: { $in: ids } });
		return sendSuccess(res, "Product Sizes deleted successfully");
	} catch (error) {
		next(error);
	}
}

// ✅ Update Product Size
export async function updateProductSize(req, res, next) {
	try {
		const { name } = req.body;
		const { id } = req.params;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return sendError(res, "Invalid Size ID", 400);
		}
		if (!name || name.trim() === "") {
			return sendError(res, "Size name is required", 400);
		}

		const existingSize = await productSizesModel.findOne({
			name: { $regex: new RegExp(`^${name}$`, "i") },
			_id: { $ne: id },
		});
		if (existingSize) {
			return sendError(res, "A Size with this name already exists", 400);
		}

		const updatedSize = await productSizesModel.findByIdAndUpdate(
			id,
			{ name },
			{ new: true }
		);
		if (!updatedSize) {
			return sendError(res, "Product Size not found or update failed", 404);
		}

		return sendSuccess(res, "Product Size updated successfully", {
			updatedSize,
		});
	} catch (error) {
		next(error);
	}
}

// ✅ Get all Product Sizes
export async function getProductSizes(req, res, next) {
	try {
		const productSizes = await productSizesModel.find().sort({ createdAt: -1 });

		if (!productSizes || productSizes.length === 0) {
			return sendError(res, "No Product Sizes found", 404);
		}

		return sendSuccess(res, "Product Sizes fetched successfully", {
			productSizes,
		});
	} catch (error) {
		next(error);
	}
}

// ✅ Create Product Weight
export async function createProductWeight(req, res, next) {
	try {
		const { name } = req.body;

		if (!name || name.trim() === "") {
			return sendError(res, "Weight name is required", 400);
		}

		const existingWeight = await productWeightsModel.findOne({
			name: { $regex: new RegExp(`^${name}$`, "i") },
		});
		if (existingWeight) {
			return sendError(res, "Weight with this name already exists", 400);
		}

		const productWeight = await productWeightsModel.create({ name });
		return sendSuccess(res, "Product Weight created successfully", {
			productWeight,
		});
	} catch (error) {
		next(error);
	}
}

// ✅ Delete single Product Weight
export async function deleteProductWeight(req, res, next) {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return sendError(res, "Invalid Weight ID", 400);
		}

		const productWeight = await productWeightsModel.findById(req.params.id);
		if (!productWeight) {
			return sendError(res, "Product Weight not found", 404);
		}

		await productWeight.deleteOne();
		return sendSuccess(res, "Product Weight deleted successfully");
	} catch (error) {
		next(error);
	}
}

// ✅ Delete multiple Product Weights
export async function deleteMultipleProductWeights(req, res, next) {
	try {
		const ids = req.body;
		if (!ids || !Array.isArray(ids) || ids.length === 0) {
			return sendError(res, "Invalid input: Expected array of IDs", 400);
		}

		const invalidIds = ids.filter((id) => !mongoose.Types.ObjectId.isValid(id));
		if (invalidIds.length > 0) {
			return sendError(
				res,
				`Invalid Object IDs: ${invalidIds.join(", ")}`,
				400
			);
		}

		const existing = await productWeightsModel.find({ _id: { $in: ids } });
		if (existing.length === 0) {
			return sendError(res, "No Product Weights found for the given IDs", 404);
		}

		await productWeightsModel.deleteMany({ _id: { $in: ids } });
		return sendSuccess(res, "Product Weights deleted successfully");
	} catch (error) {
		next(error);
	}
}

// ✅ Update Product Weight
export async function updateProductWeight(req, res, next) {
	try {
		const { name } = req.body;
		const { id } = req.params;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return sendError(res, "Invalid Weight ID", 400);
		}
		if (!name || name.trim() === "") {
			return sendError(res, "Weight name is required", 400);
		}

		const existingWeight = await productWeightsModel.findOne({
			name: { $regex: new RegExp(`^${name}$`, "i") },
			_id: { $ne: id },
		});
		if (existingWeight) {
			return sendError(res, "A Weight with this name already exists", 400);
		}

		const updatedWeight = await productWeightsModel.findByIdAndUpdate(
			id,
			{ name },
			{ new: true }
		);
		if (!updatedWeight) {
			return sendError(res, "Product Weight not found or update failed", 404);
		}

		return sendSuccess(res, "Product Weight updated successfully", {
			updatedWeight,
		});
	} catch (error) {
		next(error);
	}
}

// ✅ Get all Product Weights
export async function getProductWeights(req, res, next) {
	console.log("controller get");
	try {
		const productWeights = await productWeightsModel
			.find()
			.sort({ createdAt: -1 });

		if (!productWeights || productWeights.length === 0) {
			return sendError(res, "No Product Weights found", 404);
		}

		return sendSuccess(res, "Product Weights fetched successfully", {
			productWeights,
		});
	} catch (error) {
		next(error);
	}
}
