import { Button, CircularProgress, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { postData } from "../../utils/api";
import MyContext from "../../context/MyContext";

import { firebaseApp } from "../../firebase/Firebase";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signInWithRedirect,
} from "firebase/auth";

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

function Login() {
	const [isLoading, setIsLoading] = useState(false);
	const context = useContext(MyContext);
	const [isShowPassword, setIsShowPassWord] = useState(false);
	const [formFields, setFormFields] = useState({
		email: "",
		password: "",
		role: "USER",
	});

	const history = useNavigate();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const forgotPassword = () => {
		setIsLoading(true);

		if (formFields.email !== "") {
			postData("/api/user/forgot-password", {
				email: formFields.email,
				role: formFields.role,
			}).then((res) => {
				if (res?.error === false) {
					context.openAlertBox("success", `OTP send to ${formFields.email}`);
					localStorage.setItem("userEmail", formFields.email);
					localStorage.setItem("actionType", "forgot-password");
					history("/verify");

					setFormFields(() => {
						return {
							email: "",
							password: "",
						};
					});
					setIsLoading(false);
				} else {
					setIsLoading(false);

					context.openAlertBox("error", res.message);
				}
			});
		}
		if (formFields.email === "") {
			context.openAlertBox("error", "Enter email");
			setIsLoading(false);
		}
	};

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

		if (formFields.email === "") {
			context.openAlertBox("error", "Please enter email id");
			return false;
		}

		if (formFields.password === "") {
			context.openAlertBox("error", "Please enter password");
		}

		postData("/api/user/login", formFields).then((res) => {
			// console.log(res?.accessToken, res?.refreshToken);
			if (res.error !== true) {
				setIsLoading(false);
				context.openAlertBox("success", res.message);

				setFormFields({
					email: "",
					password: "",
				});
				localStorage.setItem("accessToken", res?.accessToken);
				localStorage.setItem("refreshToken", res?.refreshToken);
				context.setIsLogin(true);
				history("/");
			} else {
				setIsLoading(false);
			}
		});
	};

	const authWithGoogle = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider);
			const user = result.user;

			// Build a safe payload
			const payload = {
				name: user.displayName || "Unknown User",
				email: user.email,
				avatar: user.photoURL || "",
				mobile: user.phoneNumber || "", // fallback priority
				role: "USER",
				signUpWithGoogle: true,
			};

			// Call backend Google login endpoint
			const res = await postData("/api/user/googleLogin", payload);

			if (res.error) {
				// ❌ Google login not allowed → sign out from Firebase immediately
				await auth.signOut();
				context.openAlertBox("error", res.message);
				return;
			}

			// ✔ Login success
			context.openAlertBox("success", res.message);

			localStorage.setItem("accessToken", res.accessToken);
			localStorage.setItem("refreshToken", res.refreshToken);
			localStorage.setItem("isGoogleLogin", "true");

			context.setIsLogin(true);

			history("/");
		} catch (error) {
			console.log("Google Auth Error:", error);
			context.openAlertBox("error", "Google authentication failed");
		}
	};
	return (
		<section className="section py-10">
			<div className="container">
				<div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10 ">
					<h3 className="text-center text-[18px] text-black ">
						Login to our account
					</h3>

					<form className="w-full mt-5" onSubmit={handleSubmit}>
						<div className="form-group w-full mb-5">
							<TextField
								type="email"
								id="outlined-suffix-shrink1"
								label="Email Id *"
								variant="outlined"
								className="w-full"
								name="email"
								value={formFields.email}
								disabled={isLoading === true ? true : false}
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
								id="outlined-suffix-shrink2"
								label="Password *"
								variant="outlined"
								className="w-full"
								name="password"
								value={formFields.password}
								disabled={isLoading === true ? true : false}
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

						<a
							onClick={forgotPassword}
							className="link cursor-pointer text-[14px] font-[600] "
						>
							Forgot Password
						</a>

						<div className="flex items-center w-full mt-3 mb-3">
							<Button
								className="btn-org btn-lg w-full flex gap-3"
								type="submit"
								// disabled={!valideValue}
							>
								{isLoading === true ? (
									<CircularProgress color="inherit" />
								) : (
									"Login"
								)}
							</Button>
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

						<Button
							className="flex w-full !bg-[#f1f1f1] btn-lg !text-black gap-3"
							onClick={authWithGoogle}
						>
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
