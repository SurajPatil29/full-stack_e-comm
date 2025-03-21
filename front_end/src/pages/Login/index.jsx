import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MyContext } from "../../App";

function Login() {
	const context = useContext(MyContext);
	const [isShowPassword, setIsShowPassWord] = useState(false);
	// const [formFields, setFormFields] = useState({
	// 	email: "",
	// 	password: "",
	// });

	const history = useNavigate();

	const forgotPassword = () => {
		// if (formFields.email !== "") {
		history("/verify");
		context.openAlertBox("success", "OTP is send");
		// }
	};

	return (
		<section className="section py-10">
			<div className="container">
				<div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10 ">
					<h3 className="text-center text-[18px] text-black ">
						Login to our account
					</h3>

					<form className="w-full mt-5">
						<div className="form-group w-full mb-5">
							<TextField
								type="email"
								id="outlined-suffix-shrink1"
								label="Email Id *"
								variant="outlined"
								className="w-full"
								name="email"
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
						</div>

						<div className="form-group w-full mb-5 relative">
							<TextField
								type={`${isShowPassword === true ? "text" : "password"}`}
								id="outlined-suffix-shrink2"
								label="Password *"
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
							{isShowPassword === false ? (
								<Button
									onClick={() => setIsShowPassWord(!isShowPassword)}
									className="!absolute !w-[35px] !min-w-[35px] !h-[35px] top-[10px] right-[10px] !rounded-md !text-black "
								>
									<MdVisibility className="16px" />
								</Button>
							) : (
								<Button
									onClick={() => setIsShowPassWord(!isShowPassword)}
									className="!absolute !w-[35px] !min-w-[35px] !h-[35px] top-[10px] right-[10px] !rounded-md !text-black "
								>
									<MdVisibilityOff className="16px" />
								</Button>
							)}
						</div>

						<a
							onClick={forgotPassword}
							className="link cursor-pointer text-[14px] font-[600] "
						>
							Forgot Password
						</a>

						<div className="flex items-center w-full mt-3 mb-3">
							<Button className="btn-org btn-lg w-full">Login</Button>
						</div>

						<p className="text-center">
							Not Registered?{" "}
							<Link
								className="link text-[14px] font-[600] text-[#ff5151] "
								to="/register"
							>
								Sign Up
							</Link>{" "}
						</p>

						<p className="text-center">Or continue with social account</p>

						<Button className="flex w-full !bg-[#f1f1f1] btn-lg !text-black gap-3">
							<FcGoogle className="text-[22px]" />
							Login with Google
						</Button>
					</form>
				</div>
			</div>
		</section>
	);
}

export default Login;
