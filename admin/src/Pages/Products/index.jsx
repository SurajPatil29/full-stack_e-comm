// import { Button } from "@mui/material";
// import React, { useContext, useEffect } from "react";
// import { IoMdAdd } from "react-icons/io";

// import Checkbox from "@mui/material/Checkbox";
// import { Link } from "react-router-dom";
// import Progress from "../../Components/ProgressBar";
// import { AiOutlineEdit } from "react-icons/ai";
// import { FaRegEye } from "react-icons/fa";
// import { MdOutlineDelete } from "react-icons/md";
// import { Tooltip } from "@mui/material";

// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";

// // use for category
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import { PiExport } from "react-icons/pi";
// import { RiProductHuntLine } from "react-icons/ri";
// import SearchBox from "../../Components/SearchBox";
// import MyContext from "../../context/MyContext";
// import { fetchDataFromApi } from "../../utils/api";

// const label = { inputProps: { "aria-label": "Checkbox demo" } }; // this is talwind css table variable and also in mui

// // this is use for material ui table
// const columns = [
// 	{ id: "product", label: "PRODUCT", minWidth: 150 },
// 	{ id: "category", label: "CATEGORY", minWidth: 100 },
// 	{
// 		id: "subcategory",
// 		label: "SUB CATEGORY",
// 		minWidth: 150,
// 	},
// 	{
// 		id: "price",
// 		label: "PRICE",
// 		minWidth: 150,
// 	},
// 	{
// 		id: "sales",
// 		label: "SALES",
// 		minWidth: 150,
// 	},
// 	{
// 		id: "action",
// 		label: "ACTION",
// 		minWidth: 150,
// 	},
// ];

// // this is use for material ui table

// function Products() {
// 	const context = useContext(MyContext); //use globle context here

// 	// this for mui table functions
// 	const [page, setPage] = React.useState(0);
// 	const [rowsPerPage, setRowsPerPage] = React.useState(10);
// 	const [products, setProducts] = useState([]);
// 	const [selected, setSelected] = useState([]);

// 	useEffect(() => {
// 		fetchDataFromApi("/api/product/getAllProducts").then((res) => {
// 			if(res.success) setProducts(res.products)
// 		});
// 	}, []);

// 	const handleChangePage = (event, newPage) => {
// 		setPage(newPage);
// 	};

// 	const handleChangeRowsPerPage = (event) => {
// 		setRowsPerPage(+event.target.value);
// 		setPage(0);
// 	};
// 	// this for mui table functions

// 	const handleSelectAll = (event) => {
// 		if(event.target.checked){
// 			const allIds = products.map((p)=>p._id)
// 			setSelected(allIds)
// 		}else{
// 			setSelected([])
// 		}
// 	}

// 	const handleSelectOne = (id) =>{
// 		setSelected((prev)=>{
// 			prev.includes(id) ? prev.filter((x)=> x !== id) : [...prev, id]
// 		})
// 	}

// 	// this for use filters
// 	const [categoryFilterValue, setCategoryFilterValue] = React.useState("");

// 	const handleChangeCatFilter = (event) => {
// 		setCategoryFilterValue(event.target.value);
// 	};
// 	// this for use filters

// 	return (
// 		<>
// 			<div className="flex items-center justify-between px-2 py-0 ">
// 				<h2 className="text-[18px] font-[600] ">Products</h2>

// 				<div className="col w-[30%] ml-auto flex items-center justify-end gap-3 ">
// 					<Button className="btn-sm !bg-green-600 !text-white gap-2 flex items-center">
// 						{" "}
// 						<PiExport className="text-white text-[20px] " />
// 						Export
// 					</Button>
// 					<Button
// 						className="btn-blue btn-sm !text-white gap-2 flex items-center"
// 						onClick={() =>
// 							context.setIsOpenFullScreenPanel({
// 								open: true,
// 								model: "Add Product",
// 							})
// 						}
// 					>
// 						<RiProductHuntLine className="text-white text-[20px]   " />
// 						Add Product
// 					</Button>
// 				</div>
// 			</div>

// 			{/* this is material ui table v2 */}

// 			<div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white ">
// 				<div className="flex items-center w-full px-5 justify-between ">
// 					<div className="col w-[20%] ">
// 						<h4 className="font-[600] text-[13px] mb-2 ">Category by</h4>

