import { Button, CircularProgress, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";

function ForgotPassword() {
	const email = localStorage.getItem("userEmail");
	const [isLoading, setIsLoading] = useState(false);
	const context = useContext(MyContext);
	const [isShowPassword1, setIsShowPassWord1] = useState(false);
	const [isShowPassword2, setIsShowPassWord2] = useState(false);
	const [formFields, setFormFields] = useState({
		newPassword: "",
		confirmPassword: "",
		email: email,
	});

	const history = useNavigate();
	const valideValue = Object.values(formFields).every((el) => el);

	const onChangeInput = (e) => {
		const { name, value } = e.target;
		setFormFields(() => {
			return { ...formFields, [name]: value };
		});
	};
	const changePass = (e) => {
		e.preventDefault();
		if (formFields.newPassword !== formFields.confirmPassword) {
			context.openAlertBox("error", "Passwords do not match.");
			setIsLoading(false);
			return;
		}
		setIsLoading(true);

		postData("/api/user/reset-password", formFields)
			.then((res) => {
				if (res?.error === false) {
					context.openAlertBox("success", res.message);
					localStorage.removeItem("userEmail");
					history("/login");
				} else {
					context.openAlertBox(
						"error",
						res.message || "Password reset failed."
					);
				}
			})
			.catch((err) => {
				console.error("Password reset error:", err);
				context.openAlertBox(
					"error",
					"Something went wrong. Please try again."
				);
			})
			.finally(() => {
				setIsLoading(false); // ensures loading is stopped in all cases
			});
	};

	return (
		<section className="section py-10">
			<div className="container">
				<div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10 ">
					<h3 className="text-center text-[18px] text-black ">
						Forgot Password
					</h3>

					<form className="w-full mt-5" onSubmit={changePass}>
						<div className="form-group w-full mb-5 relative">
							<TextField
								type={`${isShowPassword1 === true ? "text" : "password"}`}
								id="password"
								label="New Password *"
								variant="outlined"
								className="w-full"
								name="newPassword"
								value={formFields.newPassword}
								onChange={onChangeInput}
								disabled={isLoading === true ? true : false}
								required
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
								value={formFields.confirmPassword}
								onChange={onChangeInput}
								disabled={isLoading === true ? true : false}
								required
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
							<Button
								type="submit"
								className="btn-org btn-lg w-full"
								disabled={!valideValue}
							>
								{isLoading === true ? (
									<CircularProgress color="inherit" />
								) : (
									"Change Password"
								)}
							</Button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}

export default ForgotPassword;
