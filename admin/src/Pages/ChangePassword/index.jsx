import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import { BiSolidUserAccount } from "react-icons/bi";
import { IoLogInSharp } from "react-icons/io5";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { useContext } from "react";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";

function ChangePassword() {
	const email = localStorage.getItem("userEmail");
	const [isLoading, setIsLoading] = useState(false);
	const context = useContext(MyContext);
	// password
	const [isPasswordShow, setIsPasswordShow] = useState(false);
	// password

	// password
	const [isPasswordShow2, setIsPasswordShow2] = useState(false);
	// password

	const [formField, setFormField] = useState({
		newPassword: "",
		confirmPassword: "",
		email: email,
		role: "ADMIN",
	});

	const history = useNavigate();
	const valideValue = Object.values(formField).every((el) => el);

	const onChangeInput = (e) => {
		const { name, value } = e.target;
		setFormField(() => {
			return {
				...formField,
				[name]: value,
			};
		});
	};

	const changePass = (e) => {
		e.preventDefault();
		if (formField.newPassword !== formField.confirmPassword) {
			context.openAlertBox("error", "Passwords do not match.");
			setIsLoading(false);
			return;
		}
		setIsLoading(true);

		postData("/api/user/reset-password", formField)
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
				console.error("Password reset error: ", err);
				console.openAlertBox(
					"error",
					"Something went wrong. Please try again."
				);
			})
			.finally(() => {
				setIsLoading(false); //ensures loading is stopped in all cases
			});
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
						Welcom Back! <br />
						You can change your password from here
					</h1>
				</div>

				<form className="w-full px-8 py-4" onSubmit={changePass}>
					<div className="form-group mb-4 w-full">
						<h4 className="text-[14px] font-[500] mb-1 ">New Password</h4>
						<div className="relative w-full">
							<input
								type={isPasswordShow === true ? "text" : "password"}
								className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3 "
								name="newPassword"
								value={formField.newPassword}
								onChange={onChangeInput}
								disabled={isLoading === true ? true : false}
								required
							/>
							<Button
								className="!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[35px] !h-[35px] !min-w-[35px] !text-[rgba(0,0,0,0.6)] "
								onClick={() => setIsPasswordShow(!isPasswordShow)}
							>
								{isPasswordShow === true ? (
									<MdVisibility className="text-[18px]  " />
								) : (
									<MdVisibilityOff className="text-[18px]  " />
								)}
							</Button>
						</div>
					</div>
					<div className="form-group mb-4 w-full">
						<h4 className="text-[14px] font-[500] mb-1 ">Confirm Password</h4>
						<div className="relative w-full">
							<input
								type={isPasswordShow2 === true ? "text" : "password"}
								className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3 "
								name="confirmPassword"
								value={formField.confirmPassword}
								onChange={onChangeInput}
								disabled={isLoading === true ? true : false}
								required
							/>
							<Button
								className="!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[35px] !h-[35px] !min-w-[35px] !text-[rgba(0,0,0,0.6)] "
								onClick={() => setIsPasswordShow2(!isPasswordShow2)}
							>
								{isPasswordShow2 === true ? (
									<MdVisibility className="text-[18px]  " />
								) : (
									<MdVisibilityOff className="text-[18px]  " />
								)}
							</Button>
						</div>
					</div>

					<Button
						className="btn-blue btn-lg w-full"
						type="submit"
						disabled={!valideValue}
					>
						{" "}
						{isLoading === true ? (
							<CircularProgress color="inherit" />
						) : (
							"Change Password"
						)}
					</Button>
				</form>
			</div>
		</section>
	);
}

export default ChangePassword;
