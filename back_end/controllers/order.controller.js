import OrderModel from "../models/order.model.js";
import ProductModel from "../models/product.model.js";
import AddressModel from "../models/address.model.js";
import { sendError, sendSuccess } from "../utils/response.js";
import paypal from "@paypal/checkout-server-sdk";
import UserModel from "../models/user.model.js";

/**
 * ✅ CREATE ORDER CONTROLLER
 * - Secure (price & stock verified from DB)
 * - Supports Razorpay / PayPal / COD
 * - Prevents price tampering
 * - Validates address ownership
 */
export const createOrderController = async (req, res, next) => {
	try {
		const userId = req.userId;

		const {
			products,
			paymentId,
			payment_status,
			payment_method,
			delivery_address,
			totalAmt,
		} = req.body;

		/* ================== BASIC VALIDATIONS ================== */

		if (!products || !Array.isArray(products) || products.length === 0) {
			return sendError(res, "Order must contain at least one product", 422);
		}

		if (!delivery_address) {
			return sendError(res, "Delivery address is required", 422);
		}

		if (!totalAmt || totalAmt <= 0) {
			return sendError(res, "Invalid total amount", 422);
		}

		if (!payment_method) {
			return sendError(res, "Payment method is required", 422);
		}

		/* ================== PAYMENT METHOD VALIDATION ================== */

		const allowedMethods = ["razorpay", "paypal", "cod"];

		if (!allowedMethods.includes(payment_method)) {
			return sendError(res, "Invalid payment method", 400);
		}

		// Online payments must have paymentId
		if (payment_method !== "cod" && !paymentId) {
			return sendError(res, "Payment ID is required for online payment", 422);
		}

		/* ================== ADDRESS OWNERSHIP ================== */

		const addressExists = await AddressModel.findOne({
			_id: delivery_address,
			userId,
		});

		if (!addressExists) {
			return sendError(res, "Invalid delivery address", 404);
		}

		/* ================== PRODUCT VALIDATION & CALCULATION ================== */

		let calculatedTotal = 0;
		const sanitizedProducts = [];

		for (let i = 0; i < products.length; i++) {
			const item = products[i];

			if (!item.productId || !item.quantity || item.quantity <= 0) {
				return sendError(res, `Invalid product at index ${i}`, 422);
			}

			// 🔐 Always fetch product from DB (prevents price hacking)
			const productFromDB = await ProductModel.findById(item.productId);

			if (!productFromDB) {
				return sendError(res, "Product not found", 404);
			}

			if (productFromDB.countInStock < item.quantity) {
				return sendError(
					res,
					`Insufficient stock for ${productFromDB.name}`,
					400
				);
			}

			const price = productFromDB.price;
			const subTotal = price * item.quantity;

			calculatedTotal += subTotal;

			sanitizedProducts.push({
				productId: productFromDB._id,
				productsTitle: productFromDB.name,
				quantity: item.quantity,
				price,
				image: productFromDB.images?.[0] || "",
				subTotal,
			});
		}

		/* ================== PRICE TAMPERING CHECK ================== */

		if (calculatedTotal !== totalAmt) {
			return sendError(res, "Order total mismatch", 400);
		}

		/* ================== CREATE ORDER ================== */

		const order = await OrderModel.create({
			userId,
			products: sanitizedProducts,
			payment_method,
			paymentId: paymentId || "",
			payment_status:
				payment_method === "cod" ? "pending" : payment_status || "pending",
			order_status: "pending",
			delivery_address,
			totalAmt: calculatedTotal,
		});

		/* ================== OPTIONAL: REDUCE STOCK ================== */
		// (recommended for production)
		for (const item of sanitizedProducts) {
			await ProductModel.findByIdAndUpdate(
				item.productId,
				{
					$inc: {
						countInStock: -item.quantity, // reduce stock
						sale: item.quantity, // increase sales
					},
				},
				{ new: true }
			);
		}

		return sendSuccess(res, "Order placed successfully", { order });
	} catch (error) {
		next(error);
	}
};

/**
 * ✅ GET USER ORDERS
 */
export const getOrderDetailsController = async (req, res, next) => {
	try {
		const userId = req.userId;

		const orders = await OrderModel.find({ userId })
			.populate({
				path: "userId",
				select: "name email mobile avatar", // 🔐 safe fields only
			})
			.populate({
				path: "delivery_address",
				select: "-__v",
			})
			.sort({ createdAt: -1 });

		return sendSuccess(res, "Order list fetched", { orders });
	} catch (error) {
		next(error);
	}
};

export const getAllOrdersController = async (req, res, next) => {
	try {
		const orders = await OrderModel.find()
			.populate({
				path: "userId",
				select: "name email mobile avatar", // 🔐 safe fields only
			})
			.populate({
				path: "delivery_address",
				select: "-__v",
			})
			.sort({ createdAt: -1 });

		return sendSuccess(res, "All orders fetched", { orders });
	} catch (error) {
		next(error);
	}
};

export const updateOrderController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const updates = { ...req.body };

		const order = await OrderModel.findById(id);
		if (!order) {
			return res.status(404).json({
				error: true,
				message: "Order not found",
			});
		}

		// ✅ AUTO PAYMENT SUCCESS FOR COD
		if (
			order.payment_method === "cod" &&
			updates.order_status === "delivered"
		) {
			updates.payment_status = "success";
		}

		const updatedOrder = await OrderModel.findByIdAndUpdate(
			id,
			{ $set: updates },
			{ new: true }
		);

		return sendSuccess(res, "Order updated", updatedOrder);
	} catch (error) {
		next(error);
	}
};

