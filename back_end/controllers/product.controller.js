import ProductModel from "../models/product.model.js";

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import CategoryModel from "../models/category.model.js";
import { error } from "console";
import { response } from "express";

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
					folder: "classyshop/productimg", // 📁 target folder in Cloudinary
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

export async function createProduct(req, res) {
	try {
		const product = new ProductModel({
			name: req.body.name,
			description: req.body.description,
			images: imagesArr,
			brand: req.body.brand,
			price: req.body.price,
			oldPrice: req.body.oldPrice,
			catName: req.body.catName,
			catId: req.body.catId,
			subCatId: req.body.subCatId,
			subCat: req.body.subCat,
			thirdsubCat: req.body.thirdsubCat,
			thirdsubCatId: req.body.thirdsubCatId,
			category: req.body.category, // make sure this is included if required
			countInStock: req.body.countInStock,
			rating: req.body.rating,
			isFeatured: req.body.isFeatured, // Corrected key (case-sensitive)
			discount: req.body.discount,
			productRam: req.body.productRam,
			size: req.body.size,
			productWeight: req.body.productWeight,
		});

		await product.save();

		imagesArr = []; // Clear image array after saving

		res.status(200).json({
			message: "Product Created Successfully",
			error: false,
			success: true,
			product,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
}

export async function getAllProducts(req, res) {
	try {
		const page = parseInt(req.query.page) || 1;
		const perPage = parseInt(req.query.perPage);
		const totalPosts = await ProductModel.countDocuments();
		const totalPages = Math.ceil(totalPosts / perPage);

		if (page > totalPages) {
			return res.status(404).json({
				message: "Page not found",
				success: false,
				error: true,
			});
		}

		const products = await ProductModel.find()
			.populate("category")
			.skip((page - 1) * perPage)
			.limit(perPage)
			.exec();

		if (!products) {
			res.status(500).json({
				error: true,
				success: false,
			});
		}

		return res.status(200).json({
			error: false,
			success: true,
			data: products,
			totalPages: totalPages,
			page: page,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
}

export async function getAllProductsByCatId(req, res) {
	try {
		const page = parseInt(req.query.page) || 1;
		const perPage = parseInt(req.query.perPage);
		const totalPosts = await ProductModel.countDocuments();
		const totalPages = Math.ceil(totalPosts / perPage);

		if (page > totalPages) {
			return res.status(404).json({
				message: "Page not found",
				success: false,
				error: true,
			});
		}
		console.log(req.params.Id);
		const products = await ProductModel.find({ catId: req.params.Id })
			.populate("category")
			.skip((page - 1) * perPage)
			.limit(perPage)
			.exec();

		if (!products) {
			res.status(500).json({
				error: true,
				success: false,
			});
		}

		return res.status(200).json({
			error: false,
			success: true,
			data: products,
			totalPages: totalPages,
			page: page,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
}

export async function getAllProductsByCatName(req, res) {
	try {
		const page = parseInt(req.query.page) || 1;
		const perPage = parseInt(req.query.perPage);
		const totalPosts = await ProductModel.countDocuments();
		const totalPages = Math.ceil(totalPosts / perPage);

		if (page > totalPages) {
			return res.status(404).json({
				message: "Page not found",
				success: false,
				error: true,
			});
		}
		// console.log(req.params.Id);
		const products = await ProductModel.find({ catName: req.query.catName })
			.populate("category")
			.skip((page - 1) * perPage)
			.limit(perPage)
			.exec();

		if (!products) {
			res.status(500).json({
				error: true,
				success: false,
			});
		}

		return res.status(200).json({
			error: false,
			success: true,
			data: products,
			totalPages: totalPages,
			page: page,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
}

export async function getAllProductsBySubCatId(req, res) {
	try {
		const page = parseInt(req.query.page) || 1;
		const perPage = parseInt(req.query.perPage);
		const totalPosts = await ProductModel.countDocuments();
		const totalPages = Math.ceil(totalPosts / perPage);

		if (page > totalPages) {
			return res.status(404).json({
				message: "Page not found",
				success: false,
				error: true,
			});
		}
		console.log(req.params.Id);
		const products = await ProductModel.find({ subCatId: req.params.Id })
			.populate("category")
			.skip((page - 1) * perPage)
			.limit(perPage)
			.exec();

		if (!products) {
			res.status(500).json({
				error: true,
				success: false,
			});
		}

		return res.status(200).json({
			error: false,
			success: true,
			data: products,
			totalPages: totalPages,
			page: page,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
}

export async function getAllProductsBySubCatName(req, res) {
	try {
		const page = parseInt(req.query.page) || 1;
		const perPage = parseInt(req.query.perPage);
		const totalPosts = await ProductModel.countDocuments();
		const totalPages = Math.ceil(totalPosts / perPage);

		if (page > totalPages) {
			return res.status(404).json({
				message: "Page not found",
				success: false,
				error: true,
			});
		}
		// console.log(req.params.Id);
		const products = await ProductModel.find({ subCat: req.query.subCat })
			.populate("category")
			.skip((page - 1) * perPage)
			.limit(perPage)
			.exec();

		if (!products) {
			res.status(500).json({
				error: true,
				success: false,
			});
		}

		return res.status(200).json({
			error: false,
			success: true,
			data: products,
			totalPages: totalPages,
			page: page,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
}

export async function getAllProductsByThirdLevelCatId(req, res) {
	try {
		const page = parseInt(req.query.page) || 1;
		const perPage = parseInt(req.query.perPage);
		const totalPosts = await ProductModel.countDocuments();
		const totalPages = Math.ceil(totalPosts / perPage);

		if (page > totalPages) {
			return res.status(404).json({
				message: "Page not found",
				success: false,
				error: true,
			});
		}
		// console.log(req.params.Id);
		const products = await ProductModel.find({ thirdsubCatId: req.params.Id })
			.populate("category")
			.skip((page - 1) * perPage)
			.limit(perPage)
			.exec();

		if (!products) {
			res.status(500).json({
				error: true,
				success: false,
			});
		}

		return res.status(200).json({
			error: false,
			success: true,
			data: products,
			totalPages: totalPages,
			page: page,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
}

export async function getAllProductsByThirdLevelCatName(req, res) {
	try {
		const page = parseInt(req.query.page) || 1;
		const perPage = parseInt(req.query.perPage);
		const totalPosts = await ProductModel.countDocuments();
		const totalPages = Math.ceil(totalPosts / perPage);

		if (page > totalPages) {
			return res.status(404).json({
				message: "Page not found",
				success: false,
				error: true,
			});
		}
		// console.log(req.params.Id);
		const products = await ProductModel.find({
			thirdsubCat: req.query.thirdsubCat,
		})
			.populate("category")
			.skip((page - 1) * perPage)
			.limit(perPage)
			.exec();

		if (!products) {
			res.status(500).json({
				error: true,
				success: false,
			});
		}

		return res.status(200).json({
			error: false,
			success: true,
			data: products,
			totalPages: totalPages,
			page: page,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
}

export async function getAllProductsByPrice(req, res) {
	let productList = [];

	if (req.query.catId !== "" && req.query.catId !== undefined) {
		const productListArr = await ProductModel.find({
			catId: req.query.catId,
		}).populate("category");

		productList = productListArr;
	}

	if (req.query.subCatId !== "" && req.query.subCatId !== undefined) {
		const productListArr = await ProductModel.find({
			subCatId: req.query.subCatId,
		}).populate("category");

		productList = productListArr;
	}

	if (req.query.thirdsubCatId !== "" && req.query.thirdsubCatId !== undefined) {
		const productListArr = await ProductModel.find({
			thirdsubCatId: req.query.thirdsubCatId,
		}).populate("category");

		productList = productListArr;
	}

	const filteredProducts = productList.filter((product) => {
		if (req.query.minPrice && product.price < parseInt(+req.query.minPrice)) {
			return false;
		}
		if (req.query.maxPrice && product.price > parseInt(+req.query.maxPrice)) {
			return false;
		}

		return true;
	});

	return res.status(200).json({
		error: false,
		success: true,
		products: filteredProducts,
		totalPages: 0,
		page: 0,
	});
}

export async function getAllProductsByRating(req, res) {
	try {
		const page = parseInt(req.query.apge) || 1;
		const perPage = parseInt(req.query.perPage) || 10000;

		const totalPosts = await ProductModel.countDocuments();
		const totalPages = Math.ceil(totalPosts / perPage);

		if (page > totalPages) {
			return res.status(404).json({
				message: "Page not found",
				success: false,
				error: true,
			});
		}

		let products = [];

		if (req.query.catId !== undefined) {
			products = await ProductModel.find({
				rating: req.query.rating,
				catId: req.query.catId,
			})
				.populate("category")
				.skip((page - 1) * perPage)
				.limit(perPage)
				.exec();
		}

		if (req.query.subCatId !== undefined) {
			products = await ProductModel.find({
				rating: req.query.rating,
				subCatId: req.query.subCatId,
			})
				.populate("category")
				.skip((page - 1) * perPage)
				.limit(perPage)
				.exec();
		}

		if (req.query.thirdsubCatId !== undefined) {
			products = await ProductModel.find({
				rating: req.query.rating,
				thirdsubCatId: req.query.thirdsubCatId,
			})
				.populate("category")
				.skip((page - 1) * perPage)
				.limit(perPage)
				.exec();
		}

		if (!products) {
			res.status(500).json({
				error: true,
				success: false,
			});
		}

		return res.status(200).json({
			error: false,
			success: true,
			products: products,
			totalPages: totalPages,
			page: page,
		});
	} catch (error) {
		return res.status(400).json({
			message: error.message || message,
			error: true,
			success: false,
		});
	}
}

export async function getProductsCount(req, res) {
	try {
		const productsCount = await ProductModel.countDocuments();

		if (!productsCount) {
			res.status(400).json({
				error: true,
				success: false,
			});
		}

		return res.status(200).json({
			error: false,
			success: true,
			productsCount: productsCount,
		});
	} catch (error) {
		return res.status(400).json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
}

export async function getFeaturesProducts(req, res) {
	try {
		const products = await ProductModel.find({
			isFeatured: true,
		}).populate("category");

		if (!products) {
			res.status(400).json({
				error: true,
				success: false,
			});
		}

		return res.status(200).json({
			error: false,
			success: true,
			products: products,
		});
	} catch (error) {
		return res.status(400).json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
}

export async function deleteProduct(req, res) {
	try {
		const product = await ProductModel.findById(req.params.id).populate(
			"category"
		);

		if (!product) {
			return res.status(400).json({
				message: "Product Not Found",
				error: true,
				success: false,
			});
		}

		const images = product.images;

		// Delete each image from Cloudinary
		for (const imageUrl of images) {
			const match = imageUrl.match(
				/upload\/(?:v\d+\/)?(.+)\.(jpg|jpeg|png|webp|gif)/
			);
			if (match && match[1]) {
				const publicId = match[1]; // example: classyshop/categoryimg/image_name
				await cloudinary.uploader.destroy(publicId);
			}
		}

		// Delete product from DB
		const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);

		if (!deletedProduct) {
			return res.status(400).json({
				message: "Product not deleted!",
				success: false,
				error: true,
			});
		}

		return res.status(200).json({
			message: "Product deleted successfully",
			success: true,
			error: false,
		});
	} catch (error) {
		console.error("Delete Product Error:", error);
		return res.status(500).json({
			message: error.message || "Server Error",
			success: false,
			error: true,
		});
	}
}

export async function getProduct(req, res) {
	try {
		const product = await ProductModel.findById(req.params.id).populate(
			"category"
		);

		if (!product) {
			return res.status(400).json({
				message: "The product is not found",
				error: true,
				success: false,
			});
		}

		return res.status(200).json({
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
		const category = await ProductModel.findOne({ images: imgUrl });

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

export async function updateProduct(req, res) {
	try {
		const product = await ProductModel.findByIdAndUpdate(req.params.id, {
			name: req.body.name,
			description: req.body.description,
			images: imagesArr,
			brand: req.body.brand,
			price: req.body.price,
			oldPrice: req.body.oldPrice,
			catName: req.body.catName,
			catId: req.body.catId,
			subCatId: req.body.subCatId,
			subCat: req.body.subCat,
			thirdsubCat: req.body.thirdsubCat,
			thirdsubCatId: req.body.thirdsubCatId,
			category: req.body.category, // make sure this is included if required
			countInStock: req.body.countInStock,
			rating: req.body.rating,
			isFeatured: req.body.isFeatured, // Corrected key (case-sensitive)
			discount: req.body.discount,
			productRam: req.body.productRam,
			size: req.body.size,
			productWeight: req.body.productWeight,
		});

		if (!product) {
			res.status(404).json({
				message: "The product can not be updated",
			});
		}

		imagesArr = [];

		return res.status(200).json({
			message: "The product is updated",
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
