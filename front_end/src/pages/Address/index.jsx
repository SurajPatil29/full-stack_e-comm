import AccountSideBar from "../../componants/AccountSideBar";
import {
	TextField,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	CircularProgress,
	Button,
	FormControlLabel,
	RadioGroup,
	Radio,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { PhoneInput } from "react-international-phone";
import MyContext from "../../context/MyContext";
import { postData } from "../../utils/api";

function Address({ closeDrawer }) {
	const context = useContext(MyContext);
	const [addressDetails, setAddressDetails] = useState({
		name: "",
		address_line: "",
		city: "",
		state: "",
		pincode: "",
		country: "",
		mobile: "",
		status: false,
		landmark: "",
		addressType: "Home",
		userId: localStorage.getItem("userId"),
	});

	const [isLoading, setIsLoading] = useState(false);

	const onChangeInput = (e) => {
		const { name, value } = e.target;
		setAddressDetails((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		setIsLoading(true);

		if (!addressDetails.name) return stop("Please enter Name");
		if (!addressDetails.address_line) return stop("Please enter Address Line");
		if (!addressDetails.city) return stop("Please enter City");
		if (!addressDetails.state) return stop("Please enter State");
		if (!addressDetails.pincode) return stop("Please enter Pincode");
		if (!addressDetails.country) return stop("Please enter Country");
		if (!addressDetails.mobile) return stop("Please enter Mobile Number");

		function stop(msg) {
			setIsLoading(false);
			context.openAlertBox("error", msg);
			return;
		}

		postData("/api/address/add", addressDetails).then((res) => {
			setIsLoading(false);
			if (res?.error !== true) {
				context.openAlertBox("success", res?.message);
				context.loadUserDetails();
				closeDrawer();
			} else {
				context.openAlertBox("error", res?.message);
			}
		});
	};

	return (
		<form className="space-y-6 mt-3" onSubmit={handleSubmit}>
			{/* Name */}
			<div className="flex flex-col md:flex-row items-center gap-5">
				<TextField
					label="Full Name"
					name="name"
					value={addressDetails.name}
					onChange={onChangeInput}
					size="small"
					className="w-full md:w-[50%] bg-white"
					sx={{
						"& .MuiOutlinedInput-root": {
							"&.Mui-focused fieldset": { borderColor: "#ff5151" },
						},
						"& label.Mui-focused": { color: "#ff5151" },
					}}
				/>
			</div>

			{/* Address + City */}
			<div className="flex flex-col md:flex-row items-center gap-5">
				<TextField
					label="Address"
					name="address_line"
					value={addressDetails.address_line}
					onChange={onChangeInput}
					size="small"
					className="w-full md:w-[50%] bg-white"
					sx={{
						"& .MuiOutlinedInput-root": {
							"&.Mui-focused fieldset": { borderColor: "#ff5151" },
						},
						"& label.Mui-focused": { color: "#ff5151" },
					}}
				/>

				<TextField
					label="City"
					name="city"
					value={addressDetails.city}
					onChange={onChangeInput}
					size="small"
					className="w-full md:w-[50%] bg-white"
					sx={{
						"& .MuiOutlinedInput-root": {
							"&.Mui-focused fieldset": { borderColor: "#ff5151" },
						},
						"& label.Mui-focused": { color: "#ff5151" },
					}}
				/>
			</div>

			{/* Pincode, State, Country */}
			<div className="flex flex-col md:flex-row items-center gap-5">
				<TextField
					label="Pincode"
					name="pincode"
					value={addressDetails.pincode}
					onChange={onChangeInput}
					size="small"
					className="w-full md:w-[33%] bg-white"
				/>

				<TextField
					label="State"
					name="state"
					value={addressDetails.state}
					onChange={onChangeInput}
					size="small"
					className="w-full md:w-[33%] bg-white"
				/>

				<TextField
					label="Country"
					name="country"
					value={addressDetails.country}
					onChange={onChangeInput}
					size="small"
					className="w-full md:w-[33%] bg-white"
				/>
			</div>

			{/* Landmark + Phone */}
			<div className="flex flex-col md:flex-row items-center gap-5">
				<TextField
					label="Landmark"
					name="landmark"
					value={addressDetails.landmark}
					onChange={onChangeInput}
					size="small"
					className="w-full md:w-[50%] bg-white"
				/>

				<div className="w-full md:w-[50%]">
					<PhoneInput
						defaultCountry="in"
						value={addressDetails.mobile}
						onChange={(value) =>
							setAddressDetails((prev) => ({ ...prev, mobile: value }))
						}
						inputClassName="w-full !h-10 !text-sm"
					/>
				</div>
			</div>

			{/* Status + Address Type */}
			<div className="flex flex-col md:flex-row items-center gap-5">
				<FormControl size="small" className="w-full md:w-[33%]">
					<InputLabel>Status</InputLabel>
					<Select
						label="Status"
						name="status"
						value={addressDetails.status.toString()}
						onChange={onChangeInput}
					>
						<MenuItem value="true">True</MenuItem>
						<MenuItem value="false">False</MenuItem>
					</Select>
				</FormControl>

				<FormControl className="w-full md:w-[50%]">
					<p className="text-sm mb-1 font-medium text-gray-700">Address Type</p>

					<RadioGroup
						row
						name="addressType"
						value={addressDetails.addressType}
						onChange={onChangeInput}
					>
						<FormControlLabel
							value="Home"
							control={
								<Radio
									sx={{
										color: "#ff5151",
										"&.Mui-checked": { color: "#ff5151" },
									}}
								/>
							}
							label="Home"
						/>

						<FormControlLabel
							value="Office"
							control={
								<Radio
									sx={{
										color: "#ff5151",
										"&.Mui-checked": { color: "#ff5151" },
									}}
								/>
							}
							label="Office"
						/>
					</RadioGroup>
				</FormControl>
			</div>

			{/* Buttons */}
			<div className="flex items-center gap-4 mt-3">
				<Button
					type="submit"
					className="btn-org btn-lg w-[100px]"
					disabled={isLoading}
				>
					{isLoading ? <CircularProgress size={24} color="inherit" /> : "Save"}
				</Button>

				<Button
					type="button"
					className="btn-org btn-lg btn-border w-[100px]"
					onClick={() => closeDrawer && closeDrawer()} // ⭐ Close Drawer
				>
					Cancel
				</Button>
			</div>
		</form>
	);
}

export default Address;
