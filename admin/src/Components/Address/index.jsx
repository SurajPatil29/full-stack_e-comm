import {
	IconButton,
	InputAdornment,
	TextField,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	CircularProgress,
	Button,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { FaCheck, FaRegEdit } from "react-icons/fa";
import { PhoneInput } from "react-international-phone";
import MyContext from "../../context/MyContext";
import { postData } from "../../utils/api";

function Address() {
	const [addressDetails, setAddressDetails] = useState({
		address_line: "",
		city: "",
		state: "",
		pincode: "",
		country: "",
		mobile: "",
		status: false,
		userId: localStorage.getItem("userId"),
	});

	const [editMode, setEditMode] = useState({
		address_line: false,
		city: false,
		state: false,
		pincode: false,
		country: false,
		mobile: false,
		status: false,
	});

	const [isLoading, setIsLoading] = useState(false);
	const context = useContext(MyContext);

	useEffect(() => {
		if (context.userData?.address_details) {
			setAddressDetails((prev) => ({
				...prev,
				address_line: context.userData?.address_details.address_line || "",
				city: context.userData?.address_details.city || "",
				state: context.userData?.address_details.state || "",
				pincode: context.userData?.address_details.pincode || "",
				country: context.userData?.address_details.country || "",
				mobile: context.userData?.address_details.mobile || "",
				status: context.userData?.address_details.status ?? false,
			}));
		}
	}, [context.userData]);

	const onChangeInput = (e) => {
		const { name, value } = e.target;
		setAddressDetails((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const toggleEdit = (field) => {
		setEditMode((prev) => ({
			...prev,
			[field]: !prev[field],
		}));
	};

	const getFieldClass = (field) =>
		`p-2 rounded-md ${
			editMode[field] ? "bg-green-50" : "bg-gray-100"
		} transition-colors`;

	const handleSubmit = (e) => {
		e.preventDefault();

		setIsLoading(true);

		if (addressDetails.address_line === "") {
			setIsLoading(false);
			return context.openAlertBox("error", "Please enter Address Line");
		}

		if (addressDetails.city === "") {
			setIsLoading(false);
			return context.openAlertBox("error", "Please enter City");
		}

		if (addressDetails.state === "") {
			setIsLoading(false);
			return context.openAlertBox("error", "Please enter State");
		}

		if (addressDetails.pincode === "") {
			setIsLoading(false);
			return context.openAlertBox("error", "Please enter Pincode");
		}

		if (addressDetails.country === "") {
			setIsLoading(false);
			return context.openAlertBox("error", "Please enter Country");
		}

		if (addressDetails.mobile === "") {
			setIsLoading(false);
			return context.openAlertBox("error", "Please enter Mobile Number");
		}

		if (addressDetails.status === "") {
			setIsLoading(false);
			return context.openAlertBox("error", "Please select Status");
		}

		postData("/api/address/add", addressDetails).then((res) => {
			// console.log(res);

			if (res?.error !== true) {
				setIsLoading(false);
				context.openAlertBox("success", res?.message);
			} else {
				context.openAlertBox("error", res?.message);
				setIsLoading(false);
			}
		});
	};
	return (
		<div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white px-5 pb-5 w-[80%]">
			<div className="">
				<h3>Address Details Edit</h3>
			</div>
			<form className="space-y-6" onSubmit={handleSubmit}>
				{/* Row 1 - Address + City */}
				<div className="flex items-center gap-5">
					<div className={`w-[50%] ${getFieldClass("address_line")}`}>
						<TextField
							label="Address"
							name="address_line"
							value={addressDetails.address_line}
							onChange={onChangeInput}
							variant="outlined"
							size="small"
							className="w-full"
							InputProps={{
								readOnly: !editMode.address_line,
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={() => toggleEdit("address_line")}
											size="small"
										>
											{editMode.address_line ? <FaCheck /> : <FaRegEdit />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					</div>

					<div className={`w-[50%] ${getFieldClass("city")}`}>
						<TextField
							label="City"
							name="city"
							value={addressDetails.city}
							onChange={onChangeInput}
							variant="outlined"
							size="small"
							className="w-full"
							InputProps={{
								readOnly: !editMode.city,
								endAdornment: (
									<InputAdornment position="end">
										<IconButton onClick={() => toggleEdit("city")} size="small">
											{editMode.city ? <FaCheck /> : <FaRegEdit />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					</div>
				</div>

				{/* Row 2 - Pincode, State, Country */}
				<div className="flex items-center gap-5">
					<div className={`w-[33%] ${getFieldClass("pincode")}`}>
						<TextField
							label="Pincode"
							name="pincode"
							value={addressDetails.pincode}
							onChange={onChangeInput}
							variant="outlined"
							size="small"
							className="w-full"
							InputProps={{
								readOnly: !editMode.pincode,
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={() => toggleEdit("pincode")}
											size="small"
										>
											{editMode.pincode ? <FaCheck /> : <FaRegEdit />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					</div>

					<div className={`w-[33%] ${getFieldClass("state")}`}>
						<TextField
							label="State"
							name="state"
							value={addressDetails.state}
							onChange={onChangeInput}
							variant="outlined"
							size="small"
							className="w-full"
							InputProps={{
								readOnly: !editMode.state,
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={() => toggleEdit("state")}
											size="small"
										>
											{editMode.state ? <FaCheck /> : <FaRegEdit />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					</div>

					<div className={`w-[33%] ${getFieldClass("country")}`}>
						<TextField
							label="Country"
							name="country"
							value={addressDetails.country}
							onChange={onChangeInput}
							variant="outlined"
							size="small"
							className="w-full"
							InputProps={{
								readOnly: !editMode.country,
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={() => toggleEdit("country")}
											size="small"
										>
											{editMode.country ? <FaCheck /> : <FaRegEdit />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					</div>
				</div>

				{/* Row 3 - Mobile + Status */}
				<div className="flex items-center gap-5">
					{/* Mobile */}
					<div className={`w-[33%] relative ${getFieldClass("mobile")}`}>
						<PhoneInput
							defaultCountry="in"
							value={addressDetails.mobile}
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

					{/* Status Selector */}
					<div className={`w-[33%] flex ${getFieldClass("status")}`}>
						<FormControl size="small" className="w-full">
							<InputLabel>Status</InputLabel>
							<Select
								label="Status"
								name="status"
								value={addressDetails.status}
								onChange={onChangeInput}
								disabled={!editMode.status}
							>
								<MenuItem value={true}>True</MenuItem>
								<MenuItem value={false}>False</MenuItem>
							</Select>
						</FormControl>
						<IconButton
							onClick={() => toggleEdit("status")}
							size="small"
							className="ml-2"
						>
							{editMode.status ? <FaCheck /> : <FaRegEdit />}
						</IconButton>
					</div>
				</div>
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
	);
}

export default Address;
