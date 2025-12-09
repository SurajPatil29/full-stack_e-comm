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
			} else {
				context.openAlertBox("error", res?.message);
			}
		});
	};

	return (
		<section className="py-10 w-full">
			<div className="container flex gap-5">
				<div className="col1 w-[20%]">
					<AccountSideBar />
				</div>

				<div className="col2 w-[70%]">
					<h3>Address Details</h3>

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
								className="w-[50%] bg-white"
								sx={{
									"& .MuiOutlinedInput-root": {
										"&.Mui-focused fieldset": {
											borderColor: "#ff5151",
										},
									},
									"& label.Mui-focused": {
										color: "#ff5151",
									},
								}}
							/>

							<TextField
								label="City"
								name="city"
								value={addressDetails.city}
								onChange={onChangeInput}
								variant="outlined"
								size="small"
								className="w-[50%] bg-white"
								sx={{
									"& .MuiOutlinedInput-root": {
										"&.Mui-focused fieldset": {
											borderColor: "#ff5151",
										},
									},
									"& label.Mui-focused": {
										color: "#ff5151",
									},
								}}
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
								className="w-[33%] bg-white"
								sx={{
									"& .MuiOutlinedInput-root": {
										"&.Mui-focused fieldset": {
											borderColor: "#ff5151",
										},
									},
									"& label.Mui-focused": {
										color: "#ff5151",
									},
								}}
							/>

							<TextField
								label="State"
								name="state"
								value={addressDetails.state}
								onChange={onChangeInput}
								variant="outlined"
								size="small"
								className="w-[33%] bg-white"
								sx={{
									"& .MuiOutlinedInput-root": {
										"&.Mui-focused fieldset": {
											borderColor: "#ff5151",
										},
									},
									"& label.Mui-focused": {
										color: "#ff5151",
									},
								}}
							/>

							<TextField
								label="Country"
								name="country"
								value={addressDetails.country}
								onChange={onChangeInput}
								variant="outlined"
								size="small"
								className="w-[33%] bg-white"
								sx={{
									"& .MuiOutlinedInput-root": {
										"&.Mui-focused fieldset": {
											borderColor: "#ff5151",
										},
									},
									"& label.Mui-focused": {
										color: "#ff5151",
									},
								}}
							/>
						</div>

						{/* ⭐ UPDATED — Row 3 includes landmark + addressType */}
						<div className="flex items-center gap-5  ">
							<TextField
								label="Landmark" // ⭐ NEW FIELD
								name="landmark"
								value={addressDetails.landmark}
								onChange={onChangeInput}
								variant="outlined"
								size="small"
								className="w-[50%] bg-white"
								sx={{
									"& .MuiOutlinedInput-root": {
										"&.Mui-focused fieldset": {
											borderColor: "#ff5151",
										},
									},
									"& label.Mui-focused": {
										color: "#ff5151",
									},
								}}
							/>

							<div className="w-[30%] flex justify-center">
								<FormControl>
									<p className="text-sm mb-1 font-medium text-gray-700 text-center">
										Address Type
									</p>

									<RadioGroup
										row
										name="addressType"
										value={addressDetails.addressType}
										onChange={onChangeInput}
										className="text-center"
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

						{/* Row 4 */}
						<div className="flex items-center gap-5">
							<div className="w-[33%]">
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

							{/* ⭐ STATUS FIXED — now boolean handled */}
							<div className="w-[33%]">
								<FormControl size="small" className="w-full">
									<InputLabel>Status</InputLabel>
									<Select
										label="Status"
										name="status"
										value={addressDetails.status.toString()}
										onChange={onChangeInput}
										className="bg-white"
									>
										<MenuItem value="true">True</MenuItem>
										<MenuItem value="false">False</MenuItem>
									</Select>
								</FormControl>
							</div>
						</div>

						<div className="flex items-center gap-4 mt-3">
							<Button
								type="submit"
								className="btn-org btn-lg w-[100px]"
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
								className="btn-org btn-lg btn-border w-[100px]"
							>
								Cancel
							</Button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}

export default Address;
