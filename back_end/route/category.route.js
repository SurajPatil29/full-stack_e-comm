import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import {
	createCategory,
	deleteCategory,
	getCategories,
	getCategoriesCount,
	getCategory,
	getSubCategoriesCount,
	removeImageFromCloudinary,
	updateCategory,
	uploadImage,
} from "../controllers/category.controllers.js";

const categoryRouter = Router();

categoryRouter.post("/uploadImages", auth, upload.array("images"), uploadImage);
categoryRouter.post("/create", auth, createCategory);
categoryRouter.get("/categories", getCategories);
categoryRouter.get("/get/count", getCategoriesCount);
categoryRouter.get("/get/count/subCat", getSubCategoriesCount);
categoryRouter.delete("/deleteImage", auth, removeImageFromCloudinary);
categoryRouter.get("/:id", getCategory);
categoryRouter.delete("/:id", auth, deleteCategory);
categoryRouter.post("/:id", auth, updateCategory);

export default categoryRouter;