// 						<Select
// 							className="w-full"
// 							size="small"
// 							labelId="demo-simple-select-helper-label"
// 							id="demo-simple-select-helper"
// 							value={categoryFilterValue}
// 							displayEmpty
// 							inputProps={{ "aria-label": "Without label" }}
// 							onChange={handleChangeCatFilter}
// 						>
// 							<MenuItem value="">
// 								<em>None</em>
// 							</MenuItem>
// 							<MenuItem value="Men">Men</MenuItem>
// 							<MenuItem value="Women">Women</MenuItem>
// 							<MenuItem value="Kids">Kids</MenuItem>
// 						</Select>
// 					</div>
// 					<div className="col w-[20%] ml-auto ">
// 						<SearchBox />
// 					</div>
// 				</div>
// 				<br />
// 				<TableContainer sx={{ maxHeight: 440 }}>
// 					<Table stickyHeader aria-label="sticky table">
// 						<TableHead className="!bg-gray-50">
// 							<TableRow className="">
// 								<TableCell style={{ minWidth: columns.minWidth }}>
// 									<Checkbox {...label} size="small" />
// 								</TableCell>
// 								{columns.map((column) => (
// 									<TableCell
// 										key={column.id}
// 										align={column.align}
// 										style={{ minWidth: column.minWidth }}
// 									>
// 										{column.label}
// 									</TableCell>
// 								))}
// 							</TableRow>
// 						</TableHead>
// 						<TableBody>
// 							<TableRow></TableRow>
// 							<TableRow>
// 								<TableCell style={{ minWidth: columns.minWidth }}>
// 									<Checkbox {...label} size="small" />
// 								</TableCell>
// 								<TableCell style={{ minWidth: columns.minWidth }}>
// 									<div className="w-[300px] flex items-center gap-4">
// 										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
// 											<Link to="/product/474557">
// 												<img
// 													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
// 													alt=""
// 													className="w-full group-hover:scale-105 transition-all "
// 												/>
// 											</Link>
// 										</div>
// 										<div className="info w-[75%] ">
// 											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
// 												<Link to="/product/474557">
// 													Buy Kalamkari Printed Red Kurta for Women{" "}
// 												</Link>
// 											</h3>
// 											<p className="text-[12px] ">Zara</p>
// 										</div>
// 									</div>
// 								</TableCell>
// 								<TableCell style={{ minWidth: columns.minWidth }}>
// 									Fation
// 								</TableCell>
// 								<TableCell style={{ minWidth: columns.minWidth }}>
// 									Women
// 								</TableCell>
// 								<TableCell style={{ minWidth: columns.minWidth }}>
// 									<div className="flex gap-1 flex-col ">
// 										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
// 											$58.00
// 										</span>
// 										<span className="price text-[#3872fa] text-[14px] font-[600] ">
// 											$50.00
// 										</span>
// 									</div>
// 								</TableCell>
// 								<TableCell style={{ minWidth: columns.minWidth }}>
// 									<div className="text-[14px] w-[100px]">
// 										234 <span className="font-[600]">sale</span>
// 										<Progress value={65} type="warning" />
// 									</div>
// 								</TableCell>

// 								<TableCell style={{ minWidth: columns.minWidth }}>
// 									{" "}
// 									<div className="flex items-center gap-2">
// 										<Tooltip title="Edit Product" placement="top">
// 											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
// 												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
// 											</Button>
// 										</Tooltip>

// 										<Tooltip title="View Product Detail" placement="top">
// 											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
// 												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
// 											</Button>
// 										</Tooltip>

