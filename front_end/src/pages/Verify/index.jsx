import { useState } from "react";

import { Button } from "@mui/material";
import OtpBox from "../../componants/OtpBox";

function Verify() {
	const [otp, setOtp] = useState("");
	const handleOtpChange = (value) => {
		setOtp(value);
	};

	const verifyOTP = (e) => {
		e.preventDefault();
		alert(otp);
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
						<span className="text-[#ff5252] font-bold ">surajp@gamil.com</span>
					</p>
					<form onSubmit={verifyOTP}>
						<OtpBox length={6} onChange={handleOtpChange} />

						<div className="flex items-center justify-center mt-5 px-3">
							<Button type="submit" className="w-full btn-org btn-lg">
								{" "}
								Verify OTP
							</Button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}

export default Verify;
