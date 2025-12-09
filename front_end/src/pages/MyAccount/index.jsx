import {
	Button,
	CircularProgress,
	Drawer,
	IconButton,
	InputAdornment,
	TextField,
} from "@mui/material";
import AccountSideBar from "../../componants/AccountSideBar";
import { useState, useEffect, useContext } from "react";
import { deleteDataReview, fetchDataFromApi, postData } from "../../utils/api";
import {
	FaEye,
	FaEyeSlash,
	FaRegEdit,
	FaCheck,
	FaChevronUp,
	FaChevronDown,
} from "react-icons/fa";

import "react-international-phone/style.css";
import { PhoneInput } from "react-international-phone";
import MyContext from "../../context/MyContext";
import AddressCard from "./AddressCard";
import { useNavigate } from "react-router-dom";

function MyAccount() {
	const [userDetails, setUserDetails] = useState({
		name: "",
		email: "",
		mobile: "",
		oldPassword: "",
		newPassword: "",
		confermPassword: "",
	});
	const [showPassword, setShowPassword] = useState({
		old: false,
		new: false,
		confirm: false,
	});
	const [editMode, setEditMode] = useState({
		name: false,
		email: false,
		mobile: false,
	});
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const context = useContext(MyContext);
	const userId = localStorage.getItem("userId");
	const [changePass, setChangePass] = useState(false);

	const [showMore, setShowMore] = useState(false);
	const address = context?.userData?.address_details;
	const isGoogleLogIn = context?.userData?.signUpWithGoogle || false;
	const selectedAddress = address?.find((a) => a.status === true);
	const otherAddresses = address?.filter((a) => a.status !== true);
	const [openDrawer, setOpenDrawer] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		if (context.userData) {
			setUserDetails((prev) => ({
				...prev,
				name: context.userData.name || "",
				email: context.userData.email || "",
				mobile: context.userData.mobile || "",
			}));
		}
	}, [context.userData]);

	const onChangeInput = (e) => {
		const { name, value } = e.target;
		setUserDetails((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const togglePasswordVisibility = (field) => {
		setShowPassword((prev) => ({
			...prev,
			[field]: !prev[field],
		}));
	};

	const toggleEdit = (field) => {
		setEditMode((prev) => ({
			...prev,
			[field]: !prev[field],
		}));
	};

	const handleDefaultAddressSelection = async (addressId) => {
		const res = await postData("/api/address/set-default", { addressId });

		if (!res.error) {
			context.openAlertBox("success", "Address selected");
			context.loadUserDetails(); // Reload user to update address list
		}
	};

	const handleDeleteAddress = async (id) => {
		const res = await deleteDataReview(`/api/address/delete/${id}`);

		if (res?.error) {
			return context.openAlertBox("error", res.message);
		}

		context.openAlertBox("success", res.message);

		// Refresh address list after delete
		context.loadUserDetails();
	};

	const handleSave = async (e) => {
		e.preventDefault();
		setMessage("");

		const { name, email, mobile, oldPassword, newPassword, confermPassword } =
			userDetails;

		const emailChanged = email !== context.userData.email;
		const passwordChangeOnly =
			!emailChanged && (oldPassword || newPassword || confermPassword);

		// Email change case → require old, new, confirm
		if (emailChanged) {
			if (!oldPassword || !newPassword || !confermPassword) {
				setChangePass(true);
				setMessage(
					"❌ Old, new, and confirm password are required when changing email."
				);
				return;
			}
			if (newPassword !== confermPassword) {
				setMessage("❌ Passwords do not match.");
				return;
			}
		}

		// Password change only → require old, new, confirm
		if (passwordChangeOnly) {
			if (!oldPassword || !newPassword || !confermPassword) {
				setMessage(
					"❌ Old, new, and confirm password are required when changing password."
				);
				return;
			}
			if (newPassword !== confermPassword) {
				setMessage("❌ Passwords do not match.");
				return;
			}
		}

		setLoading(true);

		const formData = {
			name,
			email,
			mobile,
			...(emailChanged || passwordChangeOnly
				? { oldPassword, newPassword, confermPassword }
				: {}),
		};

		const result = await postData(`/api/user/${userId}`, formData);
		setLoading(false);

		if (result?.error) {
			setMessage(`❌ ${result.message}`);
		} else {
			setMessage("✅ Profile updated successfully.");
			const updatedUser = await fetchDataFromApi("/api/user/user-details");
			context.setUserData(updatedUser.user);
			context.loadUserDetails();

			setEditMode({ name: false, email: false, mobile: false });

			if (emailChanged || passwordChangeOnly) {
				setTimeout(() => window.location.reload(), 1500);
			}
		}
	};

	return (
		<section className="py-10 w-full">
			<div className="container flex gap-5">
				<div className="col1 w-[20%]">
					<AccountSideBar />
				</div>

				<div className="col2 w-[50%]">
					<div className="card bg-white p-5 shadow-md rounded-md">
						<div className="flex justify-between ">
							<h2 className="pb-3">My Profile</h2>
							{!isGoogleLogIn && (
								<Button
									className="!text-[#ff5252] !hover:underline cursor-pointer"
									onClick={() => setChangePass(!changePass)}
								>
									Change Password
								</Button>
							)}
						</div>
						<hr />

						<form className="mt-5" onSubmit={handleSave} autoComplete="off">
							<input
								type="text"
								name="fakeUsername"
								autoComplete="username"
								style={{ display: "none" }}
							/>
							<input
								type="password"
								name="fakePassword"
								autoComplete="new-password"
								style={{ display: "none" }}
							/>

							<div className="flex items-center gap-5">
								<div className="w-[50%]">
									<TextField
										label="Name"
										name="name"
										value={userDetails.name}
										onChange={onChangeInput}
										variant="outlined"
										size="small"
										className="w-full"
										InputProps={{
											readOnly: !editMode.name,
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														onClick={() => toggleEdit("name")}
														size="small"
													>
														{editMode.name ? <FaCheck /> : <FaRegEdit />}
													</IconButton>
												</InputAdornment>
											),
										}}
									/>
								</div>
								<div className="w-[50%] relative">
									{" "}
									{/* make parent relative */}
									<PhoneInput
										defaultCountry="in"
										value={userDetails.mobile}
										onChange={(value) =>
											onChangeInput({ target: { name: "mobile", value } })
										}
										disabled={!editMode.mobile} // editable only when true
										inputClassName="w-full !h-10 !text-sm pr-10" // add padding so text doesn't clash with icon
									/>
									{/* Edit/Check button inside container */}
									<IconButton
										onClick={() => toggleEdit("mobile")}
										className="!absolute right-1 top-1 z-50"
										size="small"
									>
										{editMode.mobile ? <FaCheck /> : <FaRegEdit />}
									</IconButton>
								</div>
							</div>

							<div className="mt-4">
								<TextField
									label="Email"
									name="email"
									type="email"
									value={userDetails.email}
									onChange={onChangeInput}
									variant="outlined"
									size="small"
									className="w-full"
									InputProps={{
										readOnly: !editMode.email,
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													onClick={() => toggleEdit("email")}
													size="small"
												>
													{editMode.email ? <FaCheck /> : <FaRegEdit />}
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
							</div>
							{!selectedAddress ? (
								<div className="my-4 p-4 border rounded-lg bg-white shadow-sm text-center">
									<p className="text-gray-700 font-medium">
										No address selected
									</p>

									{address?.length > 0 ? (
										// If user already has addresses → allow them to select
										<button
											type="button"
											className="text-[#ff5151] underline text-sm mt-2"
											onClick={() => setOpenDrawer(true)}
										>
											Select Address
										</button>
									) : (
										// If user has no addresses → show Add Address
										<button
											className="text-[#ff5151] underline text-sm mt-2"
											onClick={() => {
												navigate("/address");
											}}
										>
											Add Address
										</button>
									)}
								</div>
							) : (
								/* SELECTED ADDRESS CARD */
								<div className="my-4 p-4 border rounded-lg bg-white shadow-md">
									{/* Top Section */}
									<div className="flex justify-between items-start">
										<div>
											<p className="text-[15px] font-semibold text-gray-900">
												{selectedAddress.addressType} Address
											</p>

											<p className="text-gray-700 mt-1 leading-5">
												{selectedAddress.address_line}, {selectedAddress.city},{" "}
												{selectedAddress.state} - {selectedAddress.pincode}
											</p>

											{/* Landmark */}
											{selectedAddress.landmark && (
												<p className="text-gray-600 text-sm mt-1">
													Landmark: {selectedAddress.landmark}
												</p>
											)}

											{/* Mobile */}
											<p className="text-gray-800 font-medium text-sm mt-1">
												Phone: {selectedAddress.mobile}
											</p>
										</div>

										{/* DEFAULT BADGE */}
										{selectedAddress.status === true && (
											<span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">
												DEFAULT
											</span>
										)}
									</div>

									{/* Divider */}
									<div className="border-t my-3"></div>

									{/* Actions */}
									<div className="flex justify-end gap-4">
										<button
											type="button"
											onClick={() => handleDeleteAddress(selectedAddress._id)}
											className="text-red-500 hover:text-red-700 font-semibold text-sm"
										>
											DELETE
										</button>

										<button
											type="button"
											onClick={() => setOpenDrawer(true)}
											className="text-[#ff5151] font-semibold text-sm"
										>
											CHANGE
										</button>
									</div>
								</div>
							)}

							{/* DRAWER FOR SELECTING ADDRESS */}
							<Drawer
								anchor="right"
								open={openDrawer}
								onClose={() => setOpenDrawer(false)}
							>
								<div className="w-[350px] p-4">
									<h3 className="text-lg font-semibold mb-4">Select Address</h3>

									<div className="space-y-3">
										{otherAddresses?.length > 0 ? (
											otherAddresses.map((addr) => (
												<AddressCard
													key={addr._id}
													address={addr}
													onSelect={(id) => {
														handleDefaultAddressSelection(id);
														setOpenDrawer(false);
													}}
													onDelete={handleDeleteAddress}
												/>
											))
										) : (
											/* ⭐ Fallback If No Other Addresses */
											<div className="text-center py-6 text-gray-600">
												<p className="text-sm font-medium">
													No other addresses available
												</p>

												<button
													type="button"
													onClick={() => {
														setOpenDrawer(false);
														navigate("/address"); // or open add address form
													}}
													className="mt-3 text-[#ff5151] underline text-sm font-medium"
												>
													Add New Address
												</button>
											</div>
										)}
									</div>
								</div>
							</Drawer>

							{changePass && (
								<div>
									<h4 className="text-[13px] mt-5">Change Password</h4>

									{!isGoogleLogIn && (
										<div className="flex items-center gap-5 mt-4">
											<div className="w-[33%]">
												<TextField
													label="Old Password"
													type={showPassword.old ? "text" : "password"}
													name="oldPassword"
													value={userDetails.oldPassword}
													onChange={onChangeInput}
													variant="outlined"
													autoComplete="off"
													size="small"
													className="w-full"
													InputProps={{
														endAdornment: (
															<InputAdornment position="end">
																<IconButton
																	onClick={() =>
																		togglePasswordVisibility("old")
																	}
																	edge="end"
																>
																	{showPassword.old ? (
																		<FaEyeSlash />
																	) : (
																		<FaEye />
																	)}
																</IconButton>
															</InputAdornment>
														),
													}}
												/>
											</div>
											<div className="w-[33%]">
												<TextField
													label="New Password"
													type={showPassword.new ? "text" : "password"}
													name="newPassword"
													value={userDetails.newPassword}
													onChange={onChangeInput}
													variant="outlined"
													autoComplete="off"
													size="small"
													className="w-full"
													InputProps={{
														endAdornment: (
															<InputAdornment position="end">
																<IconButton
																	onClick={() =>
																		togglePasswordVisibility("new")
																	}
																	edge="end"
																>
																	{showPassword.new ? (
																		<FaEyeSlash />
																	) : (
																		<FaEye />
																	)}
																</IconButton>
															</InputAdornment>
														),
													}}
												/>
											</div>
											<div className="w-[33%]">
												<TextField
													label="Confirm Password"
													type={showPassword.confirm ? "text" : "password"}
													name="confermPassword"
													value={userDetails.confermPassword}
													onChange={onChangeInput}
													variant="outlined"
													autoComplete="off"
													size="small"
													className="w-full"
													InputProps={{
														endAdornment: (
															<InputAdornment position="end">
																<IconButton
																	onClick={() =>
																		togglePasswordVisibility("confirm")
																	}
																	edge="end"
																>
																	{showPassword.confirm ? (
																		<FaEyeSlash />
																	) : (
																		<FaEye />
																	)}
																</IconButton>
															</InputAdornment>
														),
													}}
												/>
											</div>
										</div>
									)}
								</div>
							)}

							<br />
							{message && (
								<p
									className="text-sm mb-2"
									style={{ color: message.includes("✅") ? "green" : "red" }}
								>
									{message}
								</p>
							)}

							<div className="flex items-center gap-4">
								<Button
									type="submit"
									className="btn-org btn-lg w-[100px]"
									disabled={loading}
								>
									{loading ? (
										<CircularProgress size={24} color="inherit" />
									) : (
										"Save"
									)}
								</Button>

								<Button
									type="button"
									onClick={() => window.location.reload()}
									className="btn-org btn-lg btn-border w-[100px]"
								>
									Cancel
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}

export default MyAccount;