// 										<Tooltip title="Remove Product" placement="top">
// 											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
// 												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
// 											</Button>
// 										</Tooltip>
// 									</div>
// 								</TableCell>
// 							</TableRow>
// 							<TableRow>
// 								<TableCell style={{ minWidth: columns.minWidth }}>
// 									<Checkbox {...label} size="small" />
// 								</TableCell>
// 								<TableCell style={{ minWidth: columns.minWidth }}>
// 									<div className="w-[300px] flex items-center gap-4">
// 										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
// 											<Link to="/product/474557">
// 												<img
// 													src="https://maybellindia.com/cdn/shop/files/3_9.jpg?v=1745048888"
// 													alt=""
// 													className="w-full group-hover:scale-105 transition-all "
// 												/>
// 											</Link>
// 										</div>
// 										<div className="info w-[75%] ">
// 											<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
// 												<Link to="/product/474557">
// 													Buy Kalamkari Printed Red Kurta for Women{" "}
// 												</Link>
// 											</h3>
// 											<p className="text-[12px] ">Zara</p>
// 										</div>
// 									</div>
// 								</TableCell>
// 								<TableCell style={{ minWidth: columns.minWidth }}>
// 									Fation
// 								</TableCell>
// 								<TableCell style={{ minWidth: columns.minWidth }}>
// 									Women
// 								</TableCell>
// 								<TableCell style={{ minWidth: columns.minWidth }}>
// 									<div className="flex gap-1 flex-col ">
// 										<span className="oldPrice line-through leading-3 text-green-500 text-[14px] font-[500] ">
// 											$58.00
// 										</span>
// 										<span className="price text-[#3872fa] text-[14px] font-[600] ">
// 											$50.00
// 										</span>
// 									</div>
// 								</TableCell>
// 								<TableCell style={{ minWidth: columns.minWidth }}>
// 									<div className="text-[14px] w-[100px]">
// 										234 <span className="font-[600]">sale</span>
// 										<Progress value={65} type="warning" />
// 									</div>
// 								</TableCell>

// 								<TableCell style={{ minWidth: columns.minWidth }}>
// 									{" "}
// 									<div className="flex items-center gap-2">
// 										<Tooltip title="Edit Product" placement="top">
// 											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
// 												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
// 											</Button>
// 										</Tooltip>

// 										<Tooltip title="View Product Detail" placement="top">
// 											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
// 												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
// 											</Button>
// 										</Tooltip>

// 										<Tooltip title="Remove Product" placement="top">
// 											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
// 												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
// 											</Button>
// 										</Tooltip>
// 									</div>
// 								</TableCell>
// 							</TableRow>
// 						</TableBody>
// 					</Table>
// 				</TableContainer>
// 				<TablePagination
// 					rowsPerPageOptions={[10, 25, 100]}
// 					component="div"
// 					count={10}
// 					rowsPerPage={rowsPerPage}
// 					page={page}
// 					onPageChange={handleChangePage}
// 					onRowsPerPageChange={handleChangeRowsPerPage}
// 				/>
// 			</div>

// 			{/* this is material ui table v2 */}
// 		</>
// 	);
// }

// export default Products;

// import { Button, Checkbox, MenuItem, Select, Tooltip } from "@mui/material";
// import React, { useContext, useEffect, useState } from "react";
// import { IoMdAdd } from "react-icons/io";
// import { AiOutlineEdit } from "react-icons/ai";
// import { FaRegEye } from "react-icons/fa";
// import { MdOutlineDelete } from "react-icons/md";
// import { PiExport } from "react-icons/pi";
// import { RiProductHuntLine } from "react-icons/ri";
// import { Link } from "react-router-dom";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import MyContext from "../../context/MyContext";
// import SearchBox from "../../Components/SearchBox";
// import Progress from "../../Components/ProgressBar";
// import { deleteData, deleteMultiple, fetchDataFromApi } from "../../utils/api";

// const label = { inputProps: { "aria-label": "Checkbox demo" } };

// const columns = [
// 	{ id: "product", label: "PRODUCT", minWidth: 150 },
// 	{ id: "category", label: "CATEGORY", minWidth: 100 },
// 	{ id: "subcategory", label: "SUB CATEGORY", minWidth: 150 },
// 	{ id: "price", label: "PRICE", minWidth: 150 },
// 	{ id: "sales", label: "SALES", minWidth: 150 },
// 	{ id: "action", label: "ACTION", minWidth: 150 },
// ];

// function Products() {
// 	const context = useContext(MyContext);

// 	const [page, setPage] = useState(0);
// 	const [rowsPerPage, setRowsPerPage] = useState(10);
// 	const [products, setProducts] = useState([]);
// 	const [selected, setSelected] = useState([]);

// 	// Fetch products from API
// 	const getAllProducts = () => {
// 		fetchDataFromApi("/api/product/getAllProducts").then((res) => {
// 			if (res.success) setProducts(res.products);
// 		});
// 	};
// 	useEffect(() => {
// 		getAllProducts();
// 	}, []);

