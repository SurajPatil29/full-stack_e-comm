import { Button } from "@mui/material";
import React, { useContext } from "react";
import { IoMdAdd } from "react-icons/io";

import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Progress from "../../Components/ProgressBar";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { Tooltip } from "@mui/material";

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
import { RiProductHuntLine } from "react-icons/ri";
import SearchBox from "../../Components/SearchBox";
import { MyContext } from "../../App";

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

function Products() {
	const context = useContext(MyContext); //use globle context here

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

	//
	return (
		<>
			<div className="flex items-center justify-between px-2 py-0 ">
				<h2 className="text-[18px] font-[600] ">Products</h2>

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
						<RiProductHuntLine className="text-white text-[20px]   " />
						Add Product
					</Button>
				</div>
			</div>

			{/* this is material ui table v2 */}

			<div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white ">
				<div className="flex items-center w-full px-5 justify-between ">
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
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value="Men">Men</MenuItem>
							<MenuItem value="Women">Women</MenuItem>
							<MenuItem value="Kids">Kids</MenuItem>
						</Select>
					</div>
					<div className="col w-[20%] ml-auto ">
						<SearchBox />
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
		</>
	);
}

export default Products;
