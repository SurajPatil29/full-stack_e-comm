import MyListModel from "../models/mylist.model.js";
import UserModel from "../models/user.model.js";
import { sendError, sendSuccess } from "../utils/response.js";

// Add to my list
export const addToMyListController = async (req, res, next) => {
	try {
		const userId = req.userId;
		const { productId } = req.body;

		if (!productId) return sendError(res, "Provide productId", 400);

		const alreadyExists = await MyListModel.findOne({ userId, productId });
		if (alreadyExists) return sendError(res, "Item already in list", 400);

		const item = await MyListModel.create({ userId, productId });

		await UserModel.updateOne(
			{ _id: userId },
			{ $push: { my_list: productId } }
		);

		return sendSuccess(res, "Item added to MyList", { data: item });
	} catch (error) {
		next(error);
	}
};

// Get all my list items
export const getMyListController = async (req, res, next) => {
	try {
		const userId = req.userId;
		const items = await MyListModel.find({ userId }).populate("productId");
		return sendSuccess(res, "MyList items fetched", { data: items });
	} catch (error) {
		next(error);
	}
};

// Delete item from MyList
export const deleteToMylistController = async (req, res, next) => {
	try {
		const userId = req.userId;
		const productId = req.params.id;

		const deleted = await MyListModel.deleteOne({ userId, productId });

		await UserModel.updateOne(
			{ _id: userId },
			{ $pull: { my_list: productId } }
		);

		return sendSuccess(res, "Item removed from MyList", { data: deleted });
	} catch (error) {
		next(error);
	}
};
