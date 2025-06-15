import CartProductModel from "../models/cartproduct.model.js";
import UserModel from "../models/user.model.js";

export const addToCartItemController = async (req, res) => {
	try {
		const userId = req.userId;
		const { productId } = req.body;

		if (!productId) {
			return res.status(400).json({
				message: "Provide productId",
				error: true,
				success: false,
			});
		}

		const checkItemCart = await CartProductModel.findOne({
			userId: userId,
			productId: productId,
		});

		if (checkItemCart) {
			return res.status(400).json({
				message: "iem already in cart",
			});
		}

		const cartItem = new CartProductModel({
			quantity: 1,
			userId: userId,
			productId: productId,
		});

		const save = await cartItem.save();

		const updateCartUser = await UserModel.updateOne(
			{ _id: userId },
			{ $push: { shopping_cart: productId } }
		);

		return res.status(200).json({
			data: save,
			message: "Item add successfully",
			error: false,
			success: true,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
};

export const getCartItemController = async (req, res) => {
	try {
		const userId = req.userId;

		const cartItem = await CartProductModel.find({
			userId: userId,
		}).populate("productId");

		return res.json({
			data: cartItem,
			error: false,
			success: true,
		});
	} catch (error) {
		return res.status(400).json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
};

export const updateCartItemOtyController = async (req, res) => {
	try {
		const userId = req.userId;
		const { _id, qty } = req.body;

		if (!_id || !qty) {
			return res.status(400).json({
				message: "Provide _id, qty",
			});
		}

		const updatecartItem = await CartProductModel.updateOne(
			{
				_id: _id,
				userId: userId,
			},
			{
				quantity: qty,
			}
		);

		return res.status(200).json({
			message: "update cart",
			success: true,
			error: false,
			data: updatecartItem,
		});
	} catch (error) {
		return res.status(400).json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
};

export const deleteCartItemQtyController = async (req, res) => {
	try {
		const userId = req.userId;
		const { _id, productId } = req.body;

		if (!_id) {
			return res.status(400)({
				message: "Provide _id",
				error: true,
				success: false,
			});
		}

		const deleteCartItem = await CartProductModel.deleteOne({
			_id: _id,
			userId: userId,
		});

		if (!deleteCartItem) {
			return res.status(400).json({
				message: "The product in the cart is not found",
				error: true,
				success: false,
			});
		}

		const user = await UserModel.findOne({
			_id: userId,
		});

		const cartItems = user?.shopping_cart;

		const updateUserCart = [
			...cartItems.slice(0, cartItems.indexOf(productId)),
			...cartItems.slice(cartItems.indexOf(productId) + 1),
		];

		user.shopping_cart = updateInterests;
		await user.save();

		return res.json({
			message: "Item remove",
			error: false,
			success: true,
			data: deleteCartItem,
		});
	} catch (error) {
		return res.status(400).json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
};
