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
	RadioGroup,
	FormControlLabel,
	Radio,
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
		landmark: "",
		addressType: "Home",
		userId: localStorage.getItem("userId"),
	});

	const [isLoading, setIsLoading] = useState(false);
	const context = useContext(MyContext);

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

		// Basic validation
		const requiredFields = [
			"address_line",
			"city",
			"state",
			"pincode",
			"country",
		];

		for (let field of requiredFields) {
			if (addressDetails[field].trim() === "") {
				setIsLoading(false);
				return context.openAlertBox("error", `Please enter ${field}`);
			}
		}
		// Validate status separately (must be true or false, but not empty)
		if (addressDetails.status === "") {
			setIsLoading(false);
			return context.openAlertBox("error", "Please select status");
		}
		postData("/api/address/add", addressDetails).then((res) => {
			// console.log(res);

			if (res?.error !== true) {
				setIsLoading(false);
				context.openAlertBox("success", res?.message);
				context.loadUserDetails();
			} else {
				context.openAlertBox("error", res?.message);
				setIsLoading(false);
			}
		});
	};
	return (
		<div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white px-5 pb-5 w-[80%]">
			<h3 className="mb-4">Address Details</h3>

			<form className="space-y-6" onSubmit={handleSubmit}>
				{/* Row 1 */}
				<div className="flex items-center gap-5">
					<TextField
						label="Address"
						name="address_line"
						value={addressDetails.address_line}
						onChange={onChangeInput}
						variant="outlined"
						size="small"
						className="w-[50%]"
					/>

					<TextField
						label="City"
						name="city"
						value={addressDetails.city}
						onChange={onChangeInput}
						variant="outlined"
						size="small"
						className="w-[50%]"
					/>
				</div>

				{/* Row 2 */}
				<div className="flex items-center gap-5">
					<TextField
						label="Pincode"
						name="pincode"
						value={addressDetails.pincode}
						onChange={onChangeInput}
						variant="outlined"
						size="small"
						className="w-[33%]"
					/>

					<TextField
						label="State"
						name="state"
						value={addressDetails.state}
						onChange={onChangeInput}
						variant="outlined"
						size="small"
						className="w-[33%]"
					/>

					<TextField
						label="Country"
						name="country"
						value={addressDetails.country}
						onChange={onChangeInput}
						variant="outlined"
						size="small"
						className="w-[33%]"
					/>
				</div>

				{/* ⭐ Row 3 — Landmark + Address Type */}
				<div className="flex items-center gap-5">
					<TextField
						label="Landmark"
						name="landmark"
						value={addressDetails.landmark}
						onChange={onChangeInput}
						variant="outlined"
						size="small"
						className="w-[50%]"
					/>

					<div className="w-[50%] flex justify-center">
						<FormControl>
							<p className="text-sm mb-1 font-medium text-gray-700 text-center">
								Address Type
							</p>

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
				</div>

				{/* Row 4 — Mobile + Status */}
				<div className="flex items-center gap-5">
					<div className="w-[50%]">
						<PhoneInput
							defaultCountry="in"
							value={addressDetails.mobile}
							onChange={(value) =>
								setAddressDetails((prev) => ({
									...prev,
									mobile: value,
								}))
							}
							inputClassName="w-full !h-10 !text-sm"
						/>
					</div>

					{/* ⭐ Status */}
					<div className="w-[50%]">
						<FormControl size="small" className="w-full">
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
					</div>
				</div>

				{/* Buttons */}
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
