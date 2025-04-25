import React, { PureComponent } from "react"; // the pureComponant use for the chart
import DashboardBoxes from "../../Components/DashboardBoxes";
import Button from "@mui/material/Button";
import { FaPlus } from "react-icons/fa";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useState } from "react";
import Badges from "../../Components/Badge";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Progress from "../../Components/ProgressBar";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { FormControl, InputLabel, Tooltip } from "@mui/material";
import Pagination from "@mui/material/Pagination";

// mui table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

// use for category
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { PiExport } from "react-icons/pi";

// use for charts
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip as RechartsTooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
// here was 2 tooltip because i rename tooltip

const label = { inputProps: { "aria-label": "Checkbox demo" } }; // this is talwind css table variable and also in mui

// this is use for material ui table
const columns = [
	{ id: "product", label: "PRODUCT", minWidth: 150 },
	{ id: "category", label: "CATEGORY", minWidth: 100 },
	{
		id: "subcategory",
		label: "SUB CATEGORY",
		minWidth: 150,
	},
	{
		id: "price",
		label: "PRICE",
		minWidth: 150,
	},
	{
		id: "sales",
		label: "SALES",
		minWidth: 150,
	},
	{
		id: "action",
		label: "ACTION",
		minWidth: 150,
	},
];