// 	// Handle pagination
// 	const handleChangePage = (event, newPage) => setPage(newPage);
// 	const handleChangeRowsPerPage = (event) => {
// 		setRowsPerPage(+event.target.value);
// 		setPage(0);
// 	};

// 	// Handle checkbox selection
// 	const handleSelectAll = (event) => {
// 		if (event.target.checked) {
// 			const allIds = products.map((p) => p._id);
// 			setSelected(allIds);
// 		} else {
// 			setSelected([]);
// 		}
// 	};

// 	const handleSelectOne = (id) => {
// 		setSelected((prev) =>
// 			prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
// 		);
// 	};

// 	const deleteProduct = async (id) => {
// 		try {
// 			const response = await deleteData(`/api/product/${id}`);
// 			console.log("Product deleted successfully:", response);
// 			setProducts((prevProducts) =>
// 				prevProducts.filter((product) => product._id !== id)
// 			);

// 			// Optional: refresh the product list or show success toast
// 		} catch (error) {
// 			console.error("Error deleting product:", error);
// 			// Optional: show error toast
// 		}
// 	};

// 	const deleteMultipleProducts = () => {
// 		try {
// 			deleteMultiple(`/api/product/deleteMultiple`, {
// 				ids: selected,
// 			}).then((res) => {
// 				if (res.success) {
// 					setProducts((prev) => prev.filter((p) => !selected.includes(p._id)));
// 					context.openAlertBox("success", "Products deleted");
// 				}
// 			});
// 		} catch (error) {
// 			context.openAlertBox("error", "Error deleting items");
// 		}
// 	};

// 	// For category filter (if needed)
// 	const [categoryFilterValue, setCategoryFilterValue] = useState("");
// 	const handleChangeCatFilter = (event) =>
// 		setCategoryFilterValue(event.target.value);

// 	return (
// 		<>
// 			<div className="flex items-center justify-between px-2 py-0 ">
// 				<h2 className="text-[18px] font-[600] ">Products</h2>

// 				<div className="col w-[50%] ml-auto flex items-center justify-end gap-3 ">
// 					{selected.length > 0 && (
// 						<Button
// 							className="btn-sm !bg-red-600 !text-white gap-2 flex items-center"
// 							onClick={deleteMultipleProducts}
// 						>
// 							<MdOutlineDelete className="text-white text-[20px]" />
// 							Delete
// 						</Button>
// 					)}

// 					<Button className="btn-sm !bg-green-600 !text-white gap-2 flex items-center">
// 						<PiExport className="text-white text-[20px]" />
// 						Export
// 					</Button>
// 					<Button
// 						className="btn-blue btn-sm !text-white gap-2 flex items-center"
// 						onClick={() =>
// 							context.setIsOpenFullScreenPanel({
// 								open: true,
// 								model: "Add Product",
// 							})
// 						}
// 					>
// 						<RiProductHuntLine className="text-white text-[20px]" />
// 						Add Product
// 					</Button>
// 				</div>
// 			</div>

// 			<div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
// 				<div className="flex items-center w-full px-5 justify-between ">
// 					<div className="flex items-center gap-5 w-full">
// 						<div className="col w-[15%] ">
// 							<h4 className="font-[600] text-[13px] mb-2 ">Category by</h4>

// 							<Select
// 								className="w-full"
// 								size="small"
// 								value={categoryFilterValue}
// 								displayEmpty
// 								onChange={handleChangeCatFilter}
// 							>
// 								<MenuItem value="">
// 									<em>None</em>
// 								</MenuItem>
// 								<MenuItem value="Men">Men</MenuItem>
// 								<MenuItem value="Women">Women</MenuItem>
// 								<MenuItem value="Kids">Kids</MenuItem>
// 							</Select>
// 						</div>
// 						<div className="col w-[15%] ">
// 							<h4 className="font-[600] text-[13px] mb-2 ">Sub Category by</h4>

// 							<Select
// 								className="w-full"
// 								size="small"
// 								value={categoryFilterValue}
// 								displayEmpty
// 								onChange={handleChangeCatFilter}
// 							>
// 								<MenuItem value="">
// 									<em>None</em>
// 								</MenuItem>
// 								<MenuItem value="Men">Men</MenuItem>
// 								<MenuItem value="Women">Women</MenuItem>
// 								<MenuItem value="Kids">Kids</MenuItem>
// 							</Select>
// 						</div>
// 						<div className="col w-[15%] ">
// 							<h4 className="font-[600] text-[13px] mb-2 ">
// 								Third Level Category by
// 							</h4>