export function getPayPalClient() {
	const environment =
		process.env.PAYPAL_MODE === "live"
			? new paypal.core.LiveEnvironment(
					process.env.PAYPAL_CLIENT_ID_LIVE,
					process.env.PAYPAL_SECRET_LIVE
			  )
			: new paypal.core.SandboxEnvironment(
					process.env.PAYPAL_CLIENT_ID_TEST,
					process.env.PAYPAL_SECRET_TEST
			  );

	return new paypal.core.PayPalHttpClient(environment);
}

export const createPaypalOrderController = async (req, res, next) => {
	try {
		const { totalAmt } = req.body;

		if (!totalAmt || totalAmt <= 0) {
			return sendError(res, "Invalid amount", 422);
		}

		const request = new paypal.orders.OrdersCreateRequest();
		request.prefer("return=representation");

		request.requestBody({
			intent: "CAPTURE",
			purchase_units: [
				{
					amount: {
						currency_code: "USD",
						value: totalAmt.toFixed(2),
					},
				},
			],
		});

		const client = getPayPalClient();
		const order = await client.execute(request);

		return sendSuccess(res, "PayPal order created", {
			orderId: order.result.id,
		});
	} catch (error) {
		next(error);
	}
};

export const capturePaypalOrderController = async (req, res, next) => {
	try {
		const { paypalOrderId, products, delivery_address } = req.body;
		const userId = req.userId;

		if (!paypalOrderId) {
			return sendError(res, "PayPal order ID missing", 422);
		}

		const request = new paypal.orders.OrdersCaptureRequest(paypalOrderId);
		request.requestBody({});

		const client = getPayPalClient();
		const capture = await client.execute(request);

		/* ===== VERIFICATION ===== */
		if (capture.result.status !== "COMPLETED") {
			return sendError(res, "Payment not completed", 400);
		}

		const paidAmount =
			capture.result.purchase_units[0].payments.captures[0].amount.value;

		/* ===== REUSE YOUR EXISTING ORDER LOGIC ===== */
		req.body = {
			products,
			delivery_address,
			totalAmt: Number(paidAmount),
			payment_method: "paypal",
			payment_status: "success",
			paymentId: paypalOrderId,
		};

		return createOrderController(req, res, next);
	} catch (error) {
		next(error);
	}
};

export const totalSalesController = async (req, res, next) => {
	try {
		const currentYear = new Date().getFullYear();

		const sales = await OrderModel.aggregate([
			{
				$match: {
					createdAt: {
						$gte: new Date(`${currentYear}-01-01`),
						$lt: new Date(`${currentYear + 1}-01-01`),
					},
				},
			},
			{
				$group: {
					_id: { $month: "$createdAt" },
					TotalSales: { $sum: "$totalAmt" },
				},
			},
		]);

		const monthlySales = [
			{ name: "JAN", TotalSales: 0 },
			{ name: "FEB", TotalSales: 0 },
			{ name: "MAR", TotalSales: 0 },
			{ name: "APR", TotalSales: 0 },
			{ name: "MAY", TotalSales: 0 },
			{ name: "JUN", TotalSales: 0 },
			{ name: "JUL", TotalSales: 0 },
			{ name: "AUG", TotalSales: 0 },
			{ name: "SEP", TotalSales: 0 },
			{ name: "OCT", TotalSales: 0 },
			{ name: "NOV", TotalSales: 0 },
			{ name: "DEC", TotalSales: 0 },
		];

		let totalSales = 0;

		for (const item of sales) {
			const index = item._id - 1;
			monthlySales[index].TotalSales = item.TotalSales;
			totalSales += item.TotalSales;
		}

		return sendSuccess(res, "Total sales fetched successfully", {
			totalSales,
			monthlySales,
		});
	} catch (error) {
		next(error);
	}
};

export const totalUsersController = async (req, res, next) => {
	try {
		const currentYear = new Date().getFullYear();

		const users = await UserModel.aggregate([
			{
				$match: {
					role: "USER",
					createdAt: {
						$gte: new Date(`${currentYear}-01-01`),
						$lt: new Date(`${currentYear + 1}-01-01`),
					},
				},
			},
			{
				$group: {
					_id: { month: { $month: "$createdAt" } },
					TotalUsers: { $sum: 1 },
				},
			},
			{
				$sort: { "_id.month": 1 },
			},
		]);

		const monthlyUsers = [
			{ name: "JAN", TotalUsers: 0 },
			{ name: "FEB", TotalUsers: 0 },
			{ name: "MAR", TotalUsers: 0 },
			{ name: "APR", TotalUsers: 0 },
			{ name: "MAY", TotalUsers: 0 },
			{ name: "JUN", TotalUsers: 0 },
			{ name: "JUL", TotalUsers: 0 },
			{ name: "AUG", TotalUsers: 0 },
			{ name: "SEP", TotalUsers: 0 },
			{ name: "OCT", TotalUsers: 0 },
			{ name: "NOV", TotalUsers: 0 },
			{ name: "DEC", TotalUsers: 0 },
		];

		let totalUsers = 0;

		for (const item of users) {
			const index = item._id.month - 1; // 0-based
			monthlyUsers[index].TotalUsers = item.TotalUsers;
			totalUsers += item.TotalUsers;
		}

		return sendSuccess(res, "Total users fetched successfully", {
			totalUsers,
			monthlyUsers,
		});
	} catch (error) {
		next(error);
	}
};
