import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js"; // ✅ make sure this is imported
import { sendError, sendSuccess } from "../utils/response.js";

export const addAddressController = async (req, res, next) => {
	try {
		const {
			name,
			address_line,
			city,
			state,
			pincode,
			country,
			mobile,
			landmark,
			addressType,
			status,
			userId,
		} = req.body;

		// Validate required fields
		if (
			!name ||
			!address_line ||
			!city ||
			!state ||
			!pincode ||
			!country ||
			!mobile ||
			!userId
		) {
			return sendError(res, "Please provide all required fields", 400);
		}

		const user = await UserModel.findById(userId);
		if (!user) return sendError(res, "User not found", 404);

		// ⭐ LIMIT ADDRESS COUNT (MAX 4)
		if (user.address_details.length >= 4) {
			return sendError(res, "You can only save up to 4 addresses", 400);
		}

		// If status = true → Make this the only default address
		if (status === true) {
			await AddressModel.updateMany({ userId }, { status: false });
		}

		const address = await AddressModel.create({
			name,
			address_line,
			city,
			state,
			pincode,
			country,
			mobile,
			status,
			landmark,
			addressType,
			userId,
		});

		user.address_details.push(address._id);
		await user.save();

		return sendSuccess(res, "Address added successfully", address);
	} catch (error) {
		next(error);
	}
};

export const updateAddressController = async (req, res, next) => {
	try {
		const { id } = req.params;

		const updatedAddress = await AddressModel.findByIdAndUpdate(id, req.body, {
			new: true,
		});

		if (!updatedAddress) return sendError(res, "Address not found", 404);

		return sendSuccess(res, "Address updated successfully", updatedAddress);
	} catch (error) {
		next(error);
	}
};

export const setDefaultAddressController = async (req, res, next) => {
	try {
		const userId = req.userId;
		const { addressId } = req.body;

		const user = await UserModel.findById(userId);
		if (!user) return sendError(res, "User not found", 404);

		if (!user.address_details.includes(addressId)) {
			return sendError(res, "Address does not belong to user", 403);
		}

		// Set all addresses false
		await AddressModel.updateMany({ userId }, { $set: { status: false } });

		// Set selected address true
		await AddressModel.findByIdAndUpdate(addressId, { status: true });

		return sendSuccess(res, "Address selected as default");
	} catch (error) {
		next(error);
	}
};

export const getAddressController = async (req, res, next) => {
	try {
		const { userId } = req.query;

		const addressList = await AddressModel.find({ userId });

		return sendSuccess(res, "Address list fetched", addressList);
	} catch (error) {
		next(error);
	}
};

export const deleteAddressController = async (req, res, next) => {
	try {
		const userId = req.userId; // from auth middleware
		const { id } = req.params; // address ID

		if (!id) {
			return sendError(res, "Address ID is required", 400);
		}

		const user = await UserModel.findById(userId);
		if (!user) return sendError(res, "User not found", 404);

		// Check if address belongs to user
		if (!user.address_details.includes(id)) {
			return sendError(res, "Address does not belong to the user", 403);
		}

		// Delete address
		const deleted = await AddressModel.findOneAndDelete({ _id: id, userId });
		if (!deleted) return sendError(res, "Address not found", 404);

		// Remove address reference
		user.address_details = user.address_details.filter(
			(addr) => String(addr) !== String(id)
		);
		await user.save();

		return sendSuccess(res, "Address deleted successfully");
	} catch (error) {
		next(error);
	}
};