// 							<Select
// 								className="w-full"
// 								size="small"
// 								value={categoryFilterValue}
// 								displayEmpty
// 								onChange={handleChangeCatFilter}
// 							>
// 								<MenuItem value="">
// 									<em>None</em>
// 								</MenuItem>
// 								<MenuItem value="Men">Men</MenuItem>
// 								<MenuItem value="Women">Women</MenuItem>
// 								<MenuItem value="Kids">Kids</MenuItem>
// 							</Select>
// 						</div>
// 					</div>

// 					<div className="col w-[20%] ml-auto ">
// 						<SearchBox />
// 					</div>
// 				</div>
// 				<br />

// 				<TableContainer sx={{ maxHeight: 440 }}>
// 					<Table stickyHeader aria-label="sticky table">
// 						<TableHead>
// 							<TableRow>
// 								<TableCell>
// 									<Checkbox
// 										checked={
// 											selected.length === products.length && products.length > 0
// 										}
// 										onChange={handleSelectAll}
// 										size="small"
// 									/>
// 								</TableCell>
// 								{columns.map((column) => (
// 									<TableCell key={column.id}>{column.label}</TableCell>
// 								))}
// 							</TableRow>
// 						</TableHead>

// 						<TableBody>
// 							{products
// 								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
// 								.map((product) => (
// 									<TableRow key={product._id} hover>
// 										<TableCell>
// 											<Checkbox
// 												size="small"
// 												checked={selected.includes(product._id)}
// 												onChange={() => handleSelectOne(product._id)}
// 											/>
// 										</TableCell>

// 										{/* PRODUCT COLUMN */}
// 										<TableCell>
// 											<div className="flex items-center gap-4">
// 												<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
// 													<Link to={`/product/${product._id}`}>
// 														<img
// 															src={
// 																product.images?.[0] ||
// 																"https://via.placeholder.com/65"
// 															}
// 															alt={product.name}
// 															className="w-full h-full object-cover group-hover:scale-105 transition-all"
// 														/>
// 													</Link>
// 												</div>
// 												<div>
// 													<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa]">
// 														<Link to={`/product/${product._id}`}>
// 															{product.name}
// 														</Link>
// 													</h3>
// 													<p className="text-[12px]">{product.brand}</p>
// 												</div>
// 											</div>
// 										</TableCell>

// 										{/* CATEGORY */}
// 										<TableCell>{product.catName || "—"}</TableCell>

// 										{/* SUBCATEGORY */}
// 										<TableCell>{product.subCat || "—"}</TableCell>

// 										{/* PRICE */}
// 										<TableCell>
// 											<div className="flex flex-col gap-1">
// 												{product.oldPrice && (
// 													<span className="line-through text-green-500 text-[13px]">
// 														₹{product.oldPrice}
// 													</span>
// 												)}
// 												<span className="text-[#3872fa] font-[600] text-[13px]">
// 													₹{product.price}
// 												</span>
// 											</div>
// 										</TableCell>

// 										{/* SALES */}
// 										<TableCell>
// 											<div className="text-[14px] w-[100px]">
// 												{product.sale || 0}{" "}
// 												<span className="font-[600]">sale</span>
// 												<Progress value={product.sale} type="warning" />
// 											</div>
// 										</TableCell>

// 										{/* ACTIONS */}
// 										<TableCell>
// 											<div className="flex items-center gap-2">
// 												<Tooltip title="Edit Product" placement="top">
// 													<Button
// 														className="!w-[35px] !h-[35px] !rounded-full bg-[#f1f1f1] border hover:bg-gray-100"
// 														onClick={() =>
// 															context.setIsOpenFullScreenPanel({
// 																open: true,
// 																model: "Edit Product",
// 																id: product._id,
// 															})
// 														}
// 													>
// 														<AiOutlineEdit className="text-[18px]" />
// 													</Button>
// 												</Tooltip>

