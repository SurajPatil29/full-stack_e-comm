import { useContext, useEffect, useState } from "react";

import { Button, CircularProgress } from "@mui/material";
import OtpBox from "../../componants/OtpBox";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";

function Verify() {
	const [otp, setOtp] = useState("");
	const [isLoading, setIsLoding] = useState(false);
	const handleOtpChange = (value) => {
		setOtp(value);
	};
	// console.log(otp);
	const history = useNavigate();
	const context = useContext(MyContext);
	const verifyOTP = async (e) => {
		e.preventDefault();
		setIsLoding(true);

		const actionType = localStorage.getItem("actionType") || "";

		if (actionType !== "forgot-password") {
			try {
				const res = await postData("/api/user/verifyEmail", {
					email: localStorage.getItem("userEmail"),
					otp: otp,
					role: "USER",
				});
				setIsLoding(false);

				if (res?.error === false) {
					context.openAlertBox("success", res.message);
					localStorage.removeItem("userEmail");
					history("/login");
				} else {
					context.openAlertBox("error", res.message);
				}
			} catch (error) {
				setIsLoding(false);
				context.openAlertBox("error", "Something went wrong. Try again.");
			}
		} else {
			try {
				const res = await postData("/api/user/verify-forgot-password-otp", {
					email: localStorage.getItem("userEmail"),
					otp: otp,
					role: "USER",
				});
				setIsLoding(false);

				if (res?.error === false) {
					context.openAlertBox("success", res.message);
					localStorage.removeItem("actionType");

					history("/forgot-password");
				} else {
					context.openAlertBox("error", res.message);
				}
			} catch (error) {
				setIsLoding(false);
				context.openAlertBox("error", "Something went wrong. Try again.");
			}
		}
	};

	return (
		<section className="otpPage section py-10">
			<div className="container">
				<div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10 ">
					<div className="text-center flex items-center justify-center ">
						<img
							src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1738133133/verify2_s6t1cv.png"
							alt="verify img"
							width="80"
						/>
					</div>
					<h3 className="text-center mt-4 mb-1 text-[18px] text-black ">
						Verify OTP
					</h3>

					<p className="text-center mb-4 ">
						OTP send to{" "}
						<span className="text-[#ff5252] font-bold ">
							{localStorage.getItem("userEmail")}
						</span>
					</p>
					<form onSubmit={verifyOTP}>
						<OtpBox length={6} onChange={handleOtpChange} />

						<div className="flex items-center justify-center mt-5 px-3">
							<Button type="submit" className="w-full btn-org btn-lg">
								{isLoading === true ? (
									<CircularProgress color="inherit" />
								) : (
									"Verify OTP"
								)}
							</Button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}

export default Verify;
