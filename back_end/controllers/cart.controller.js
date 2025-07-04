import CartProductModel from "../models/cartproduct.model.js";
import UserModel from "../models/user.model.js";
import { sendError, sendSuccess } from "../utils/response.js";

// Add item to cart
export const addToCartItemController = async (req, res, next) => {
	try {
		const userId = req.userId;
		const { productId } = req.body;

		if (!productId) return sendError(res, "Provide productId", 400);

		const exists = await CartProductModel.findOne({ userId, productId });
		if (exists) return sendError(res, "Item already in cart", 400);

		const cartItem = await CartProductModel.create({ userId, productId });

		await UserModel.updateOne(
			{ _id: userId },
			{ $push: { shopping_cart: productId } }
		);

		return sendSuccess(res, "Item added successfully", { data: cartItem });
	} catch (error) {
		next(error);
	}
};

// Get all cart items
export const getCartItemController = async (req, res, next) => {
	try {
		const userId = req.userId;
		const cartItems = await CartProductModel.find({ userId }).populate(
			"productId"
		);
		return sendSuccess(res, "Cart items fetched", { data: cartItems });
	} catch (error) {
		next(error);
	}
};

// Update cart item quantity
export const updateCartItemOtyController = async (req, res, next) => {
	try {
		const userId = req.userId;
		const { _id, qty } = req.body;

		if (!_id || !qty) return sendError(res, "Provide _id and qty", 400);

		const updated = await CartProductModel.updateOne(
			{ _id, userId },
			{ quantity: qty }
		);

		return sendSuccess(res, "Cart updated", { data: updated });
	} catch (error) {
		next(error);
	}
};

// Delete cart item
export const deleteCartItemQtyController = async (req, res, next) => {
	try {
		const userId = req.userId;
		const { _id, productId } = req.body;

		if (!_id || !productId)
			return sendError(res, "Provide _id and productId", 400);

		const deleted = await CartProductModel.deleteOne({ _id, userId });
		if (!deleted.deletedCount) {
			return sendError(res, "Item not found in cart", 404);
		}

		const user = await UserModel.findById(userId);
		user.shopping_cart = user.shopping_cart.filter(
			(pid) => pid.toString() !== productId
		);
		await user.save();

		return sendSuccess(res, "Item removed", { data: deleted });
	} catch (error) {
		next(error);
	}
};
