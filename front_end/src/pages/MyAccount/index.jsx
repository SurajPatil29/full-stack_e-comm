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
import { FiMenu } from "react-icons/fi";

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

	const [sidebarOpen, setSidebarOpen] = useState(false);

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
					"❌ Old, new, and confirm password are required when changing email.",
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
					"❌ Old, new, and confirm password are required when changing password.",
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

	// for closing Accoubntsidebar
	useEffect(() => {
		if (sidebarOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => (document.body.style.overflow = "");
	}, [sidebarOpen]);

	return (
		<section className="py-10 w-full">
			<div className="container max-w-7xl mx-auto flex gap-5 px-4">
				<div className="col1 hidden lg:block w-[22%]">
					<AccountSideBar />
				</div>

				<div className="col2 w-full">
					<div className="card bg-white p-5 shadow-md rounded-md">
						<div className="flex justify-between ">
							<h2 className="pb-3">My Profile</h2>

							<Button
								onClick={() => setSidebarOpen(true)}
								className="lg:hidden !min-w-[40px] !p-0 !text-[rgba(0,0,0,0.8)]"
							>
								<FiMenu className="text-[22px]" />
							</Button>
						</div>
						<hr />
						<div className="flex items-center justify-end">
							{!isGoogleLogIn && (
								<Button
									className="!text-[#ff5252] !hover:underline cursor-pointer"
									onClick={() => setChangePass(!changePass)}
								>
									Change Password
								</Button>
							)}
						</div>

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

							<div className="flex flex-col md:flex-row gap-5">
								<div className="w-full md:w-[50%]">
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
								<div className="w-full md:w-[50%] relative">
									{" "}
									{/* make parent relative */}
									<PhoneInput
										defaultCountry="in"
										value={userDetails.mobile}
										onChange={(value) =>
											onChangeInput({ target: { name: "mobile", value } })
										}
										disabled={!editMode.mobile} // editable only when true
										inputClassName="w-full !bg-white !h-10 !text-sm pr-10" // add padding so text doesn't clash with icon
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
								<div className="my-4 p-4 sm:p-5	border	rounded-lg	bg-white shadow-sm text-center max-w-full sm:max-w-[420px]	mx-auto">
									<p className="text-gray-700 font-medium text-sm sm:text-base">
										No address selected
									</p>

									{address?.length > 0 ? (
										// If user already has addresses → allow them to select
										<button
											type="button"
											className="	mt-3 text-[#ff5151] underline text-sm sm:text-base font-medium	active:opacity-70"
											onClick={() => setOpenDrawer(true)}
										>
											Select Address
										</button>
									) : (
										// If user has no addresses → show Add Address
										<button
											className="mt-3 text-[#ff5151] underline text-sm sm:text-base font-medium	active:opacity-70"
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
								<div
									className="
		my-4
		p-4 sm:p-5
		border
		rounded-lg
		bg-white
		shadow-md
		max-w-full
	"
								>
									{/* Top Section */}
									<div className="flex flex-col sm:flex-row justify-between items-start gap-3">
										<div className="flex-1">
											<p className="text-sm sm:text-[15px] font-semibold text-gray-900">
												{selectedAddress.addressType} Address
											</p>

											{/* Name */}
											<p className="text-gray-900 font-medium mt-1 text-sm sm:text-base">
												{selectedAddress?.name}
											</p>

											{/* Address */}
											<p className="text-gray-700 mt-1 leading-5 text-sm sm:text-base break-words">
												{selectedAddress.address_line}, {selectedAddress.city},{" "}
												{selectedAddress.state} - {selectedAddress.pincode}
											</p>

											{/* Landmark */}
											{selectedAddress.landmark && (
												<p className="text-gray-600 text-xs sm:text-sm mt-1 break-words">
													Landmark: {selectedAddress.landmark}
												</p>
											)}

											{/* Mobile */}
											<p className="text-gray-800 font-medium text-xs sm:text-sm mt-1">
												Phone: {selectedAddress.mobile}
											</p>
										</div>

										{/* DEFAULT BADGE */}
										{selectedAddress.status === true && (
											<span
												className="
					self-start
					text-[10px] sm:text-xs
					bg-blue-100
					text-blue-700
					px-2 py-1
					rounded
					font-semibold
					whitespace-nowrap
				"
											>
												DEFAULT
											</span>
										)}
									</div>

									{/* Divider */}
									<div className="border-t my-3"></div>

									{/* Actions */}
									<div className="flex justify-end gap-6">
										<button
											type="button"
											onClick={() => handleDeleteAddress(selectedAddress._id)}
											className="
				text-red-500
				font-semibold
				text-xs sm:text-sm
				hover:text-red-700
				active:opacity-70
			"
										>
											DELETE
										</button>

										<button
											type="button"
											onClick={() => setOpenDrawer(true)}
											className="
				text-[#ff5151]
				font-semibold
				text-xs sm:text-sm
				hover:underline
				active:opacity-70
			"
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
								<div className="w-screen sm:w-[380px] md:w-[420px] lg:w-[450px]	p-4 sm:p-5 flex flex-col">
									<h3 className="text-base sm:text-lg font-semibold mb-4">
										Select Address
									</h3>

									<div className="space-y-3 overflow-y-auto flex-1">
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
											<div className="text-center py-10 text-gray-600">
												<p className="text-sm sm:text-base font-medium">
													No other addresses available
												</p>

												<button
													type="button"
													onClick={() => {
														setOpenDrawer(false);
														navigate("/address"); // or open add address form
													}}
													className="mt-3 text-[#ff5151] underline text-sm sm:text-base font-medium"
												>
													Add New Address
												</button>
											</div>
										)}
									</div>
								</div>
							</Drawer>

							{changePass && (
								<div className="mt-6">
									<h4 className="text-sm font-semibold mb-4">
										Change Password
									</h4>

									{!isGoogleLogIn && (
										<div
											className="
					grid
					grid-cols-1
					sm:grid-cols-2
					lg:grid-cols-3
					gap-4
				"
										>
											{/* Old Password */}
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
																onClick={() => togglePasswordVisibility("old")}
																edge="end"
															>
																{showPassword.old ? <FaEyeSlash /> : <FaEye />}
															</IconButton>
														</InputAdornment>
													),
												}}
											/>

											{/* New Password */}
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
																onClick={() => togglePasswordVisibility("new")}
																edge="end"
															>
																{showPassword.new ? <FaEyeSlash /> : <FaEye />}
															</IconButton>
														</InputAdornment>
													),
												}}
											/>

											{/* Confirm Password */}
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
									)}
								</div>
							)}

							<br />
							{message && (
								<p
									className="text-sm mt-4 mb-2"
									style={{ color: message.includes("✅") ? "green" : "red" }}
								>
									{message}
								</p>
							)}

							<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
								<Button
									type="submit"
									className="btn-org btn-lg w-full sm:w-[120px]"
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
									className="btn-org btn-lg btn-border w-full sm:w-[120px]"
								>
									Cancel
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>

			{/* overlay accountsidebar */}
			{sidebarOpen && (
				<div className="fixed inset-0 z-50 lg:hidden">
					{/* backdrop */}
					<div
						className="absolute inset-0 bg-black/40"
						onClick={() => setSidebarOpen(false)}
					/>

					{/* drawer */}
					<div className="absolute left-0 top-0 h-full w-[80%] max-w-[320px] bg-white shadow-lg animate-slide-in">
						<div className="flex justify-between items-center p-4 border-b">
							<h3 className="font-semibold">My Account</h3>
							<button onClick={() => setSidebarOpen(false)}>✕</button>
						</div>

						<AccountSideBar />
					</div>
				</div>
			)}
			{/* overlay accountsidebar */}
		</section>
	);
}

export default MyAccount;
