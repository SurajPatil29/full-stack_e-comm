import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
	addToMyListController,
	getMyListController,
	deleteToMylistController,
} from "../controllers/myList.controller.js";

const myListRouter = Router();

myListRouter.post("/mylist-add", auth, addToMyListController);
myListRouter.get("/get-mylist", auth, getMyListController);
myListRouter.delete("/delete-mylist/:id", auth, deleteToMylistController);

export default myListRouter;
