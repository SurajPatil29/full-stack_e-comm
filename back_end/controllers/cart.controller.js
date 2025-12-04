import CartProductModel from "../models/cartproduct.model.js";
import { sendError, sendSuccess } from "../utils/response.js";

// Add item to cart
export const addToCartItemController = async (req, res, next) => {
	try {
		const userId = req.userId;
		const {
			productTitle,
			image,
			rating,
			price,
			quantity,
			subTotal,
			productId,
			countInStock,
		} = req.body;

		if (!productId) return sendError(res, "Provide productId", 400);

		const exists = await CartProductModel.findOne({ userId, productId });
		if (exists) return sendError(res, "Item already in cart", 400);

		const checkItemCart = await CartProductModel.findOne({ userId, productId });

		if (checkItemCart) {
			return sendError(res, "Item alredy in Cart", 400);
		}

		const cartItem = new CartProductModel({
			productTitle: productTitle,
			image: image,
			rating: rating,
			price: price,
			quantity: quantity,
			subTotal: subTotal,
			productId: productId,
			countInStock: countInStock,
			userId: userId,
		});

		const save = await cartItem.save();

		return sendSuccess(res, "Item added successfully", { data: save });
	} catch (error) {
		next(error);
	}
};

// Get all cart items
export const getCartItemController = async (req, res, next) => {
	try {
		const userId = req.userId;
		const cartItems = await CartProductModel.find({ userId });

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
			{ _id, _id, userId: userId },
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

		return sendSuccess(res, "Item removed", { data: deleted });
	} catch (error) {
		next(error);
	}
};