// 												<Tooltip title="View Product Detail" placement="top">
// 													<Button className="!w-[35px] !h-[35px] !rounded-full bg-[#f1f1f1] border hover:bg-gray-100">
// 														<FaRegEye className="text-[18px]" />
// 													</Button>
// 												</Tooltip>

// 												<Tooltip title="Remove Product" placement="top">
// 													<Button
// 														className="!w-[35px] !h-[35px] !rounded-full bg-[#f1f1f1] border hover:bg-gray-100"
// 														onClick={() => {
// 															if (
// 																window.confirm(
// 																	"Are you sure you want to delete this product?"
// 																)
// 															) {
// 																deleteProduct(product._id);
// 															}
// 														}}
// 													>
// 														<MdOutlineDelete className="text-[18px]" />
// 													</Button>
// 												</Tooltip>
// 											</div>
// 										</TableCell>
// 									</TableRow>
// 								))}
// 						</TableBody>
// 					</Table>
// 				</TableContainer>

// 				<TablePagination
// 					rowsPerPageOptions={[10, 25, 100]}
// 					component="div"
// 					count={products.length}
// 					rowsPerPage={rowsPerPage}
// 					page={page}
// 					onPageChange={handleChangePage}
// 					onRowsPerPageChange={handleChangeRowsPerPage}
// 				/>
// 			</div>
// 		</>
// 	);
// }

// export default Products;

