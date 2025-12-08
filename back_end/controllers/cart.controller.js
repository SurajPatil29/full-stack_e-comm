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
			oldPrice,
			quantity,
			subTotal,
			productId,
			countInStock,
			ProductBrand,
			size,
			ram,
			weight,
			ramRange,
			sizeRange,
			weightRange,
		} = req.body;

		if (!productId) return sendError(res, "Provide productId", 400);

		const exists = await CartProductModel.findOne({ userId, productId });
		if (exists) return sendError(res, "Item already in cart", 400);

		const cartItem = new CartProductModel({
			productTitle: productTitle,
			image: image,
			rating: rating,
			price: price,
			oldPrice: oldPrice,
			quantity: quantity,
			subTotal: subTotal,
			productId: productId,
			countInStock: countInStock,
			userId: userId,
			ProductBrand: ProductBrand,
			size: size,
			ram: ram,
			weight: weight,
			ramRange: ramRange,
			sizeRange: sizeRange,
			weightRange: weightRange,
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
		const { _id, qty, size, ram, weight } = req.body;

		if (!_id || !qty) return sendError(res, "Provide _id and qty", 400);

		// 1. Find cart item
		const cartItem = await CartProductModel.findOne({ _id, userId });
		if (!cartItem) return sendError(res, "Cart item not found", 404);

		// 2. Calculate subtotal = quantity * price
		const newSubtotal = qty * cartItem.price;

		// 3. Update fields
		cartItem.quantity = qty;
		cartItem.size = size || cartItem.size;
		cartItem.ram = ram || cartItem.ram;
		(cartItem.weight = weight || cartItem.weight),
			(cartItem.subTotal = newSubtotal);

		// 4. Save updated item
		const updated = await cartItem.save();

		return sendSuccess(res, "Cart updated", { data: updated });
	} catch (error) {
		next(error);
	}
};

// Delete cart item
export const deleteCartItemQtyController = async (req, res, next) => {
	try {
		const userId = req.userId;
		const _id = req.params.id;

		if (!_id) return sendError(res, "Provide _id", 400);

		const deleted = await CartProductModel.deleteOne({ _id, userId });
		if (!deleted.deletedCount) {
			return sendError(res, "Item not found in cart", 404);
		}

		return sendSuccess(res, "Item removed", { data: deleted });
	} catch (error) {
		next(error);
	}
};
