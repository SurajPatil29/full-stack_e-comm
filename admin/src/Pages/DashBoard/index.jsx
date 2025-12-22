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

	const [chartData, setChartData] = useState([]);
	const [year, setYear] = useState(new Date().getFullYear());

	const [showUsers, setShowUsers] = useState(true);
	const [showSales, setShowSales] = useState(true);

	/* ================= FETCH & MERGE DATA ================= */
	const getChartData = async (selectedYear = year) => {
		try {
			const [usersRes, salesRes] = await Promise.all([
				fetchDataFromApi(`/api/order/users?year=${selectedYear}`),
				fetchDataFromApi(`/api/order/sales?year=${selectedYear}`),
			]);

			const users = usersRes?.monthlyUsers || [];
			const sales = salesRes?.monthlySales || [];
			console.log(usersRes, salesRes);
			const merged = users.map((item, index) => ({
				name: item.name,
				TotalUsers: item.TotalUsers || 0,
				TotalSales: sales[index]?.TotalSales || 0,
			}));

			setChartData(merged);
		} catch (error) {
			console.error("Chart fetch error:", error);
		}
	};

	useEffect(() => {
		getChartData();
	}, []);

	/* ================= YEAR CHANGE ================= */
	const handleChangeYear = (e) => {
		const selectedYear = e.target.value;
		setYear(selectedYear);
		getChartData(selectedYear);
	};

	return (
		<>
			<div className="dashboard w-full bg-[#f1faff] py-2 p-5 border border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 justify-between rounded-md">
				<div className="info">
					<h1 className="text-[35px] font-bold leading-10 mb-3 ">
						Good Morning, <br />
						{context.isLogin
							? `${context?.userData?.name}👋`
							: "User Please sign up"}
					</h1>
					<p>
						here's what happening on your tore today. see the statistics at once
					</p>
					<Button
						className="btn-blue !capitalize gap-3 "
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
				<img
					src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1745128504/shop-illustration_ozvk0h.webp"
					alt="shop-illustration"
					className="w-[300px] "
				/>
			</div>
			<DashboardBoxes />

			{/* Product Table */}
			<ProductListCompo />

			{/* recent order table */}

			<OrdersCompo />

			{/* recent order table */}

			{/* ================= BAR CHART ================= */}
			<div className="card my-4 shadow-md sm:rounded-lg bg-white">
				<div className="flex items-center justify-between px-5 py-5 pb-0">
					<h2 className="text-[18px] font-[600]">Total Users & Total Sales</h2>

					<select
						value={year}
						onChange={handleChangeYear}
						className="border rounded px-2 py-1"
					>
						<option value={2025}>2025</option>
						<option value={2024}>2024</option>
						<option value={2023}>2023</option>
					</select>
				</div>

				{/* Legend */}
				<div className="flex items-center gap-5 px-5 py-3">
					<span
						onClick={() => {
							setShowUsers(true);
							setShowSales(false);
						}}
						className={`flex items-center gap-2 text-sm cursor-pointer select-none
			${showUsers ? "opacity-100" : "opacity-40"}`}
					>
						<span className="w-3 h-3 bg-green-600 rounded-full"></span>
						Total Users
					</span>

					<span
						onClick={() => {
							setShowSales(true);
							setShowUsers(false);
						}}
						className={`flex items-center gap-2 text-sm cursor-pointer select-none
			${showSales ? "opacity-100" : "opacity-40"}`}
					>
						<span className="w-3 h-3 bg-[#3872fa] rounded-full"></span>
						Total Sales
					</span>
				</div>

				<div className="w-full h-[400px] px-5 pb-5">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={chartData}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<RechartsTooltip />
							<Legend />

							{showUsers && (
								<Bar
									dataKey="TotalUsers"
									fill="#16a34a"
									radius={[4, 4, 0, 0]}
								/>
							)}

							{showSales && (
								<Bar
									dataKey="TotalSales"
									fill="#3872fa"
									radius={[4, 4, 0, 0]}
								/>
							)}
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>
		</>
	);
}

export default Dashboard;
