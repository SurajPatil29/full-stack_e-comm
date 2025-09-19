import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js"; // ✅ make sure this is imported
import { sendError, sendSuccess } from "../utils/response.js";

export const addOrUpdateAddressController = async (req, res, next) => {
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

		// ✅ Find user
		const user = await UserModel.findById(userId);
		if (!user) {
			return sendError(res, "User not found", 404);
		}

		let address;

		if (user.address_details) {
			// ✅ Update existing address
			address = await AddressModel.findByIdAndUpdate(
				user.address_details,
				{
					address_line,
					city,
					state,
					pincode,
					country,
					mobile,
					status,
				},
				{ new: true } // return updated doc
			);
		} else {
			// ✅ Create new address
			address = new AddressModel({
				address_line,
				city,
				state,
				pincode,
				country,
				mobile,
				status,
				userId,
			});
			await address.save();

			// ✅ Save address reference in user
			user.address_details = address._id;
			await user.save();
		}

		return sendSuccess(res, "Address saved successfully", address);
	} catch (error) {
		next(error);
	}
};

export const getAddressController = async (req, res, next) => {
	try {
		const address = await AddressModel.find({ userId: req?.query?.userId });

		if (!address) {
			return res.status({
				error: true,
				success: false,
				message: "Address not found",
			});
		}

		return res.status({
			error: false,
			success: true,
			address: address,
		});
	} catch (error) {
		next(error);
	}
};
