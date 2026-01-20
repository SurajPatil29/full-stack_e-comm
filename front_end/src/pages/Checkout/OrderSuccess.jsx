import { Button } from "@mui/material";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useLocation, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import MyContext from "../../context/MyContext";

function OrderSuccess() {
	const location = useLocation();
	const context = useContext(MyContext);

	const orderId = location.state?.orderId;

	// ❌ Prevent direct access without order
	if (!orderId) {
		return <Navigate to="/" />;
	}

	return (
		<section className="min-h-[70vh] flex items-center justify-center px-4">
			<div className="bg-white shadow-lg rounded-lg  p-6 sm:p-8 w-full max-w-[420px] text-center">
				<BsCheckCircleFill className="text-green-500 text-5xl sm:text-6xl mx-auto" />

				<h2 className="text-2xl font-bold mt-4">
					Order Placed Successfully 🎉
				</h2>

				<p className="text-gray-600 mt-2">Thank you for shopping with us.</p>

				<div className="bg-gray-50 p-3 rounded-md mt-4 text-sm">
					<p className="text-sm text-gray-700">
						Order ID:
						<span className="font-semibold ml-1">{orderId}</span>
					</p>
				</div>

				<div className="flex flex-col sm:flex-row gap-3 mt-6">
					<Link to="/my-orders" className="w-full">
						<Button
							variant="outlined"
							fullWidth
							sx={{ borderColor: "#ff5151", color: "#ff5151" }}
						>
							View Orders
						</Button>
					</Link>

					<Link to="/" className="w-full">
						<Button
							variant="contained"
							fullWidth
							sx={{
								backgroundColor: "#ff5151",
								"&:hover": { backgroundColor: "#e64545" },
							}}
						>
							Continue Shopping
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
}

export default OrderSuccess;
