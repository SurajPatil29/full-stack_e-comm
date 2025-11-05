import React, { useContext, useEffect, useState } from "react";
import {
	Button,
	Checkbox,
	CircularProgress,
	MenuItem,
	Select,
	Tooltip,
} from "@mui/material";
import { FaPlus, FaRegEye, FaAngleDown, FaAngleUp } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { RiProductHuntLine } from "react-icons/ri";
import { PiExport } from "react-icons/pi";
import { Link } from "react-router-dom";

import DashboardBoxes from "../../Components/DashboardBoxes";
import SearchBox from "../../Components/SearchBox";
import Progress from "../../Components/ProgressBar";
import Badges from "../../Components/Badge";
import MyContext from "../../context/MyContext";
import { deleteData, deleteMultiple, fetchDataFromApi } from "../../utils/api";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

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
	{ id: "subcategory", label: "SUB CATEGORY", minWidth: 150 },
	{ id: "price", label: "PRICE", minWidth: 150 },
	{ id: "sales", label: "SALES", minWidth: 150 },
	{ id: "action", label: "ACTION", minWidth: 150 },
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
	const context = useContext(MyContext);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [products, setProducts] = useState([]);
	const [selected, setSelected] = useState([]);
	const [loading, setLoading] = useState(false);

	// category filters
	const [catData, setCatData] = useState([]);
	const [subCatData, setSubCatData] = useState([]);
	const [thirdCatData, setThirdCatData] = useState([]);
	const [categoryValue, setCategoryValue] = useState("");
	const [subCategoryValue, setSubCategoryValue] = useState("");
	const [thirdCategoryValue, setThirdCategoryValue] = useState("");

	// Fetch all categories
	const getCategoryData = async () => {
		try {
			setLoading(true);
			const res = await fetchDataFromApi("/api/category/categories");
			setTimeout(() => {
				setCatData(res.data || []);
				setLoading(false);
			}, 800);
		} catch (error) {
			context.openAlertBox("error", "Failed to fetch categories");
			setLoading(false);
		}
	};

	// Fetch all or filtered products
	const getAllProducts = async () => {
		try {
			setLoading(true);
			const res = await fetchDataFromApi("/api/product/getAllProducts");
			setTimeout(() => {
				if (res.success) setProducts(res.products);
				setLoading(false);
			}, 800);
		} catch (error) {
			context.openAlertBox("error", "Failed to fetch products");
			setLoading(false);
		}
	};

	const fetchFilteredProducts = async () => {
		try {
			setLoading(true);
			const params = new URLSearchParams();
			if (categoryValue) params.append("catId", categoryValue);
			if (subCategoryValue) params.append("subCatId", subCategoryValue);
			if (thirdCategoryValue)
				params.append("thirdsubCatId", thirdCategoryValue);

			const res = await fetchDataFromApi(
				`/api/product/filter?${params.toString()}`
			);
			setTimeout(() => {
				setProducts(res.products || []);
				setLoading(false);
			}, 800);
		} catch (error) {
			context.openAlertBox("error", "Failed to fetch products");
			setLoading(false);
		}
	};

	useEffect(() => {
		getCategoryData();
		getAllProducts();
	}, []);

	useEffect(() => {
		if (categoryValue || subCategoryValue || thirdCategoryValue) {
			fetchFilteredProducts();
		} else {
			getAllProducts();
		}
	}, [categoryValue, subCategoryValue, thirdCategoryValue]);

	// handle category change
	const handleChangeCategory = (e) => {
		const selectedId = e.target.value;
		setCategoryValue(selectedId);
		const selectedCategory = catData.find((cat) => cat._id === selectedId);
		setSubCatData(selectedCategory?.children || []);
		setThirdCatData([]);
		setSubCategoryValue("");
		setThirdCategoryValue("");
	};

	const handleChangeSubCategory = (e) => {
		const selectedSubId = e.target.value;
		setSubCategoryValue(selectedSubId);
		const selectedSubCategory = subCatData.find(
			(sub) => sub._id === selectedSubId
		);
		setThirdCatData(selectedSubCategory?.children || []);
		setThirdCategoryValue("");
	};

	const handleChangeThirdCategory = (e) =>
		setThirdCategoryValue(e.target.value);

	// table pagination
	const handleChangePage = (event, newPage) => setPage(newPage);
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	// select checkboxes
	const handleSelectAll = (event) => {
		if (event.target.checked) {
			setSelected(products.map((p) => p._id));
		} else {
			setSelected([]);
		}
	};

	const handleSelectOne = (id) => {
		setSelected((prev) =>
			prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
		);
	};

	const deleteProduct = async (id) => {
		try {
			setLoading(true);
			await deleteData(`/api/product/${id}`);
			setTimeout(() => {
				setProducts((prev) => prev.filter((product) => product._id !== id));
				setLoading(false);
				context.openAlertBox("success", "Product deleted successfully");
			}, 800);
		} catch (error) {
			context.openAlertBox("error", "Error deleting product");
			setLoading(false);
		}
	};

	const deleteMultipleProducts = async () => {
		try {
			setLoading(true);
			const res = await deleteMultiple(`/api/product/deleteMultiple`, {
				ids: selected,
			});
			if (res.success) {
				setTimeout(() => {
					setProducts((prev) => prev.filter((p) => !selected.includes(p._id)));
					context.openAlertBox("success", "Products deleted successfully");
					setLoading(false);
				}, 800);
			}
		} catch (error) {
			context.openAlertBox("error", "Error deleting products");
			setLoading(false);
		}
	};

	const [isOpenOrderdProduct, setIsOpenOrderdProduct] = useState(null);
	const isShowOrderdProduct = (index) => {
		if (isOpenOrderdProduct === index) {
			setIsOpenOrderdProduct(null);
		} else {
			setIsOpenOrderdProduct(index);
		}
	}; // this for recent order table

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

			{/* this is v1 tailwind css table */}
			{/* <div className="card m-4 shadow-md sm:rounded-lg bg-white">
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
							displayEmpty
							inputProps={{ "aria-label": "Without label" }}
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
							<MenuItem value="Men">Men</MenuItem>
							<MenuItem value="Women">Women</MenuItem>
							<MenuItem value="Kids">Kids</MenuItem>
						</Select>
					</div>
					<div className="col w-[30%] ml-auto flex items-center justify-end gap-3 ">
						<Button className="btn-sm !bg-green-600 !text-white gap-2 flex items-center">
							{" "}
							<PiExport className="text-white text-[20px] " />
							Export
						</Button>
						<Button
							className="btn-blue btn-sm !text-white gap-2 flex items-center"
							onClick={() =>
								context.setIsOpenFullScreenPanel({
									open: true,
									model: "Add Product",
								})
							}
						>
							{" "}
							<RiProductHuntLine className="text-white text-[20px]   " />
							Add Product
						</Button>
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
									<div className="text-[14px] w-[100px]">
										234 <span className="font-[600">sale</span>
										<Progress value={65} type="warning" />
									</div>
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
									<div className="text-[14px] w-[100px]">
										234 <span className="font-[600">sale</span>
										<Progress value={65} type="warning" />
									</div>
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
									<div className="text-[14px] w-[100px]">
										234 <span className="font-[600">sale</span>
										<Progress value={65} type="warning" />
									</div>
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
									<div className="text-[14px] w-[100px]">
										234 <span className="font-[600">sale</span>
										<Progress value={65} type="warning" />
									</div>
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
									<div className="text-[14px] w-[100px]">
										234 <span className="font-[600">sale</span>
										<Progress value={65} type="warning" />
									</div>
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
									<div className="text-[14px] w-[100px]">
										234 <span className="font-[600">sale</span>
										<Progress value={65} type="warning" />
									</div>
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
									<div className="text-[14px] w-[100px]">
										234 <span className="font-[600">sale</span>
										<Progress value={65} type="warning" />
									</div>
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
									<div className="text-[14px] w-[100px]">
										234 <span className="font-[600">sale</span>
										<Progress value={65} type="warning" />
									</div>
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
									<div className="text-[14px] w-[100px]">
										234 <span className="font-[600">sale</span>
										<Progress value={65} type="warning" />
									</div>
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
									<div className="text-[14px] w-[100px]">
										234 <span className="font-[600">sale</span>
										<Progress value={65} type="warning" />
									</div>
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
									<div className="text-[14px] w-[100px]">
										234 <span className="font-[600">sale</span>
										<Progress value={65} type="warning" />
									</div>
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
			</div> */}
			{/* this is v1 tailwind css table */}

			{/* this is material ui table v2 */}

			{/* Product Table */}
			<div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
				{/* Top Controls */}
				<div className="flex items-center justify-between px-5 py-5">
					<h2 className="text-[18px] font-[600]">Products</h2>
					{selected.length > 0 && (
						<Button
							className="btn-sm !bg-red-600 !text-white gap-2 flex items-center"
							onClick={deleteMultipleProducts}
						>
							<MdOutlineDelete className="text-white text-[20px]" />
							Delete
						</Button>
					)}
				</div>

				{/* Category Filters */}
				<div className="flex items-center w-full px-5 justify-between ">
					<div className="flex items-center gap-5 w-full">
						{/* MAIN CATEGORY */}
						<div className="col w-[15%]">
							<h4 className="font-[600] text-[13px] mb-2">Category</h4>
							<Select
								className="w-full"
								size="small"
								value={categoryValue}
								displayEmpty
								onChange={handleChangeCategory}
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								{catData.map((cat) => (
									<MenuItem key={cat._id} value={cat._id}>
										{cat.name}
									</MenuItem>
								))}
							</Select>
						</div>

						{/* SUB CATEGORY */}
						<div className="col w-[15%]">
							<h4 className="font-[600] text-[13px] mb-2">Sub Category</h4>
							<Select
								className="w-full"
								size="small"
								value={subCategoryValue}
								displayEmpty
								onChange={handleChangeSubCategory}
								disabled={!categoryValue}
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								{subCatData.map((sub) => (
									<MenuItem key={sub._id} value={sub._id}>
										{sub.name}
									</MenuItem>
								))}
							</Select>
						</div>

						{/* THIRD CATEGORY */}
						<div className="col w-[15%]">
							<h4 className="font-[600] text-[13px] mb-2">Third Category</h4>
							<Select
								className="w-full"
								size="small"
								value={thirdCategoryValue}
								displayEmpty
								onChange={handleChangeThirdCategory}
								disabled={!subCategoryValue}
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								{thirdCatData.map((third) => (
									<MenuItem key={third._id} value={third._id}>
										{third.name}
									</MenuItem>
								))}
							</Select>
						</div>
					</div>

					<div className="col w-[20%] ml-auto">
						<SearchBox />
					</div>
				</div>

				{/* Table */}
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								<TableCell>
									<Checkbox
										checked={
											selected.length === products.length && products.length > 0
										}
										onChange={handleSelectAll}
										size="small"
									/>
								</TableCell>
								{columns.map((column) => (
									<TableCell key={column.id}>{column.label}</TableCell>
								))}
							</TableRow>
						</TableHead>

						<TableBody>
							{loading ? (
								<TableRow>
									<TableCell colSpan={8}>
										<div className="flex items-center justify-center w-full min-h-[400px]">
											<CircularProgress color="inherit" />
										</div>
									</TableCell>
								</TableRow>
							) : products.length === 0 ? (
								<TableRow>
									<TableCell colSpan={8}>
										<div className="flex items-center justify-center w-full min-h-[400px] text-gray-500 font-medium">
											No products found
										</div>
									</TableCell>
								</TableRow>
							) : (
								products
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((product) => (
										<TableRow key={product._id} hover>
											<TableCell>
												<Checkbox
													size="small"
													checked={selected.includes(product._id)}
													onChange={() => handleSelectOne(product._id)}
												/>
											</TableCell>

											{/* PRODUCT */}
											<TableCell>
												<div className="flex items-center gap-4">
													<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
														<Link to={`/product/${product._id}`}>
															<img
																src={
																	product.images?.[0] ||
																	"https://via.placeholder.com/65"
																}
																alt={product.name}
																className="w-full h-full object-cover group-hover:scale-105 transition-all"
															/>
														</Link>
													</div>
													<div>
														<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa]">
															<Link to={`/product/${product._id}`}>
																{product.name}
															</Link>
														</h3>
														<p className="text-[12px]">{product.brand}</p>
													</div>
												</div>
											</TableCell>

											<TableCell>{product.catName || "—"}</TableCell>
											<TableCell>{product.subCat || "—"}</TableCell>
											<TableCell>
												<div className="flex flex-col gap-1">
													{product.oldPrice && (
														<span className="line-through text-green-500 text-[13px]">
															₹{product.oldPrice}
														</span>
													)}
													<span className="text-[#3872fa] font-[600] text-[13px]">
														₹{product.price}
													</span>
												</div>
											</TableCell>

											<TableCell>
												<div className="text-[14px] w-[100px]">
													{product.sale || 0}{" "}
													<span className="font-[600]">sale</span>
													<Progress value={product.sale} type="warning" />
												</div>
											</TableCell>

											<TableCell>
												<div className="flex items-center gap-2">
													<Tooltip title="Edit Product" placement="top">
														<Button
															className="!w-[35px] !h-[35px] !rounded-full bg-[#f1f1f1] border hover:bg-gray-100"
															onClick={() =>
																context.setIsOpenFullScreenPanel({
																	open: true,
																	model: "Edit Product",
																	id: product._id,
																})
															}
														>
															<AiOutlineEdit className="text-[18px]" />
														</Button>
													</Tooltip>

													<Link to={`/productDetails/${product._id}`}>
														<Tooltip
															title="View Product Detail"
															placement="top"
														>
															<Button className="!w-[35px] !h-[35px] !rounded-full bg-[#f1f1f1] border hover:bg-gray-100">
																<FaRegEye className="text-[18px]" />
															</Button>
														</Tooltip>
													</Link>

													<Tooltip title="Remove Product" placement="top">
														<Button
															className="!w-[35px] !h-[35px] !rounded-full bg-[#f1f1f1] border hover:bg-gray-100"
															onClick={() => {
																if (
																	window.confirm(
																		"Are you sure you want to delete this product?"
																	)
																) {
																	deleteProduct(product._id);
																}
															}}
														>
															<MdOutlineDelete className="text-[18px]" />
														</Button>
													</Tooltip>
												</div>
											</TableCell>
										</TableRow>
									))
							)}
						</TableBody>
					</Table>
				</TableContainer>

				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={products.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</div>

			{/* this is material ui table v2 */}

			{/* recent order table */}

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

			{/* recent order table */}

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
								activeDot={{ r: 8 }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>
		</>
	);
}

export default Dashboard;
