import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";

function ForgotPassword() {
	const [isShowPassword1, setIsShowPassWord1] = useState(false);
	const [isShowPassword2, setIsShowPassWord2] = useState(false);

	return (
		<section className="section py-10">
			<div className="container">
				<div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10 ">
					<h3 className="text-center text-[18px] text-black ">
						Forgot Password
					</h3>

					<form className="w-full mt-5">
						<div className="form-group w-full mb-5 relative">
							<TextField
								type={`${isShowPassword1 === true ? "text" : "password"}`}
								id="password"
								label="New Password *"
								variant="outlined"
								className="w-full"
								name="password"
								sx={{
									"& .MuiOutlinedInput-root": {
										"&.Mui-focused fieldset": {
											borderColor: "#ff5151", // Focused border color
										},
									},
									"& .MuiInputLabel-root.Mui-focused": {
										color: "#ff5151", // Focused label color
									},
								}}
							/>
							{isShowPassword1 === false ? (
								<Button
									onClick={() => setIsShowPassWord1(!isShowPassword1)}
									className="!absolute !w-[35px] !min-w-[35px] !h-[35px] top-[10px] right-[10px] !rounded-md !text-black "
								>
									<MdVisibility className="16px" />
								</Button>
							) : (
								<Button
									onClick={() => setIsShowPassWord1(!isShowPassword1)}
									className="!absolute !w-[35px] !min-w-[35px] !h-[35px] top-[10px] right-[10px] !rounded-md !text-black "
								>
									<MdVisibilityOff className="16px" />
								</Button>
							)}
						</div>

						<div className="form-group w-full mb-5 relative">
							<TextField
								type={`${isShowPassword2 === true ? "text" : "password"}`}
								id="confirmPassword"
								label="Confirm Password *"
								variant="outlined"
								className="w-full"
								name="confirmPassword"
								sx={{
									"& .MuiOutlinedInput-root": {
										"&.Mui-focused fieldset": {
											borderColor: "#ff5151", // Focused border color
										},
									},
									"& .MuiInputLabel-root.Mui-focused": {
										color: "#ff5151", // Focused label color
									},
								}}
							/>
							{isShowPassword2 === false ? (
								<Button
									onClick={() => setIsShowPassWord2(!isShowPassword2)}
									className="!absolute !w-[35px] !min-w-[35px] !h-[35px] top-[10px] right-[10px] !rounded-md !text-black "
								>
									<MdVisibility className="16px" />
								</Button>
							) : (
								<Button
									onClick={() => setIsShowPassWord2(!isShowPassword2)}
									className="!absolute !w-[35px] !min-w-[35px] !h-[35px] top-[10px] right-[10px] !rounded-md !text-black "
								>
									<MdVisibilityOff className="16px" />
								</Button>
							)}
						</div>

						<div className="flex items-center w-full mt-3 mb-3">
							<Button className="btn-org btn-lg w-full">Change Password</Button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}

export default ForgotPassword;
