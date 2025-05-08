import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { BiSolidUserAccount } from "react-icons/bi";
import { IoLogInSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";

function ForgotPassword() {
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

				<form className="w-full px-8 py-4">
					<div className="form-group mb-4 w-full">
						<h4 className="text-[14px] font-[500] mb-1 ">Email</h4>
						<input
							type="email"
							className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3 "
							placeholder="Enter your Email..."
						/>
					</div>

					<Button className="btn-blue btn-lg w-full">Reset Password</Button>
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
