import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
	addToCartItemController,
	deleteCartItemQtyController,
	getCartItemController,
	updateCartItemOtyController,
} from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.post("/add", auth, addToCartItemController);
cartRouter.get("/get", auth, getCartItemController);
cartRouter.put("/update-qty", auth, updateCartItemOtyController);
cartRouter.delete("/delete-cart-item", auth, deleteCartItemQtyController);

export default cartRouter;
