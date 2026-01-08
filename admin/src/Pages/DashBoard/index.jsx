import { useContext } from "react";
import { Button } from "@mui/material";
import { FaPlus } from "react-icons/fa";

import DashboardBoxes from "../../Components/DashboardBoxes";

import MyContext from "../../context/MyContext";

import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip as RechartsTooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import OrdersCompo from "../Orders/OrdersCompo";
import ProductListCompo from "../Products/ProductListCompo";
import { useState } from "react";
import { fetchDataFromApi } from "../../utils/api";
import { useEffect } from "react";
import Chart from "./Chart";
// here was 2 tooltip because i rename tooltip

// custom tooltip for chart
// const CustomTooltip = ({ active, payload, label }) => {
// 	if (active && payload && payload.length) {
// 		return (
// 			<div className="bg-white p-3 rounded shadow-md border text-sm">
// 				<p className="font-semibold mb-1">{label}</p>
// 				<p className="text-green-600">Total Users: {payload[0].value}</p>
// 				<p className="text-blue-600">Total Sales: ₹{payload[1].value}</p>
// 			</div>
// 		);
// 	}
// 	return null;
// };
// custom tooltip for chart

function Dashboard() {
	const context = useContext(MyContext);

	// this is chart data
	// const chart1Data = [
	// 	{ name: "JAN", TotalUsers: 4200, TotalSales: 12000 },
	// 	{ name: "FEB", TotalUsers: 3800, TotalSales: 9500 },
	// 	{ name: "MAR", TotalUsers: 4500, TotalSales: 14200 },
	// 	{ name: "APR", TotalUsers: 5000, TotalSales: 13500 },
	// 	{ name: "MAY", TotalUsers: 5200, TotalSales: 15000 },
	// 	{ name: "JUN", TotalUsers: 4800, TotalSales: 13800 },
	// 	{ name: "JUL", TotalUsers: 5300, TotalSales: 15500 },
	// 	{ name: "AUG", TotalUsers: 5500, TotalSales: 16000 },
	// 	{ name: "SEP", TotalUsers: 4900, TotalSales: 14800 },
	// 	{ name: "OCT", TotalUsers: 4700, TotalSales: 14300 },
	// 	{ name: "NOV", TotalUsers: 5100, TotalSales: 15700 },
	// 	{ name: "DEC", TotalUsers: 5600, TotalSales: 16500 },
	// ];
	// this is chart data

	const getGreeting = () => {
		const hour = new Date().getHours();

		if (hour < 12) return "Good Morning";
		if (hour < 17) return "Good Afternoon";
		if (hour < 21) return "Good Evening";
		return "Good Night";
	};

	const getFirstName = (name = "") => {
		return name.trim().split(" ")[0];
	};

	return (
		<>
			<div
				className="dashboard w-full bg-[#f1faff] py-4 px-5 border border-[rgba(0,0,0,0.1)]
flex md:flex-row items-center gap-6 mb-5 justify-between rounded-md"
			>
				{/* LEFT CONTENT */}
				<div className="info w-full md:w-[70%]">
					<h1 className="text-[26px] sm:text-[30px] md:text-[35px] font-bold leading-tight mb-3">
						{getGreeting()}, <br />
						{context.isLogin
							? `${getFirstName(context?.userData?.name)} 👋`
							: "Please sign up"}
					</h1>

					<p className="text-sm sm:text-base mb-4">
						Here’s what’s happening in your store today. See the statistics at
						once.
					</p>

					<Button
						className="btn-blue !capitalize gap-3 w-full sm:w-auto"
						onClick={() =>
							context.setIsOpenFullScreenPanel({
								open: true,
								model: "Add Product",
							})
						}
					>
						<FaPlus /> Add Product
					</Button>
				</div>

				{/* RIGHT IMAGE */}
				<img
					src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1745128504/shop-illustration_ozvk0h.webp"
					alt="shop-illustration"
					className="hidden min-[650px]:block w-[220px] md:w-[300px]"
				/>
			</div>

			<DashboardBoxes />

			{/* Product Table */}
			<ProductListCompo />

			{/* recent order table */}

			<OrdersCompo />

			{/* recent order table */}

			<Chart />
		</>
	);
}

export default Dashboard;
