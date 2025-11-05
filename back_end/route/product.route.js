import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import {
	createProduct,
	createProductRAMs,
	createProductSize,
	createProductWeight,
	deleteMultipleProduct,
	deleteMultipleProductRAMs,
	deleteMultipleProductSizes,
	deleteMultipleProductWeights,
	deleteProduct,
	deleteProductRAMs,
	deleteProductSize,
	deleteProductWeight,
	getAllProducts,
	getAllProductsByCatId,
	getAllProductsByCatName,
	getAllProductsByPrice,
	getAllProductsByRating,
	getAllProductsBySubCatId,
	getAllProductsBySubCatName,
	getAllProductsByThirdLevelCatId,
	getAllProductsByThirdLevelCatName,
	getFeaturesProducts,
	getFilteredProducts,
	getProduct,
	getProductRAMs,
	getProductsCount,
	getProductSizes,
	getProductWeights,
	removeImageFromCloudinary,
	updateProduct,
	updateProductRAMs,
	updateProductSize,
	updateProductWeight,
	uploadImage,
} from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.post("/uploadImages", auth, upload.array("images"), uploadImage);
productRouter.post("/create", auth, createProduct);
productRouter.post("/productRAMs/create", createProductRAMs);
productRouter.post("/productSizes/create", createProductSize);
productRouter.post("/productWeights/create", createProductWeight);
productRouter.get("/getAllProducts", getAllProducts);
productRouter.get("/getAllProductsRAMs", getProductRAMs);
productRouter.get("/getAllProductsSizes", getProductSizes);
productRouter.get("/getAllProductsWeights", getProductWeights);
productRouter.get("/getAllProductsByCatId/:Id", getAllProductsByCatId);
productRouter.get("/getAllProductsByCatName", getAllProductsByCatName);
productRouter.get("/getAllProductsBySubCatId/:Id", getAllProductsBySubCatId);
productRouter.get("/getAllProductsBySubCatName", getAllProductsBySubCatName);
productRouter.get(
	"/getAllProductsByThirdLevelCatId/:Id",
	getAllProductsByThirdLevelCatId
);
productRouter.get(
	"/getAllProductsByThirdLevelCatName",
	getAllProductsByThirdLevelCatName
);
productRouter.get("/filter", getFilteredProducts);
productRouter.get("/getAllProductsByPrice", getAllProductsByPrice);
productRouter.get("/getAllProductByRating", getAllProductsByRating);
productRouter.get("/getAllProductCount", getProductsCount);
productRouter.get("/getAllFeaturedProduct", getFeaturesProducts);
productRouter.delete("/deleteImage", auth, removeImageFromCloudinary);
productRouter.delete("/deleteMultiple", deleteMultipleProduct);
productRouter.delete("/productRAMs/deleteMultiple", deleteMultipleProductRAMs);
productRouter.delete(
	"/productSizes/deleteMultiple",
	deleteMultipleProductSizes
);
productRouter.delete(
	"/productWeights/deleteMultiple",
	deleteMultipleProductWeights
);
productRouter.delete("/:id", deleteProduct);
productRouter.delete("/productRAMs/:id", deleteProductRAMs);
productRouter.delete("/productSizes/:id", deleteProductSize);
productRouter.delete("/productWeights/:id", deleteProductWeight);
productRouter.get("/:id", getProduct);
productRouter.put("/updateProduct/:id", auth, updateProduct);
productRouter.put("/updateProductRAMs/:id", auth, updateProductRAMs);
productRouter.put("/updateProductSizes/:id", auth, updateProductSize);
productRouter.put("/updateProductWeights/:id", auth, updateProductWeight);

/* ------------------------------------ Size --------------------------------- */

/* ----------------------------------- Weight -------------------------------- */

export default productRouter;