// this is use for material ui table

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
	// this for recent order table
	const [isOpenOrderdProduct, setIsOpenOrderdProduct] = useState(null);

	const isShowOrderdProduct = (index) => {
		if (isOpenOrderdProduct === index) {
			setIsOpenOrderdProduct(null);
		} else {
			setIsOpenOrderdProduct(index);
		}
	};
	// this for recent order table

	// this for mui table functions
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	// this for mui table functions

	// this for use filters
	const [categoryFilterVal, setCategoryFilterValue] = React.useState("");

	const handleChangeCatFilter = (event) => {
		setCategoryFilterValue(event.target.value);
	};
	// this for use filters

	// this is chart data
	const chart1Data = [
		{ name: "JAN", TotalUsers: 4200, TotalSales: 12000 },
		{ name: "FEB", TotalUsers: 3800, TotalSales: 9500 },
		{ name: "MAR", TotalUsers: 4500, TotalSales: 14200 },
		{ name: "APR", TotalUsers: 5000, TotalSales: 13500 },
		{ name: "MAY", TotalUsers: 5200, TotalSales: 15000 },
		{ name: "JUN", TotalUsers: 4800, TotalSales: 13800 },
		{ name: "JUL", TotalUsers: 5300, TotalSales: 15500 },
		{ name: "AUG", TotalUsers: 5500, TotalSales: 16000 },
		{ name: "SEP", TotalUsers: 4900, TotalSales: 14800 },
		{ name: "OCT", TotalUsers: 4700, TotalSales: 14300 },
		{ name: "NOV", TotalUsers: 5100, TotalSales: 15700 },
		{ name: "DEC", TotalUsers: 5600, TotalSales: 16500 },
	];
	// this is chart data

	return (
		<>
			<div className="w-full bg-[#f1faff] py-2 p-5 border border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 justify-between rounded-md">
				<div className="info">
					<h1 className="text-[35px] font-bold leading-10 mb-3 ">
						Good Morning, <br />
						Suraj 👋
					</h1>
					<p>
						here's what happening on your tore today. see the statistics at once
					</p>
					<Button className="btn-blue !capitalize gap-3">
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

			{/* this is v1 tailwind css table */}
			<div className="card m-4 shadow-md sm:rounded-lg bg-white">
				<div className="flex items-center justify-between px-5 py-5">
					<h2 className="text-[18px] font-[600] ">Products</h2>
				</div>

				<div className="flex item-center w-full pl-5 justify-between pr-5">
					<div className="col w-[20%] ">
						<h4 className="font-[600] text-[13px] mb-2 ">Category by</h4>

						<Select
							className="w-full"
							size="small"
							labelId="demo-simple-select-helper-label"
							id="demo-simple-select-helper"
							value={categoryFilterVal}
							label="Category"
							onChange={handleChangeCatFilter}
							MenuProps={{
								PaperProps: {
									sx: {
										maxHeight: 200,
									},
								},
							}}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem>Men</MenuItem>
							<MenuItem>Women</MenuItem>
							<MenuItem>Kids</MenuItem>
						</Select>
					</div>
					<div className="col w-[25%] ml-auto flex items-center gap-3 ">
						<Button className="btn-sm !bg-green-600 !text-white gap-2 flex items-center">
							{" "}
							<PiExport className="text-white text-[20px] " />
							Export
						</Button>
						<Button className="btn-blue btn-sm !text-white">Add Product</Button>
					</div>
				</div>

				<div className="relative overflow-x-auto mt-5">
					<table className="w-full text-sm text-left rtl:text-right text-gray-500">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
							<tr>
								<th scope="col" className="px-6 pr-0 py-3 " width="10%">
									<div className="w-[60px] ">
										<Checkbox {...label} size="small" />
									</div>
								</th>
								<th scope="col" className="px-0 py-3 whitespace-nowrap">
									Product
								</th>
								<th scope="col" className="px-6 py-3 whitespace-nowrap">
									Category
								</th>
								<th scope="col" className="px-6 py-3 whitespace-nowrap">
									Sub Category
								</th>

								<th scope="col" className="px-6 py-3 whitespace-nowrap">
									Price
								</th>
								<th scope="col" className="px-6 py-3 whitespace-nowrap">
									Sales
								</th>
								<th scope="col" className="px-6 py-3 whitespace-nowrap">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							<tr className="odd:bg-white even:bg-gray-50 border-b  ">
								<td className="px-6 pr-0 py2 ">
									<div className="w-[60px] ">
										<Checkbox {...label} size="small" />
									</div>
								</td>
								<td className="px-0 py-2">
									<div className="w-[300px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
										<div className="info w-[75%] ">
											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
												<Link to="/product/474557">
													Buy Kalamkari Printed Red Kurta for Women{" "}
												</Link>
											</h3>
											<p className="text-[12px] ">Zara</p>
										</div>
									</div>
								</td>
								<td className="px-6 py-2">Fation</td>
								<td className="px-6 py-2">Women</td>
								<td className="px-6 py-2">
									<div className="flex gap-1 flex-col ">
										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
											$58.00
										</span>
										<span className="price text-[#3872fa] text-[14px] font-[600] ">
											$50.00
										</span>
									</div>
								</td>
								<td className="px-6 py-2">
									<p className="text-[14px] w-[100px]">
										234 <span className="font-[600">sale</span>
										<Progress value={65} type="warning" />
									</p>
								</td>
								<td className="px-6 py-2">
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</td>
							</tr>
							<tr className="odd:bg-white even:bg-gray-50 border-b  ">
								<td className="px-6 pr-0 py2 ">
									<div className="w-[60px] ">
										<Checkbox {...label} size="small" />
									</div>
								</td>
								<td className="px-0 py-2">
									<div className="w-[300px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
										<div className="info w-[75%] ">
											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
												<Link to="/product/474557">
													Buy Kalamkari Printed Red Kurta for Women{" "}
												</Link>
											</h3>
											<p className="text-[12px] ">Zara</p>
										</div>
									</div>
								</td>
								<td className="px-6 py-2">Fation</td>
								<td className="px-6 py-2">Women</td>
								<td className="px-6 py-2">
									<div className="flex gap-1 flex-col ">
										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
											$58.00
										</span>
										<span className="price text-[#3872fa] text-[14px] font-[600] ">
											$50.00
										</span>
									</div>
								</td>
								<td className="px-6 py-2">
									<p className="text-[14px] w-[100px]">
										234 <span className="font-[600">sale</span>
										<Progress value={65} type="warning" />
									</p>
								</td>
								<td className="px-6 py-2">
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</td>
							</tr>
							<tr className="odd:bg-white even:bg-gray-50 border-b  ">
								<td className="px-6 pr-0 py2 ">
									<div className="w-[60px] ">
										<Checkbox {...label} size="small" />
									</div>
								</td>
								<td className="px-0 py-2">
									<div className="w-[300px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
										<div className="info w-[75%] ">
											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
												<Link to="/product/474557">
													Buy Kalamkari Printed Red Kurta for Women{" "}
												</Link>
											</h3>
											<p className="text-[12px] ">Zara</p>
										</div>
									</div>
								</td>
								<td className="px-6 py-2">Fation</td>
								<td className="px-6 py-2">Women</td>
								<td className="px-6 py-2">
									<div className="flex gap-1 flex-col ">
										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
											$58.00
										</span>
										<span className="price text-[#3872fa] text-[14px] font-[600] ">
											$50.00
										</span>
									</div>
								</td>
								<td className="px-6 py-2">
									<p className="text-[14px] w-[100px]">
										234 <span className="font-[600">sale</span>
										<Progress value={65} type="warning" />
									</p>
								</td>
								<td className="px-6 py-2">
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</td>
							</tr>
							<tr className="odd:bg-white even:bg-gray-50 border-b  ">
								<td className="px-6 pr-0 py2 ">
									<div className="w-[60px] ">
										<Checkbox {...label} size="small" />
									</div>
								</td>
								<td className="px-0 py-2">
									<div className="w-[300px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
										<div className="info w-[75%] ">
											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
												<Link to="/product/474557">
													Buy Kalamkari Printed Red Kurta for Women{" "}
												</Link>
											</h3>
											<p className="text-[12px] ">Zara</p>
										</div>
									</div>
								</td>
								<td className="px-6 py-2">Fation</td>
								<td className="px-6 py-2">Women</td>
								<td className="px-6 py-2">
									<div className="flex gap-1 flex-col ">
										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
											$58.00
										</span>
										<span className="price text-[#3872fa] text-[14px] font-[600] ">
											$50.00
										</span>
									</div>
								</td>
								<td className="px-6 py-2">
									<p className="text-[14px] w-[100px]">
										234 <span className="font-[600">sale</span>
										<Progress value={65} type="warning" />
									</p>
								</td>
								<td className="px-6 py-2">
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</td>
							</tr>
							<tr className="odd:bg-white even:bg-gray-50 border-b  ">
								<td className="px-6 pr-0 py2 ">
									<div className="w-[60px] ">
										<Checkbox {...label} size="small" />
									</div>
								</td>
								<td className="px-0 py-2">
									<div className="w-[300px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
										<div className="info w-[75%] ">
											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
												<Link to="/product/474557">
													Buy Kalamkari Printed Red Kurta for Women{" "}
												</Link>
											</h3>
											<p className="text-[12px] ">Zara</p>
										</div>
									</div>
								</td>
								<td className="px-6 py-2">Fation</td>
								<td className="px-6 py-2">Women</td>
								<td className="px-6 py-2">
									<div className="flex gap-1 flex-col ">
										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
											$58.00
										</span>
										<span className="price text-[#3872fa] text-[14px] font-[600] ">
											$50.00
										</span>
									</div>
								</td>
								<td className="px-6 py-2">
									<p className="text-[14px] w-[100px]">
										234 <span className="font-[600">sale</span>
										<Progress value={65} type="warning" />
									</p>
								</td>
								<td className="px-6 py-2">
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</td>
							</tr>
							<tr className="odd:bg-white even:bg-gray-50 border-b  ">
								<td className="px-6 pr-0 py2 ">
									<div className="w-[60px] ">
										<Checkbox {...label} size="small" />
									</div>
								</td>
								<td className="px-0 py-2">
									<div className="w-[300px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
										<div className="info w-[75%] ">
											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
												<Link to="/product/474557">
													Buy Kalamkari Printed Red Kurta for Women{" "}
												</Link>
											</h3>
											<p className="text-[12px] ">Zara</p>
										</div>
									</div>
								</td>
								<td className="px-6 py-2">Fation</td>
								<td className="px-6 py-2">Women</td>
								<td className="px-6 py-2">
									<div className="flex gap-1 flex-col ">
										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
											$58.00
										</span>
										<span className="price text-[#3872fa] text-[14px] font-[600] ">
											$50.00
										</span>
									</div>
								</td>
								<td className="px-6 py-2">
									<p className="text-[14px] w-[100px]">
										234 <span className="font-[600">sale</span>
										<Progress value={65} type="warning" />
									</p>
								</td>
								<td className="px-6 py-2">
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</td>
							</tr>
							<tr className="odd:bg-white even:bg-gray-50 border-b  ">
								<td className="px-6 pr-0 py2 ">
									<div className="w-[60px] ">
										<Checkbox {...label} size="small" />
									</div>
								</td>
								<td className="px-0 py-2">
									<div className="w-[300px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
										<div className="info w-[75%] ">
											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
												<Link to="/product/474557">
													Buy Kalamkari Printed Red Kurta for Women{" "}
												</Link>
											</h3>
											<p className="text-[12px] ">Zara</p>
										</div>
									</div>
								</td>
								<td className="px-6 py-2">Fation</td>
								<td className="px-6 py-2">Women</td>
								<td className="px-6 py-2">
									<div className="flex gap-1 flex-col ">
										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
											$58.00
										</span>
										<span className="price text-[#3872fa] text-[14px] font-[600] ">
											$50.00
										</span>
									</div>
								</td>
								<td className="px-6 py-2">
									<p className="text-[14px] w-[100px]">
										234 <span className="font-[600">sale</span>
										<Progress value={65} type="warning" />
									</p>
								</td>
								<td className="px-6 py-2">
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</td>
							</tr>
							<tr className="odd:bg-white even:bg-gray-50 border-b  ">
								<td className="px-6 pr-0 py2 ">
									<div className="w-[60px] ">
										<Checkbox {...label} size="small" />
									</div>
								</td>
								<td className="px-0 py-2">
									<div className="w-[300px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
										<div className="info w-[75%] ">
											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
												<Link to="/product/474557">
													Buy Kalamkari Printed Red Kurta for Women{" "}
												</Link>
											</h3>
											<p className="text-[12px] ">Zara</p>
										</div>
									</div>
								</td>
								<td className="px-6 py-2">Fation</td>
								<td className="px-6 py-2">Women</td>
								<td className="px-6 py-2">
									<div className="flex gap-1 flex-col ">
										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
											$58.00
										</span>
										<span className="price text-[#3872fa] text-[14px] font-[600] ">
											$50.00
										</span>
									</div>
								</td>
								<td className="px-6 py-2">
									<p className="text-[14px] w-[100px]">
										234 <span className="font-[600">sale</span>
										<Progress value={65} type="warning" />
									</p>
								</td>
								<td className="px-6 py-2">
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</td>
							</tr>
							<tr className="odd:bg-white even:bg-gray-50 border-b  ">
								<td className="px-6 pr-0 py2 ">
									<div className="w-[60px] ">
										<Checkbox {...label} size="small" />
									</div>
								</td>
								<td className="px-0 py-2">
									<div className="w-[300px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
										<div className="info w-[75%] ">
											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
												<Link to="/product/474557">
													Buy Kalamkari Printed Red Kurta for Women{" "}
												</Link>
											</h3>
											<p className="text-[12px] ">Zara</p>
										</div>
									</div>
								</td>
								<td className="px-6 py-2">Fation</td>
								<td className="px-6 py-2">Women</td>
								<td className="px-6 py-2">
									<div className="flex gap-1 flex-col ">
										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
											$58.00
										</span>
										<span className="price text-[#3872fa] text-[14px] font-[600] ">
											$50.00
										</span>
									</div>
								</td>
								<td className="px-6 py-2">
									<p className="text-[14px] w-[100px]">
										234 <span className="font-[600">sale</span>
										<Progress value={65} type="warning" />
									</p>
								</td>
								<td className="px-6 py-2">
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</td>
							</tr>
							<tr className="odd:bg-white even:bg-gray-50 border-b  ">
								<td className="px-6 pr-0 py2 ">
									<div className="w-[60px] ">
										<Checkbox {...label} size="small" />
									</div>
								</td>
								<td className="px-0 py-2">
									<div className="w-[300px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
										<div className="info w-[75%] ">
											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
												<Link to="/product/474557">
													Buy Kalamkari Printed Red Kurta for Women{" "}
												</Link>
											</h3>
											<p className="text-[12px] ">Zara</p>
										</div>
									</div>
								</td>
								<td className="px-6 py-2">Fation</td>
								<td className="px-6 py-2">Women</td>
								<td className="px-6 py-2">
									<div className="flex gap-1 flex-col ">
										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
											$58.00
										</span>
										<span className="price text-[#3872fa] text-[14px] font-[600] ">
											$50.00
										</span>
									</div>
								</td>
								<td className="px-6 py-2">
									<p className="text-[14px] w-[100px]">
										234 <span className="font-[600">sale</span>
										<Progress value={65} type="warning" />
									</p>
								</td>
								<td className="px-6 py-2">
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</td>
							</tr>
							<tr className="odd:bg-white even:bg-gray-50 border-b  ">
								<td className="px-6 pr-0 py2 ">
									<div className="w-[60px] ">
										<Checkbox {...label} size="small" />
									</div>
								</td>
								<td className="px-0 py-2">
									<div className="w-[300px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
										<div className="info w-[75%] ">
											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
												<Link to="/product/474557">
													Buy Kalamkari Printed Red Kurta for Women{" "}
												</Link>
											</h3>
											<p className="text-[12px] ">Zara</p>
										</div>
									</div>
								</td>
								<td className="px-6 py-2">Fation</td>
								<td className="px-6 py-2">Women</td>
								<td className="px-6 py-2">
									<div className="flex gap-1 flex-col ">
										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
											$58.00
										</span>
										<span className="price text-[#3872fa] text-[14px] font-[600] ">
											$50.00
										</span>
									</div>
								</td>
								<td className="px-6 py-2">
									<p className="text-[14px] w-[100px]">
										234 <span className="font-[600">sale</span>
										<Progress value={65} type="warning" />
									</p>
								</td>
								<td className="px-6 py-2">
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div className="flex item-center justify-end pt-4 pb-4">
					<Pagination
						count={10}
						sx={{
							"& .MuiPaginationItem-root": {
								color: "rgba(0,0,0,0.5)",
								"&.Mui-selected": {
									backgroundColor: "#3872fa",
									color: "#fff",
								},
							},
						}}
					/>
				</div>
			</div>
			{/* this is v1 tailwind css table */}

			{/* this is material ui table v2 */}

			<div className="card m-4 shadow-md sm:rounded-lg bg-white">
				<div className="flex items-center justify-between px-5 py-5 ">
					<h2 className="text-[18px] font-[600] ">Products</h2>
				</div>
				<div className="flex item-center w-full pl-5 justify-between pr-5">
					<div className="col w-[20%] ">
						<h4 className="font-[600] text-[13px] mb-2 ">Category by</h4>

						<Select
							className="w-full"
							size="small"
							labelId="demo-simple-select-helper-label"
							id="demo-simple-select-helper"
							value={categoryFilterVal}
							label="Category"
							onChange={handleChangeCatFilter}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem>Men</MenuItem>
							<MenuItem>Women</MenuItem>
							<MenuItem>Kids</MenuItem>
						</Select>
					</div>

					<div className="col w-[25%] ml-auto flex items-center gap-3 ">
						<Button className="btn-sm !bg-green-600 !text-white gap-2 flex items-center">
							{" "}
							<PiExport className="text-white text-[20px] " />
							Export
						</Button>
						<Button className="btn-blue btn-sm !text-white">Add Product</Button>
					</div>
				</div>
				<br />
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead className="!bg-gray-50">
							<TableRow className="">
								<TableCell style={{ minWidth: columns.minWidth }}>
									<Checkbox {...label} size="small" />
								</TableCell>
								{columns.map((column) => (
									<TableCell
										key={column.id}
										align={column.align}
										style={{ minWidth: column.minWidth }}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="w-[300px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
										<div className="info w-[75%] ">
											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
												<Link to="/product/474557">
													Buy Kalamkari Printed Red Kurta for Women{" "}
												</Link>
											</h3>
											<p className="text-[12px] ">Zara</p>
										</div>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Fation
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Women
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="flex gap-1 flex-col ">
										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
											$58.00
										</span>
										<span className="price text-[#3872fa] text-[14px] font-[600] ">
											$50.00
										</span>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="text-[14px] w-[100px]">
										234 <span className="font-[600]">sale</span>
										<Progress value={65} type="warning" />
									</div>
								</TableCell>

								<TableCell style={{ minWidth: columns.minWidth }}>
									{" "}
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="w-[300px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
										<div className="info w-[75%] ">
											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
												<Link to="/product/474557">
													Buy Kalamkari Printed Red Kurta for Women{" "}
												</Link>
											</h3>
											<p className="text-[12px] ">Zara</p>
										</div>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Fation
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Women
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="flex gap-1 flex-col ">
										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
											$58.00
										</span>
										<span className="price text-[#3872fa] text-[14px] font-[600] ">
											$50.00
										</span>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="text-[14px] w-[100px]">
										234 <span className="font-[600]">sale</span>
										<Progress value={65} type="warning" />
									</div>
								</TableCell>

								<TableCell style={{ minWidth: columns.minWidth }}>
									{" "}
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="w-[300px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
										<div className="info w-[75%] ">
											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
												<Link to="/product/474557">
													Buy Kalamkari Printed Red Kurta for Women{" "}
												</Link>
											</h3>
											<p className="text-[12px] ">Zara</p>
										</div>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Fation
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Women
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="flex gap-1 flex-col ">
										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
											$58.00
										</span>
										<span className="price text-[#3872fa] text-[14px] font-[600] ">
											$50.00
										</span>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="text-[14px] w-[100px]">
										234 <span className="font-[600]">sale</span>
										<Progress value={65} type="warning" />
									</div>
								</TableCell>

								<TableCell style={{ minWidth: columns.minWidth }}>
									{" "}
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="w-[300px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
										<div className="info w-[75%] ">
											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
												<Link to="/product/474557">
													Buy Kalamkari Printed Red Kurta for Women{" "}
												</Link>
											</h3>
											<p className="text-[12px] ">Zara</p>
										</div>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Fation
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Women
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="flex gap-1 flex-col ">
										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
											$58.00
										</span>
										<span className="price text-[#3872fa] text-[14px] font-[600] ">
											$50.00
										</span>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="text-[14px] w-[100px]">
										234 <span className="font-[600]">sale</span>
										<Progress value={65} type="warning" />
									</div>
								</TableCell>

								<TableCell style={{ minWidth: columns.minWidth }}>
									{" "}
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="w-[300px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
										<div className="info w-[75%] ">
											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
												<Link to="/product/474557">
													Buy Kalamkari Printed Red Kurta for Women{" "}
												</Link>
											</h3>
											<p className="text-[12px] ">Zara</p>
										</div>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Fation
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Women
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="flex gap-1 flex-col ">
										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
											$58.00
										</span>
										<span className="price text-[#3872fa] text-[14px] font-[600] ">
											$50.00
										</span>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="text-[14px] w-[100px]">
										234 <span className="font-[600]">sale</span>
										<Progress value={65} type="warning" />
									</div>
								</TableCell>

								<TableCell style={{ minWidth: columns.minWidth }}>
									{" "}
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="w-[300px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
										<div className="info w-[75%] ">
											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
												<Link to="/product/474557">
													Buy Kalamkari Printed Red Kurta for Women{" "}
												</Link>
											</h3>
											<p className="text-[12px] ">Zara</p>
										</div>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Fation
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Women
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="flex gap-1 flex-col ">
										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
											$58.00
										</span>
										<span className="price text-[#3872fa] text-[14px] font-[600] ">
											$50.00
										</span>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="text-[14px] w-[100px]">
										234 <span className="font-[600]">sale</span>
										<Progress value={65} type="warning" />
									</div>
								</TableCell>

								<TableCell style={{ minWidth: columns.minWidth }}>
									{" "}
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="w-[300px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
										<div className="info w-[75%] ">
											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
												<Link to="/product/474557">
													Buy Kalamkari Printed Red Kurta for Women{" "}
												</Link>
											</h3>
											<p className="text-[12px] ">Zara</p>
										</div>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Fation
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Women
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="flex gap-1 flex-col ">
										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
											$58.00
										</span>
										<span className="price text-[#3872fa] text-[14px] font-[600] ">
											$50.00
										</span>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="text-[14px] w-[100px]">
										234 <span className="font-[600]">sale</span>
										<Progress value={65} type="warning" />
									</div>
								</TableCell>

								<TableCell style={{ minWidth: columns.minWidth }}>
									{" "}
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="w-[300px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
										<div className="info w-[75%] ">
											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
												<Link to="/product/474557">
													Buy Kalamkari Printed Red Kurta for Women{" "}
												</Link>
											</h3>
											<p className="text-[12px] ">Zara</p>
										</div>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Fation
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Women
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="flex gap-1 flex-col ">
										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
											$58.00
										</span>
										<span className="price text-[#3872fa] text-[14px] font-[600] ">
											$50.00
										</span>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="text-[14px] w-[100px]">
										234 <span className="font-[600]">sale</span>
										<Progress value={65} type="warning" />
									</div>
								</TableCell>

								<TableCell style={{ minWidth: columns.minWidth }}>
									{" "}
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="w-[300px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
										<div className="info w-[75%] ">
											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
												<Link to="/product/474557">
													Buy Kalamkari Printed Red Kurta for Women{" "}
												</Link>
											</h3>
											<p className="text-[12px] ">Zara</p>
										</div>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Fation
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Women
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="flex gap-1 flex-col ">
										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
											$58.00
										</span>
										<span className="price text-[#3872fa] text-[14px] font-[600] ">
											$50.00
										</span>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="text-[14px] w-[100px]">
										234 <span className="font-[600]">sale</span>
										<Progress value={65} type="warning" />
									</div>
								</TableCell>

								<TableCell style={{ minWidth: columns.minWidth }}>
									{" "}
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="w-[300px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
										<div className="info w-[75%] ">
											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
												<Link to="/product/474557">
													Buy Kalamkari Printed Red Kurta for Women{" "}
												</Link>
											</h3>
											<p className="text-[12px] ">Zara</p>
										</div>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Fation
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Women
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="flex gap-1 flex-col ">
										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
											$58.00
										</span>
										<span className="price text-[#3872fa] text-[14px] font-[600] ">
											$50.00
										</span>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="text-[14px] w-[100px]">
										234 <span className="font-[600]">sale</span>
										<Progress value={65} type="warning" />
									</div>
								</TableCell>

								<TableCell style={{ minWidth: columns.minWidth }}>
									{" "}
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="w-[300px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
										<div className="info w-[75%] ">
											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
												<Link to="/product/474557">
													Buy Kalamkari Printed Red Kurta for Women{" "}
												</Link>
											</h3>
											<p className="text-[12px] ">Zara</p>
										</div>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Fation
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Women
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="flex gap-1 flex-col ">
										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
											$58.00
										</span>
										<span className="price text-[#3872fa] text-[14px] font-[600] ">
											$50.00
										</span>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="text-[14px] w-[100px]">
										234 <span className="font-[600]">sale</span>
										<Progress value={65} type="warning" />
									</div>
								</TableCell>

								<TableCell style={{ minWidth: columns.minWidth }}>
									{" "}
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="w-[300px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
										<div className="info w-[75%] ">
											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
												<Link to="/product/474557">
													Buy Kalamkari Printed Red Kurta for Women{" "}
												</Link>
											</h3>
											<p className="text-[12px] ">Zara</p>
										</div>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Fation
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Women
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="flex gap-1 flex-col ">
										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
											$58.00
										</span>
										<span className="price text-[#3872fa] text-[14px] font-[600] ">
											$50.00
										</span>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="text-[14px] w-[100px]">
										234 <span className="font-[600]">sale</span>
										<Progress value={65} type="warning" />
									</div>
								</TableCell>

								<TableCell style={{ minWidth: columns.minWidth }}>
									{" "}
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="w-[300px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
										<div className="info w-[75%] ">
											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
												<Link to="/product/474557">
													Buy Kalamkari Printed Red Kurta for Women{" "}
												</Link>
											</h3>
											<p className="text-[12px] ">Zara</p>
										</div>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Fation
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Women
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="flex gap-1 flex-col ">
										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
											$58.00
										</span>
										<span className="price text-[#3872fa] text-[14px] font-[600] ">
											$50.00
										</span>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="text-[14px] w-[100px]">
										234 <span className="font-[600]">sale</span>
										<Progress value={65} type="warning" />
									</div>
								</TableCell>

								<TableCell style={{ minWidth: columns.minWidth }}>
									{" "}
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="w-[300px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
										<div className="info w-[75%] ">
											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
												<Link to="/product/474557">
													Buy Kalamkari Printed Red Kurta for Women{" "}
												</Link>
											</h3>
											<p className="text-[12px] ">Zara</p>
										</div>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Fation
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Women
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="flex gap-1 flex-col ">
										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
											$58.00
										</span>
										<span className="price text-[#3872fa] text-[14px] font-[600] ">
											$50.00
										</span>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="text-[14px] w-[100px]">
										234 <span className="font-[600]">sale</span>
										<Progress value={65} type="warning" />
									</div>
								</TableCell>

								<TableCell style={{ minWidth: columns.minWidth }}>
									{" "}
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="w-[300px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
										<div className="info w-[75%] ">
											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
												<Link to="/product/474557">
													Buy Kalamkari Printed Red Kurta for Women{" "}
												</Link>
											</h3>
											<p className="text-[12px] ">Zara</p>
										</div>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Fation
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Women
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="flex gap-1 flex-col ">
										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
											$58.00
										</span>
										<span className="price text-[#3872fa] text-[14px] font-[600] ">
											$50.00
										</span>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="text-[14px] w-[100px]">
										234 <span className="font-[600]">sale</span>
										<Progress value={65} type="warning" />
									</div>
								</TableCell>

								<TableCell style={{ minWidth: columns.minWidth }}>
									{" "}
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="w-[300px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
										<div className="info w-[75%] ">
											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
												<Link to="/product/474557">
													Buy Kalamkari Printed Red Kurta for Women{" "}
												</Link>
											</h3>
											<p className="text-[12px] ">Zara</p>
										</div>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Fation
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Women
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="flex gap-1 flex-col ">
										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
											$58.00
										</span>
										<span className="price text-[#3872fa] text-[14px] font-[600] ">
											$50.00
										</span>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="text-[14px] w-[100px]">
										234 <span className="font-[600]">sale</span>
										<Progress value={65} type="warning" />
									</div>
								</TableCell>

								<TableCell style={{ minWidth: columns.minWidth }}>
									{" "}
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="w-[300px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
										<div className="info w-[75%] ">
											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
												<Link to="/product/474557">
													Buy Kalamkari Printed Red Kurta for Women{" "}
												</Link>
											</h3>
											<p className="text-[12px] ">Zara</p>
										</div>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Fation
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Women
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="flex gap-1 flex-col ">
										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
											$58.00
										</span>
										<span className="price text-[#3872fa] text-[14px] font-[600] ">
											$50.00
										</span>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="text-[14px] w-[100px]">
										234 <span className="font-[600]">sale</span>
										<Progress value={65} type="warning" />
									</div>
								</TableCell>

								<TableCell style={{ minWidth: columns.minWidth }}>
									{" "}
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="w-[300px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
										<div className="info w-[75%] ">
											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
												<Link to="/product/474557">
													Buy Kalamkari Printed Red Kurta for Women{" "}
												</Link>
											</h3>
											<p className="text-[12px] ">Zara</p>
										</div>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Fation
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Women
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="flex gap-1 flex-col ">
										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
											$58.00
										</span>
										<span className="price text-[#3872fa] text-[14px] font-[600] ">
											$50.00
										</span>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="text-[14px] w-[100px]">
										234 <span className="font-[600]">sale</span>
										<Progress value={65} type="warning" />
									</div>
								</TableCell>

								<TableCell style={{ minWidth: columns.minWidth }}>
									{" "}
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="w-[300px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
										<div className="info w-[75%] ">
											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
												<Link to="/product/474557">
													Buy Kalamkari Printed Red Kurta for Women{" "}
												</Link>
											</h3>
											<p className="text-[12px] ">Zara</p>
										</div>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Fation
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Women
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="flex gap-1 flex-col ">
										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
											$58.00
										</span>
										<span className="price text-[#3872fa] text-[14px] font-[600] ">
											$50.00
										</span>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="text-[14px] w-[100px]">
										234 <span className="font-[600]">sale</span>
										<Progress value={65} type="warning" />
									</div>
								</TableCell>

								<TableCell style={{ minWidth: columns.minWidth }}>
									{" "}
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="w-[300px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
										<div className="info w-[75%] ">
											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
												<Link to="/product/474557">
													Buy Kalamkari Printed Red Kurta for Women{" "}
												</Link>
											</h3>
											<p className="text-[12px] ">Zara</p>
										</div>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Fation
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Women
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="flex gap-1 flex-col ">
										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
											$58.00
										</span>
										<span className="price text-[#3872fa] text-[14px] font-[600] ">
											$50.00
										</span>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="text-[14px] w-[100px]">
										234 <span className="font-[600]">sale</span>
										<Progress value={65} type="warning" />
									</div>
								</TableCell>

								<TableCell style={{ minWidth: columns.minWidth }}>
									{" "}
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="w-[300px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
										<div className="info w-[75%] ">
											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
												<Link to="/product/474557">
													Buy Kalamkari Printed Red Kurta for Women{" "}
												</Link>
											</h3>
											<p className="text-[12px] ">Zara</p>
										</div>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Fation
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Women
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="flex gap-1 flex-col ">
										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
											$58.00
										</span>
										<span className="price text-[#3872fa] text-[14px] font-[600] ">
											$50.00
										</span>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="text-[14px] w-[100px]">
										234 <span className="font-[600]">sale</span>
										<Progress value={65} type="warning" />
									</div>
								</TableCell>

								<TableCell style={{ minWidth: columns.minWidth }}>
									{" "}
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={10}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</div>

			{/* this is material ui table v2 */}

			<div className="card m-4 shadow-md sm:rounded-lg bg-white">
				<div className="flex items-center justify-between px-5 py-5">
					<h2 className="text-[18px] font-[600] ">Recent Orders</h2>
				</div>
				<div className="relative overflow-x-auto mt-5">
					<table className="w-full text-sm text-left rtl:text-right text-gray-500">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
							<tr>
								<th scope="col" className="px-6 py-3">
									&nbsp;
								</th>
								<th scope="col" className="px-6 py-3 whitespace-nowrap">
									Order Id
								</th>
								<th scope="col" className="px-6 py-3 whitespace-nowrap">
									Product Id
								</th>
								<th scope="col" className="px-6 py-3 whitespace-nowrap">
									Name
								</th>
								<th scope="col" className="px-6 py-3 whitespace-nowrap">
									Address
								</th>
								<th scope="col" className="px-6 py-3 whitespace-nowrap">
									Pincode
								</th>
								<th scope="col" className="px-6 py-3 whitespace-nowrap">
									Total Amount
								</th>
								<th scope="col" className="px-6 py-3 whitespace-nowrap">
									Email
								</th>

								<th scope="col" className="px-6 py-3 whitespace-nowrap">
									User Id
								</th>
								<th scope="col" className="px-6 py-3 whitespace-nowrap">
									Order Status
								</th>
								<th scope="col" className="px-6 py-3 whitespace-nowrap">
									Date
								</th>
							</tr>
						</thead>
						<tbody>
							<tr className="bg-white border-b font-[500] ">
								<td className="px-6 py-4 font-[500]">
									<Button
										className="!w-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] "
										onClick={() => isShowOrderdProduct(0)}
									>
										{isOpenOrderdProduct === 0 ? (
											<FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)] " />
										) : (
											<FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)] " />
										)}
									</Button>
								</td>
								<td className="px-6 py-4 font-[500]">
									<span className="text-[#3872fa] font-[600] ">
										6622577941265403
									</span>
								</td>
								<td className="px-6 py-4 font-[500]">
									<span className="text-[#3872fa] font-[600] ">
										pym_id125895
									</span>
								</td>
								<td className="px-6 py-4 font-[500] whitespace-nowrap">
									Suraj Patil
								</td>
								<td className="px-6 py-4 font-[500]">0231456789</td>
								<td className="px-6 py-4 font-[500]">
									<span className="block w-[300px]">
										h no 111 streat gandhi adarsh collony{" "}
									</span>
								</td>
								<td className="px-6 py-4 font-[500]">110033</td>
								<td className="px-6 py-4 font-[500]">3080</td>
								<td className="px-6 py-4 font-[500]">
									<span className="text-[#3872fa] font-[600] ">
										52311799521233
									</span>
								</td>
								<td className="px-6 py-4 font-[500]">
									<Badges status="delivered" />
								</td>
								<td className="px-6 py-4 font-[500] whitespace-nowrap">
									2025-2-22
								</td>
							</tr>

							{isOpenOrderdProduct === 0 && (
								<tr>
									<td className=" pl-20 " colSpan="6">
										<div className="relative overflow-x-auto ">
											<table className="w-full text-sm text-left rtl:text-right text-gray-500">
												<thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
													<tr>
														<th
															scope="col"
															className="px-6 py-3 whitespace-nowrap"
														>
															Product Id
														</th>
														<th
															scope="col"
															className="px-6 py-3 whitespace-nowrap"
														>
															Product Title
														</th>
														<th
															scope="col"
															className="px-6 py-3 whitespace-nowrap"
														>
															Image
														</th>
														<th
															scope="col"
															className="px-6 py-3 whitespace-nowrap"
														>
															Quantity
														</th>
														<th
															scope="col"
															className="px-6 py-3 whitespace-nowrap"
														>
															Price
														</th>
														<th
															scope="col"
															className="px-6 py-3 whitespace-nowrap"
														>
															Sub Total
														</th>
													</tr>
												</thead>
												<tbody>
													<tr className="bg-white border-b font-[500] ">
														<td className="px-6 py-4 font-[500]">
															<span className="text-[#3872fa] font-[600] ">
																6622577941265403
															</span>
														</td>
														<td className="px-6 py-4 font-[500]">
															A-line kurti with Sharara and Dupatta
														</td>
														<td className="px-6 py-4 font-[500] whitespace-nowrap">
															<img
																src="https://api.spicezgold.com/download/file_1734528821890_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-0-202308161431.webp"
																alt=""
																className="w-[40px] h-[40px] object-cover rounded-md "
															/>
														</td>
														<td className="px-6 py-4 font-[500]">2</td>
														<td className="px-6 py-4 font-[500]">1300</td>
														<td className="px-6 py-4 font-[500]">1300</td>
													</tr>
												</tbody>
											</table>
										</div>
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>

			{/* chart */}
			<div className="card my-4 shadow-md sm:rounded-lg bg-white">
				<div className="flex items-center justify-between px-5 py-5 pb-0">
					<h2 className="text-[18px] font-[600]">Total Users & Total Sales</h2>
				</div>

				{/* Custom Legend */}
				<div className="flex items-center gap-5 px-5 py-5 pt-1">
					<span className="flex items-center gap-1 text-[15px]">
						<span className="block w-[8px] h-[8px] rounded-full bg-green-600"></span>
						Total Users
					</span>
					<span className="flex items-center gap-1 text-[15px]">
						<span className="block w-[8px] h-[8px] rounded-full bg-[#3872fa]"></span>
						Total Sales
					</span>
				</div>

				{/* Chart */}
				<div className="w-full h-[400px] px-5 pb-5">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart
							data={chart1Data}
							margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
						>
							<CartesianGrid strokeDasharray="3 3" stroke="#none" />
							<XAxis dataKey="name" tick={{ fontSize: 12 }} />
							<YAxis tick={{ fontSize: 12 }} />
							{/* <RechartsTooltip content={<CustomTooltip />} /> // this i was use for cutom chart */}
							<RechartsTooltip />

							<Legend />
							<Line
								type="monotone"
								dataKey="TotalUsers"
								stroke="#16a34a" // Tailwind green-600
								strokeWidth={3}
								activeDot={{ r: 8 }}
							/>
							<Line
								type="monotone"
								dataKey="TotalSales"
								stroke="#3872fa"
								strokeWidth={3}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>
		</>
	);
}

export default Dashboard;
