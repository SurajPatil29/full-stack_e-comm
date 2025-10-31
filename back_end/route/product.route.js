import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import {
	createProduct,
	deleteMultipleProduct,
	deleteProduct,
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
	getProductsCount,
	removeImageFromCloudinary,
	updateProduct,
	uploadImage,
} from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.post("/uploadImages", auth, upload.array("images"), uploadImage);
productRouter.post("/create", auth, createProduct);
productRouter.get("/getAllProducts", getAllProducts);
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
productRouter.delete("/:id", deleteProduct);
productRouter.get("/:id", getProduct);
productRouter.put("/updateProduct/:id", auth, updateProduct);

export default productRouter;