import {
	Button,
	Checkbox,
	CircularProgress,
	MenuItem,
	Select,
	Tooltip,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import { RiImageAddLine } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { PiExport } from "react-icons/pi";
import { RiProductHuntLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import MyContext from "../../context/MyContext";
import SearchBox from "../../Components/SearchBox";
import Progress from "../../Components/ProgressBar";
import { deleteData, deleteMultiple, fetchDataFromApi } from "../../utils/api";

const columns = [
	{ id: "product", label: "PRODUCT", minWidth: 150 },
	{ id: "category", label: "CATEGORY", minWidth: 100 },
	{ id: "subcategory", label: "SUB CATEGORY", minWidth: 150 },
	{ id: "price", label: "PRICE", minWidth: 150 },
	{ id: "sales", label: "SALES", minWidth: 150 },
	{ id: "addBanner", label: "Add Banner", minWidth: 150 },

	{ id: "action", label: "ACTION", minWidth: 150 },
];

function Products() {
	const context = useContext(MyContext);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [products, setProducts] = useState([]);
	const [selected, setSelected] = useState([]);
	const [loading, setLoading] = useState(false);

	// ========================= CATEGORY FILTER STATES =========================
	const [catData, setCatData] = useState([]);
	const [subCatData, setSubCatData] = useState([]);
	const [thirdCatData, setThirdCatData] = useState([]);

	const [categoryValue, setCategoryValue] = useState("");
	const [subCategoryValue, setSubCategoryValue] = useState("");
	const [thirdCategoryValue, setThirdCategoryValue] = useState("");

	// ========================= FETCH CATEGORY DATA =========================
	const getCategoryData = async () => {
		try {
			setLoading(true);
			const res = await fetchDataFromApi("/api/category/categories");

			setTimeout(() => {
				setCatData(res.data || []);
				setLoading(false); // ✅ move inside timeout
			}, 1000);
		} catch (error) {
			context.openAlertBox("error", "Failed to fetch categories");
			setLoading(false); // ✅ ensure fallback in case of error
		}
	};

	// Fetch products dynamically based on selection
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
			}, 1000);
		} catch (error) {
			console.log(error);
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

	// ========================= HANDLE CATEGORY CHANGES =========================
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

	const handleChangeThirdCategory = (e) => {
		const selectedThirdId = e.target.value;
		setThirdCategoryValue(selectedThirdId);
	};

	// ========================= FETCH PRODUCTS =========================
	const getAllProducts = () => {
		try {
			setLoading(true);
			fetchDataFromApi("/api/product/getAllProducts").then((res) => {
				setTimeout(() => {
					if (res.success) setProducts(res.products);
					setLoading(false);
				}, 1000);
			});
		} catch (error) {
			console.log(error);
			context.openAlertBox("error", "Failed to fetch products");
			setLoading(false);
		}
	};
	// useEffect(() => {
	// 	getAllProducts();
	// }, []);

	// ========================= TABLE + DELETE HANDLERS =========================
	const handleChangePage = (event, newPage) => setPage(newPage);
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const handleSelectAll = (event) => {
		if (event.target.checked) {
			const allIds = products.map((p) => p._id);
			setSelected(allIds);
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
			const response = await deleteData(`/api/product/${id}`);
			setTimeout(() => {
				setProducts((prevProducts) =>
					prevProducts.filter((product) => product._id !== id)
				);
				setLoading(false);
			}, 1000);
		} catch (error) {
			console.error("Error deleting product:", error);
			setLoading(false);
		}
	};

	const deleteMultipleProducts = () => {
		try {
			setLoading(true);
			deleteMultiple(`/api/product/deleteMultiple`, { ids: selected }).then(
				(res) => {
					if (res.success) {
						setTimeout(() => {
							setProducts((prev) =>
								prev.filter((p) => !selected.includes(p._id))
							);
							context.openAlertBox("success", "Products deleted");
							setLoading(false);
						}, 1000);
					}
				}
			);
		} catch (error) {
			console.log(error);
			context.openAlertBox("error", "Error deleting items");
			setLoading(false);
		}
	};

	return (
		<>
			<div className="flex items-center justify-between px-2 py-0 ">
				<h2 className="text-[18px] font-[600] ">Products</h2>

				<div className="col w-[50%] ml-auto flex items-center justify-end gap-3 ">
					{selected.length > 0 && (
						<Button
							className="btn-sm !bg-red-600 !text-white gap-2 flex items-center"
							onClick={deleteMultipleProducts}
						>
							<MdOutlineDelete className="text-white text-[20px]" />
							Delete
						</Button>
					)}

					<Button className="btn-sm !bg-green-600 !text-white gap-2 flex items-center">
						<PiExport className="text-white text-[20px]" />
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
						<RiProductHuntLine className="text-white text-[20px]" />
						Add Product
					</Button>
				</div>
			</div>

			{/* ========================= FILTER BAR ========================= */}
			<div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
				<div className="flex items-center w-full px-5 justify-between ">
					<div className="flex items-center gap-5 w-full">
						{/* MAIN CATEGORY */}
						<div className="col w-[15%]">
							<h4 className="font-[600] text-[13px] mb-2">Category by</h4>
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
							<h4 className="font-[600] text-[13px] mb-2">Sub Category by</h4>
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

						{/* THIRD LEVEL CATEGORY */}
						<div className="col w-[15%]">
							<h4 className="font-[600] text-[13px] mb-2">
								Third Level Category by
							</h4>
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

					<div className="col w-[20%] ml-auto ">
						<SearchBox />
					</div>
				</div>

				{/* ========================= TABLE ========================= */}
				<br />
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
							{/* ✅ Show loading spinner while fetching */}
							{console.log(loading)}
							{loading ? (
								<TableRow>
									<TableCell colSpan={8}>
										<div className="flex items-center justify-center w-full min-h-[400px]">
											<CircularProgress color="inherit" />
										</div>
									</TableCell>
								</TableRow>
							) : products.length === 0 ? (
								// ✅ Show “No products found” when empty
								<TableRow>
									<TableCell colSpan={8}>
										<div className="flex items-center justify-center w-full min-h-[400px] text-gray-500 font-medium">
											No products found
										</div>
									</TableCell>
								</TableRow>
							) : (
								// ✅ Show product rows when data is available
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
													<Tooltip title="Add BannerV1" placement="top">
														<Button
															className="!w-[35px] !h-[35px] !rounded-full bg-[#f1f1f1] border hover:bg-gray-100"
															onClick={() =>
																context.setIsOpenFullScreenPanel({
																	open: true,
																	model: "Add Home Slide",
																	id: product._id,
																})
															}
														>
															<RiImageAddLine className="text-[18px]" />
														</Button>
													</Tooltip>
													<Tooltip title="Add BannerV2" placement="top">
														<Button
															className="!w-[35px] !h-[35px] !rounded-full bg-[#f1f1f1] border hover:bg-gray-100"
															onClick={() =>
																context.setIsOpenFullScreenPanel({
																	open: true,
																	model: "Add BannerV2",
																	id: product._id,
																})
															}
														>
															<RiImageAddLine className="text-[18px]" />
														</Button>
													</Tooltip>
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
		</>
	);
}

export default Products;
