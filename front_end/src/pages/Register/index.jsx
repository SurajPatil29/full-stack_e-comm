import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { postData } from "../../utils/api";
import { MyContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

function Register() {
	const [isLoading, setIsLoading] = useState(false);
	const [isShowPassword, setIsShowPassWord] = useState(false);
	const [formFields, setFormFields] = useState({
		name: "",
		email: "",
		password: "",
	});

	const context = useContext(MyContext);

	const history = useNavigate();

	const onChangeInput = (e) => {
		const { name, value } = e.target;
		setFormFields(() => {
			return {
				...formFields,
				[name]: value,
			};
		});
	};

	const valideValue = Object.values(formFields).every((el) => el);
	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		if (formFields.name === "") {
			context.openAlertBox("error", "Please provide Full Name");
			return false;
		}

		if (formFields.email === "") {
			context.openAlertBox("error", "Please provide Email");
			return false;
		}

		if (formFields.password === "") {
			context.openAlertBox("error", "Please provide Password");
			return false;
		}

		postData("/api/user/register", formFields).then((res) => {
			// console.log(res);

			if (res?.error !== true) {
				setIsLoading(false);
				context.openAlertBox("success", res.message);
				localStorage.setItem("userEmail", formFields.email);

				setFormFields({
					name: "",
					email: "",
					password: "",
				});

				history("/verify");
			} else {
				context.openAlertBox("error", res.message);
				setIsLoading(false);
			}
		});
	};

	return (
		<section className="section py-10">
			<div className="container">
				<div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10 ">
					<h3 className="text-center text-[18px] text-black ">
						Register with a new account
					</h3>

					<form className="w-full mt-5" onSubmit={handleSubmit}>
						<div className="form-group w-full mb-5">
							<TextField
								type="text"
								id="name"
								name="name"
								value={formFields.name}
								disabled={isLoading === true ? true : false}
								label="Full Name *"
								variant="outlined"
								className="w-full"
								onChange={onChangeInput}
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

						<div className="form-group w-full mb-5">
							<TextField
								type="email"
								id="outlined-suffix-shrink"
								name="email"
								value={formFields.email}
								disabled={isLoading === true ? true : false}
								label="Email Id *"
								variant="outlined"
								className="w-full"
								onChange={onChangeInput}
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
								id="outlined-suffix-shrink"
								name="password"
								value={formFields.password}
								disabled={isLoading === true ? true : false}
								label="Password *"
								variant="outlined"
								className="w-full"
								onChange={onChangeInput}
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

						<div className="flex items-center w-full mt-3 mb-3">
							<Button
								className="btn-org btn-lg w-full flex gap-3"
								type="submit"
								disabled={!valideValue}
							>
								{isLoading === true ? (
									<CircularProgress color="inherit" />
								) : (
									"Register"
								)}
							</Button>
						</div>

						<p className="text-center">
							Already have an account?{" "}
							<Link
								className="link text-[14px] font-[600] text-[#ff5151] "
								to="/login"
							>
								Login
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

export default Register;
