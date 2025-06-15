import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
	addToMyListController,
	deleteToMylistController,
	getMyListController,
} from "../controllers/myList.controller.js";

const myListRouter = Router();

myListRouter.post("/add", auth, addToMyListController);
myListRouter.get("/", auth, getMyListController);
myListRouter.delete("/:id", auth, deleteToMylistController);

export default myListRouter;
