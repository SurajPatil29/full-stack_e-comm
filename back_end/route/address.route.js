import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
	addOrUpdateAddressController,
	deleteAddressController,
	getAddressController,
} from "../controllers/address.controller.js";

const addressRouter = Router();

addressRouter.post("/add", auth, addOrUpdateAddressController);
addressRouter.get("/get", auth, getAddressController);
addressRouter.delete("/:id", auth, deleteAddressController);

export default addressRouter;
