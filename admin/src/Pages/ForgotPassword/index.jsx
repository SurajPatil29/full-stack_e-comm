import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import { BiSolidUserAccount } from "react-icons/bi";
import { IoLogInSharp } from "react-icons/io5";

import { useState } from "react";
import { useContext } from "react";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";

function ForgotPassword() {
	const [isLoading, setIsLoading] = useState(false);
	const [formFields, setFormFields] = useState({
		email: "",
		role: "ADMIN",
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

	const forgotPassword = (e) => {
		e.preventDefault();
		setIsLoading(true);

		if (formFields.email !== "") {
			postData("/api/user/forgot-password", formFields).then((res) => {
				if (res?.error === false) {
					context.openAlertBox("success", `OTP send to ${formFields.email}`);
					localStorage.setItem("userEmail", formFields.email);
					localStorage.setItem("actionType", "forgot-password");
					history("/verify-account");

					setFormFields(() => {
						return {
							email: "",
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
	return (
		<section className="  w-full ">
			<header className="w-full fixed top-0 left-0  px-4 py-3 flex items-center justify-between ">
				<Link to="/">
					<img
						src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1735815171/logo_xqjli7.png"
						alt=""
						className="w-[200px] z-50 "
					/>{" "}
				</Link>
				<div className="flex items-center gap-4 ">
					<NavLink
						to="/login"
						className={({ isActive }) => (isActive ? "isActive" : "")}
					>
						<Button className="flex items-center gap-1 px-4 !rounded-full !text-[rgba(0,0,0,0.7)] ">
							<IoLogInSharp className="text-[17px]" />
							LogIn
						</Button>
					</NavLink>

					<NavLink
						to="/signup"
						className={({ isActive }) => (isActive ? "isActive" : "")}
					>
						<Button className="flex items-center gap-1 px-4 !rounded-full !text-[rgba(0,0,0,0.7)] ">
							{" "}
							<BiSolidUserAccount className="text-[17px] " />
							SignUp
						</Button>
					</NavLink>
				</div>
			</header>
			<img
				src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1745725205/bgimg3_xuxtpc.jpg"
				alt="signupbg"
				className="w-full h-full fixed top-0 left-0 opacity-5 -z-10"
			/>

			<div className="loginBox card w-[600px] h-auto mx-auto py-20 mt-20 relative z-50  ">
				<div className="text-center">
					<img
						src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1745725680/logocrop_brgoqw.png"
						alt="logo"
						className="m-auto"
					/>
				</div>

				<div className="">
					<h1 className="text-center text-[35px] font-[800] ">
						Having trouble to sign in ? <br />
						Reset your password.
					</h1>
				</div>

				<form className="w-full px-8 py-4" onSubmit={forgotPassword}>
					<div className="form-group mb-4 w-full">
						<h4 className="text-[14px] font-[500] mb-1 ">Email</h4>
						<input
							type="email"
							className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3 "
							placeholder="Enter your Email..."
							name="email"
							value={formFields.email}
							onChange={onChangeInput}
							disabled={isLoading === true ? true : false}
							required
						/>
					</div>

					<Button className="btn-blue btn-lg w-full" type="submit">
						{isLoading === true ? (
							<CircularProgress color="inherit" />
						) : (
							"Reset Password"
						)}
					</Button>
					<br />
					<br />
					<div className="text-center gap-2">
						<span>Don't want to reset? </span>
						<Link
							to="/signin"
							className="text-[#3872fa] font-[700] text-[15px] hover:underline hover:text-gray-700 "
						>
							Sign In
						</Link>
					</div>
				</form>
			</div>
		</section>
	);
}

export default ForgotPassword;
