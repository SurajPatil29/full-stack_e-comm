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
import { useState } from "react";
import { fetchDataFromApi } from "../../utils/api";
import { useEffect } from "react";

function Chart() {
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
			{/* ================= BAR CHART ================= */}
			<div className="card my-4 shadow-md sm:rounded-lg bg-white">
				<div className="flex items-center justify-between px-5 py-5 pb-0">
					<h2 className="text-[18px] font-[600]">Total Users & Total Sales</h2>

					<select
						value={year}
						onChange={handleChangeYear}
						className="border rounded px-2 py-1"
					>
						<option value={2026}>2026</option>
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

export default Chart;
