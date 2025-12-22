import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
	capturePaypalOrderController,
	createOrderController,
	createPaypalOrderController,
	getAllOrdersController,
	getOrderDetailsController,
	totalSalesController,
	totalUsersController,
	updateOrderController,
} from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post("/create", auth, createOrderController);
orderRouter.get("/order-list", auth, getOrderDetailsController);
orderRouter.get("/all-order-list", auth, getAllOrdersController);
orderRouter.put("/update-order/:id", auth, updateOrderController);
orderRouter.get("/create-order-paypal", auth, createPaypalOrderController);
orderRouter.get("/capture-order-paypal", auth, capturePaypalOrderController);
orderRouter.get("/sales", auth, totalSalesController);
orderRouter.get("/users", auth, totalUsersController);

export default orderRouter;
