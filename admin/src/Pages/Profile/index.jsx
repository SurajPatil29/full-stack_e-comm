import React, { useContext, useEffect, useState } from "react";
import {
	Button,
	CircularProgress,
	TextField,
	InputAdornment,
	IconButton,
} from "@mui/material";
import {
	deleteImagefromCloudi,
	fetchDataFromApi,
	postData,
	postFormData,
} from "../../utils/api";
import { IoMdAdd, IoMdCloudUpload } from "react-icons/io";
import {
	FaRegUser,
	FaEye,
	FaEyeSlash,
	FaCheck,
	FaRegEdit,
} from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import "react-international-phone/style.css";
import { PhoneInput } from "react-international-phone";
import MyContext from "../../context/MyContext";
import { RiExchange2Line } from "react-icons/ri";
import Address from "../../Components/Address";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
// import Checkbox from "@mui/material";

// const lable = { InputProps: { "aria-label": "Checkbox demo" } };

function Profile() {
	const [userDetails, setUserDetails] = useState({
		name: "",
		email: "",
		mobile: "",
		oldPassword: "",
		newPassword: "",
		confirmPassword: "",
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

	const context = useContext(MyContext);
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState("");
	const userId = localStorage.getItem("userId");
	const [changePass, setChangePass] = useState(false);
	const [addAddress, setAddAddress] = useState(false);
	const [showMore, setShowMore] = useState(false);
	const address = context?.userData?.address_details;

	// Load user details
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

	// Password validation helper
	const validatePasswords = (oldPassword, newPassword, confirmPassword) => {
		if (!oldPassword || !newPassword || !confirmPassword) {
			return "❌ Old, new, and confirm password are required.";
		}
		if (newPassword !== confirmPassword) {
			return "❌ Passwords do not match.";
		}
		return null;
	};

	const handleSave = async (e) => {
		e.preventDefault();
		setMessage("");

		const { name, email, mobile, oldPassword, newPassword, confirmPassword } =
			userDetails;

		const emailChanged = email !== context.userData.email;
		const passwordChangeOnly =
			!emailChanged && (oldPassword || newPassword || confirmPassword);

		// Validate cases
		if (emailChanged || passwordChangeOnly) {
			const validationError = validatePasswords(
				oldPassword,
				newPassword,
				confirmPassword
			);
			if (validationError) {
				setMessage(validationError);
				setChangePass(true);
				return;
			}
		}

		setIsLoading(true);

		const formData = {
			name,
			email,
			mobile,
			...(emailChanged || passwordChangeOnly
				? { oldPassword, newPassword, confirmPassword }
				: {}),
		};

		const result = await postData(`/api/user/${userId}`, formData);
		setIsLoading(false);

		if (result?.error) {
			setMessage(`❌ ${result.message}`);
		} else {
			setMessage("✅ Profile updated successfully.");
			const updatedUser = await fetchDataFromApi("/api/user/user-details");
			context.setUserData(updatedUser.user);

			setEditMode({ name: false, email: false, mobile: false });

			// if sensitive change, log out or refresh
			if (emailChanged || passwordChangeOnly) {
				setTimeout(() => {
					localStorage.clear();
					window.location.href = "/login"; // force re-login
				}, 1500);
			}
		}
	};

	const handleAvatarChange = async (e) => {
		setIsLoading(true);
		const file = e.target.files?.[0];

		if (!file) {
			setIsLoading(false);
			context.openAlertBox("error", "No file selected");
			return;
		}

		const formData = new FormData();
		formData.append("avatar", file);

		const response = await postFormData("/api/user/user-avatar", formData);

		setIsLoading(false);
		if (response.error) {
			context.openAlertBox("error", `Upload failed: ${response.message}`);
		} else {
			context.openAlertBox("success", response.message);
			const updatedUser = await fetchDataFromApi("/api/user/user-details");
			context.setUserData(updatedUser.user);
		}
	};

	const handleDeleteAvatar = async () => {
		if (!context?.userData?.avatar) {
			context.openAlertBox("error", "You don't have an avatar");
			return;
		}

		setIsLoading(true);
		const response = await deleteImagefromCloudi(
			"/api/user/deleteImage",
			context?.userData?.avatar
		);
		setIsLoading(false);

		if (response.error) {
			context.openAlertBox(
				"error",
				`Delete avatar failed: ${response.message || "Unknown error"}`
			);
		} else {
			context.openAlertBox("success", response.message);
			const updatedUser = await fetchDataFromApi("/api/user/user-details");
			context.setUserData(updatedUser.user);
		}
	};

	const getFieldClass = (field) =>
		`p-2 rounded-md ${
			editMode[field] ? "bg-green-50" : "bg-gray-100"
		} transition-colors`;

	return (
		<>
			<div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white px-5 pb-5 w-[80%]">
				<div className="flex justify-between items-center">
					<h2 className="pb-3">My Profile</h2>
					<div className="gap-3">
						<Button
							className="!text-[#ff5252] !text-[13px] !hover:underline cursor-pointer capitalize gap-1"
							onClick={() => setChangePass(!changePass)}
						>
							<RiExchange2Line />
							Change Password
						</Button>

						<Button
							className="!text-[#ff5252] !text-[13px] !hover:underline cursor-pointer capitalize gap-1"
							onClick={() => setAddAddress(!addAddress)}
						>
							<IoMdAdd />
							Add Address
						</Button>
					</div>
				</div>

				{/* Avatar */}
				<div className="relative w-fit">
					<div className="w-[110px] rounded-full overflow-hidden mb-4 aspect-square relative group flex items-center justify-center bg-gray-200">
						{!context?.userData?.avatar ? (
							<FaRegUser className="text-[16px] text-[rgba(0,0,0,0.7)]" />
						) : (
							<img
								src={context?.userData?.avatar}
								alt="userProfile"
								className="w-full h-full object-contain rounded-full"
							/>
						)}

						{isLoading ? (
							<div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.7)] z-50 rounded-full">
								<CircularProgress color="inherit" />
							</div>
						) : (
							<div className="overlay w-full h-full absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100">
								<IoMdCloudUpload className="text-white text-[25px]" />
								<input
									type="file"
									accept="image/*"
									className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
									onChange={handleAvatarChange}
								/>
							</div>
						)}
					</div>

					{context?.userData?.avatar && !isLoading && (
						<div
							onClick={handleDeleteAvatar}
							className="absolute bottom-1 right-1 z-50 bg-white rounded-full p-[6px] shadow-md cursor-pointer hover:bg-red-100 transition"
							title="Delete Avatar"
						>
							<MdOutlineDelete className="text-red-500 text-[18px]" />
						</div>
					)}
				</div>

				{/* Form */}
				<form className="mt-5" onSubmit={handleSave} autoComplete="off">
					{/* Stop browser autofill */}
					<input
						type="text"
						name="fakeUsername"
						autoComplete="username"
						hidden
					/>
					<input
						type="password"
						name="fakePassword"
						autoComplete="new-password"
						hidden
					/>

					<div className="flex items-center gap-5">
						{/* Name */}
						<div className={`w-[50%] ${getFieldClass("name")}`}>
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

						{/* Mobile */}
						<div className={`w-[33%] relative ${getFieldClass("mobile")}`}>
							<PhoneInput
								defaultCountry="in"
								value={userDetails.mobile}
								onChange={(value) =>
									onChangeInput({ target: { name: "mobile", value } })
								}
								disabled={!editMode.mobile}
								inputClassName="w-full !h-10 !text-sm pr-10"
							/>
							<IconButton
								onClick={() => toggleEdit("mobile")}
								className="!absolute right-1 top-1 z-50"
								size="small"
							>
								{editMode.mobile ? <FaCheck /> : <FaRegEdit />}
							</IconButton>
						</div>
					</div>

					{/* Email */}
					<div className={`mt-4 ${getFieldClass("email")}`}>
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

					<div className="mt-6 border rounded-lg bg-gray-50 p-4 shadow-sm">
						<div className="flex justify-between items-center">
							<h2 className="text-base font-medium text-gray-700">
								Address Details
							</h2>
							<button
								type="button"
								onClick={() => setShowMore(!showMore)}
								className="text-gray-500 hover:text-gray-700 transition"
							>
								{showMore ? <FaChevronUp /> : <FaChevronDown />}
							</button>
						</div>

						{/* Always visible */}
						<p className="text-sm text-gray-700 mt-2">
							<strong>Address:</strong> {address?.address_line}
						</p>

						{/* Toggle section */}
						{showMore && (
							<div className="mt-2 space-y-1 text-sm">
								<p className="text-gray-700">
									<strong>City:</strong> {address?.city}
								</p>
								<p className="text-gray-700">
									<strong>State:</strong> {address?.state}
								</p>
								<p className="text-gray-700">
									<strong>Pincode:</strong> {address?.pincode}
								</p>
								<p className="text-gray-700">
									<strong>Country:</strong> {address?.country}
								</p>
								<p className="text-gray-700">
									<strong>Mobile:</strong> {address?.mobile}
								</p>
							</div>
						)}
					</div>

					{/* Change Password */}
					{changePass && (
						<div>
							<h4 className="text-[13px] mt-5">Change Password</h4>
							<div className="flex items-center gap-5 mt-4">
								{/* Old */}
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
														onClick={() => togglePasswordVisibility("old")}
														edge="end"
													>
														{showPassword.old ? <FaEyeSlash /> : <FaEye />}
													</IconButton>
												</InputAdornment>
											),
										}}
									/>
								</div>

								{/* New */}
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
														onClick={() => togglePasswordVisibility("new")}
														edge="end"
													>
														{showPassword.new ? <FaEyeSlash /> : <FaEye />}
													</IconButton>
												</InputAdornment>
											),
										}}
									/>
								</div>

								{/* Confirm */}
								<div className="w-[33%]">
									<TextField
										label="Confirm Password"
										type={showPassword.confirm ? "text" : "password"}
										name="confirmPassword"
										value={userDetails.confirmPassword}
										onChange={onChangeInput}
										variant="outlined"
										autoComplete="off"
										size="small"
										className="w-full"
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														onClick={() => togglePasswordVisibility("confirm")}
														edge="end"
													>
														{showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
													</IconButton>
												</InputAdornment>
											),
										}}
									/>
								</div>
							</div>
						</div>
					)}

					{/* Message */}
					{message && (
						<p
							className="text-sm mb-2"
							style={{ color: message.includes("✅") ? "green" : "red" }}
						>
							{message}
						</p>
					)}

					{/* Actions */}
					<div className="flex items-center gap-4 mt-3">
						<Button
							type="submit"
							className="btn-blue btn-lg w-[100px]"
							disabled={isLoading}
						>
							{isLoading ? (
								<CircularProgress size={24} color="inherit" />
							) : (
								"Save"
							)}
						</Button>

						<Button
							type="button"
							onClick={() => window.location.reload()}
							className="btn-blue btn-lg btn-border w-[100px]"
						>
							Cancel
						</Button>
					</div>
				</form>
			</div>

			<div
				className={`transition-all duration-300 ${
					addAddress
						? "opacity-100 translate-y-0"
						: "opacity-0 -translate-y-5 hidden"
				}`}
			>
				<Address />
			</div>
		</>
	);
}

export default Profile;
