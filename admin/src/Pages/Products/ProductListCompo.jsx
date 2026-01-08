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

/* ===================== SKELETON ROW ===================== */
const ProductRowSkeleton = () => (
	<TableRow className="animate-pulse">
		<TableCell>
			<div className="h-4 w-4 bg-gray-200 rounded" />
		</TableCell>

		{/* PRODUCT */}
		<TableCell>
			<div className="flex gap-4 items-center">
				<div className="w-[65px] h-[65px] bg-gray-200 rounded-md" />
				<div className="space-y-2">
					<div className="h-3 w-32 bg-gray-200 rounded" />
					<div className="h-3 w-20 bg-gray-200 rounded" />
				</div>
			</div>
		</TableCell>

		{Array.from({ length: 5 }).map((_, i) => (
			<TableCell key={i}>
				<div className="h-3 w-20 bg-gray-200 rounded" />
			</TableCell>
		))}
	</TableRow>
);

function ProductListCompo() {
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

	const [searchQuery, setSearchQuery] = useState("");

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

	const filteredProducts = products.filter((product) => {
		const query = searchQuery.toLowerCase();

		return (
			product?.name?.toLowerCase().includes(query) ||
			product?.brand?.toLowerCase().includes(query)
		);
	});

	return (
		<div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
			<div className="flex items-center justify-between px-4">
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
			<div className="flex flex-col lg:flex-row w-full px-5 gap-4 lg:gap-0">
				<div className="flex flex-col sm:flex-row gap-4 w-full">
					{/* MAIN CATEGORY */}
					<div className="w-full sm:w-1/2 lg:w-[20%]">
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
					<div className="w-full sm:w-1/2 lg:w-[20%]">
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
					<div className="w-full sm:w-1/2 lg:w-[20%]">
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

				<div className="w-full sm:w-1/2 lg:w-[20%] lg:ml-auto ">
					<SearchBox
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						setPageOrder={setPage}
					/>
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
						{/* {console.log(loading)} */}
						{loading ? (
							Array.from({ length: rowsPerPage }).map((_, i) => (
								<ProductRowSkeleton key={i} />
							))
						) : filteredProducts.length === 0 ? (
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
							filteredProducts
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
													<Link to={`/productDetails/${product._id}`}>
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
														<Link to={`/productDetails/${product._id}`}>
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
											{(() => {
												const sold = product.sale || 0;
												const inStock = product.countInStock || 0;
												const totalStock = sold + inStock;

												const salePercent =
													totalStock > 0
														? Math.round((sold / totalStock) * 100)
														: 0;

												return (
													<div className="text-[14px] w-[120px]">
														<div className="flex justify-between text-[12px]">
															<span>
																{sold} <span className="font-[600]">sold</span>
															</span>
															<span className="opacity-60">
																{totalStock} total
															</span>
														</div>

														<Progress value={salePercent} type="warning" />
													</div>
												);
											})()}
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
													<Tooltip title="View Product Detail" placement="top">
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
				count={filteredProducts.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</div>
	);
}

export default ProductListCompo;
