import OrderModel from "../models/order.model.js";
import ProductModel from "../models/product.model.js";
import AddressModel from "../models/address.model.js";
import { sendError, sendSuccess } from "../utils/response.js";
import paypal from "@paypal/checkout-server-sdk";

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
			await ProductModel.findByIdAndUpdate(item.productId, {
				$inc: { countInStock: -item.quantity },
			});
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
