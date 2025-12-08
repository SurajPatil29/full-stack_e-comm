import MyListModel from "../models/myList.model.js";
import { sendError, sendSuccess } from "../utils/response.js";

// Add to my list
export const addToMyListController = async (req, res, next) => {
	try {
		const userId = req.userId;
		const {
			productTitle,
			image,
			rating,
			price,
			oldPrice,
			productId,
			ProductBrand,
		} = req.body;

		if (!productId) return sendError(res, "Provide productId", 400);

		const alreadyExists = await MyListModel.findOne({ userId, productId });
		if (alreadyExists) return sendError(res, "Item already in list", 400);

		// Save only once
		const newItem = await MyListModel.create({
			productTitle,
			image,
			rating,
			price,
			oldPrice,
			productId,
			userId,
			ProductBrand,
		});

		return sendSuccess(res, "Item added to MyList", { data: newItem });
	} catch (error) {
		next(error);
	}
};

// Get all my list items
export const getMyListController = async (req, res, next) => {
	try {
		const userId = req.userId;
		const items = await MyListModel.find({ userId });
		return sendSuccess(res, "MyList items fetched", { data: items });
	} catch (error) {
		next(error);
	}
};
// Delete item from MyList
export const deleteToMylistController = async (req, res, next) => {
	try {
		const userId = req.userId; // user authenticated from middleware
		const _id = req.params.id; // product ID coming from URL

		// Debug log
		console.log("Delete MyList:", { _id, userId });

		// Try deleting the specific user + product item
		const deleted = await MyListModel.deleteOne({ userId, _id });

		if (deleted.deletedCount === 0) {
			return sendError(res, "Item not found in MyList", 404);
		}

		return sendSuccess(res, "Item removed from MyList", {
			success: true,
			removedId: _id,
		});
	} catch (error) {
		next(error);
	}
};
