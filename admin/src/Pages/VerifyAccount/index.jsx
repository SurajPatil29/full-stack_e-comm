import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { BiSolidUserAccount } from "react-icons/bi";
import { IoLogInSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import OtpBox from "../../Components/OtpBox";

function VerifyAccount() {
	const [otp, setOtp] = useState("");
	const handleOtpChange = (value) => {
		setOtp(value);
	};
	const verifyOTP = (e) => {
		e.preventDefault();
		alert(otp);
	};
	return (
		<section className=" otpPage w-full ">
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
						src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1738133133/verify2_s6t1cv.png"
						alt=""
						className="m-auto w-[100px] "
					/>
				</div>

				<div className="">
					<h1 className="text-center text-[35px] font-[800] ">
						Welcom <br />
						Please verify your Email
					</h1>
					<p className="text-center text-[15px] ">
						OTP send to{" "}
						<span className="text-[#3872fa] font-bold ">suraj@email.com</span>
					</p>

					<form onSubmit={verifyOTP}>
						<div className="text-center flex items-center justify-center flex-col">
							<OtpBox length={6} onChange={handleOtpChange} />
						</div>
						<br />
						<div className="w-[300px] m-auto ">
							{" "}
							<Button type="submit" className="btn-blue btn-lg w-full">
								Verify OTP
							</Button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}

export default VerifyAccount;
