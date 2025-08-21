import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
	Button,
	Checkbox,
	FormControlLabel,
	Typography,
	CircularProgress,
} from "@mui/material";
import { BiSolidUserAccount } from "react-icons/bi";
import { IoLogInSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";

function Login() {
	//google state
	const [loadingGoogle, setLoadingGoogle] = useState(false);

	function handleClickGoogle() {
		setLoadingGoogle(true);
	}
	//google state

	//fb state
	const [loadingfb, setLoadingfb] = useState(false);

	function handleClickfb() {
		setLoadingfb(true);
	}
	//fb state

	// password
	const [isPasswordShow, setIsPasswordShow] = useState(false);
	// password

	const [isloading, setIsLoading] = useState(false);
	const context = useContext(MyContext);
	const [formFields, setFormFields] = useState({
		email: "",
		password: "",
		role: "ADMIN",
	});

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

		if (formFields.email === "") {
			context.openAlertBox("error", "Please enter email id");
			return false;
		}

		if (formFields.password === "") {
			context.openAlertBox("error", "Please enter password");
		}

		postData("/api/user/login", formFields).then((res) => {
			if (res.error !== true) {
				setIsLoading(false);
				context.openAlertBox("sucess", res.message);
				setFormFields({
					email: "",
					password: "",
				});
				localStorage.setItem("accessToken", res?.accessToken);
				localStorage.setItem("refreshToken", res?.refreshToken);
				localStorage.setItem("userId", res?.user?.id);

				context.setIsLogin(true);
				history("/");
			} else {
				setIsLoading(false);
			}
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
						Sign in with your credentials
					</h1>
				</div>

				<div className="flex items-center justify-around w-full mt-5 gap-4 ">
					<Button
						size="small"
						onClick={handleClickGoogle}
						endIcon={<FcGoogle size={24} />}
						loading={loadingGoogle}
						loadingPosition="end"
						variant="outlined"
						className="!bg-none !py-2 !text-[15px] !capitalize !px-5 !text-[rgba(0,0,0,0.7)]"
					>
						SignIn with Google
					</Button>

					<Button
						size="small"
						onClick={handleClickfb}
						endIcon={<FaFacebookF size={24} color="blue" />}
						loading={loadingfb}
						loadingPosition="end"
						variant="outlined"
						className="!bg-none !py-2 !text-[15px] !capitalize !px-5 !text-[rgba(0,0,0,0.7)]"
					>
						SignIn with Facebook
					</Button>
				</div>

				<br />

				<div className="w-full flex items-center justify-center gap-3">
					<span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.3)] "></span>
					<span className="text-[15px] font-[500] ">
						Or, sign in with your email
					</span>
					<span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.3)] "></span>
				</div>

				<form className="w-full px-8 py-4" onSubmit={handleSubmit}>
					<div className="form-group mb-4 w-full">
						<h4 className="text-[14px] font-[500] mb-1 ">Email</h4>
						<input
							type="email"
							className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3 "
							name="email"
							value={formFields.email}
							disabled={isloading === true ? true : false}
							onChange={onChangeInput}
						/>
					</div>
					<div className="form-group mb-4 w-full">
						<h4 className="text-[14px] font-[500] mb-1 ">Password</h4>
						<div className="relative w-full">
							<input
								type={isPasswordShow === true ? "text" : "password"}
								className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3 "
								name="password"
								value={formFields.password}
								disabled={isloading === true ? true : false}
								onChange={onChangeInput}
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
					<div className="form-group mb-4 w-full flex items-center justify-between">
						<FormControlLabel
							control={<Checkbox defaultChecked />}
							label={<Typography fontSize="14px">Remember me</Typography>}
						/>
						<Link
							to="/forgot-password"
							className="text-[#3872fa] font-[700] text-[15] hover:underline "
						>
							Forgot Password?
						</Link>
					</div>
					<Button className="btn-blue btn-lg w-full" type="submit">
						{isloading === true ? (
							<CircularProgress color="inherit" />
						) : (
							"Sign In"
						)}
					</Button>
				</form>
			</div>
		</section>
	);
}

export default Login;
