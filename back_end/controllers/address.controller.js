import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js"; // ✅ make sure this is imported
import { sendError, sendSuccess } from "../utils/response.js";

export const addAddressController = async (req, res, next) => {
	try {
		const {
			address_line,
			city,
			state,
			pincode,
			country,
			mobile,
			status,
			userId,
		} = req.body;

		// ✅ Validation: check for missing fields
		if (
			!address_line ||
			!city ||
			!state ||
			!pincode ||
			!country ||
			!mobile ||
			!status ||
			!userId
		) {
			return sendError(res, "Please provide all required fields", 400);
		}

		const address = new AddressModel({
			address_line,
			city,
			state,
			pincode,
			country,
			mobile,
			status,
			userId,
		});

		const saveAddress = await address.save();

		const updateCartUser = await UserModel.updateOne(
			{ _id: userId },
			{
				$push: {
					address_details: saveAddress._id,
				},
			}
		);

		return sendSuccess(res, "Address added successfully", saveAddress);
	} catch (error) {
		next(error);
	}
};
