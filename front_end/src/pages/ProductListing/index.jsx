import Sidebar from "../../componants/Sidebar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ProductItem from "../../componants/ProductItem";
import { Button } from "@mui/material";
import { IoGrid } from "react-icons/io5";
import { FaListUl } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useContext, useEffect, useState } from "react";
import ProductItemListView from "../../componants/ProductItemListView";
import Pagination from "@mui/material/Pagination";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import ProductItemSkeleton from "../../componants/ProductItem/ProductItemSkeleton";
import ProductItemListSkeleton from "../../componants/ProductItemListView/ProductItemListSkeleton";
import MyContext from "../../context/MyContext";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

function ProductListing() {
	const [itemView, setItemView] = useState("grid");
	const [anchorEl, setAnchorEl] = useState(null);
	const { type, id } = useParams();
	const [productsData, setProductsData] = useState([]);
	const [originalProducts, setOriginalProducts] = useState([]);
	const [sortType, setSortType] = useState("relevance");
	const [isLoading, setIsLoading] = useState(false);

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

	useEffect(() => {
		const handleResize = () => {
			const mobile = window.innerWidth < 640;
			setIsMobile(mobile);

			// 🔒 Force grid view on mobile
			if (mobile) {
				setItemView("grid");
			}
		};

		handleResize(); // run on mount
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const context = useContext(MyContext);

	const findCategoryNameById = (categories, id) => {
		for (let cat of categories) {
			// 1️⃣ Match at current level
			if (cat._id === id) return cat.name;

			// 2️⃣ Search inside children (if exists)
			if (cat.children && cat.children.length > 0) {
				const result = findCategoryNameById(cat.children, id);
				if (result) return result;
			}
		}

		return null; // not found
	};

	const catName = findCategoryNameById(context.catData, id);

	// GLOBAL LOADER FUNCTION
	const showLoader = (callback) => {
		setIsLoading(true);
		setTimeout(() => {
			callback();
			setIsLoading(false);
		}, 1000);
	};

	const open = Boolean(anchorEl);
	const handleClick = (event) => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);

	const handleSort = (type) => {
		setSortType(type);

		showLoader(() => {
			let sorted = [...productsData];

			switch (type) {
				case "sales-high-low":
					sorted.sort((a, b) => b.sale - a.sale);
					break;
				case "relevance":
					sorted = [...originalProducts];
					break;
				case "name-a-z":
					sorted.sort((a, b) => a.name.localeCompare(b.name));
					break;
				case "name-z-a":
					sorted.sort((a, b) => b.name.localeCompare(a.name));
					break;
				case "price-low-high":
					sorted.sort((a, b) => a.price - b.price);
					break;
				case "price-high-low":
					sorted.sort((a, b) => b.price - a.price);
					break;
				default:
					break;
			}

			setProductsData(sorted);
		});

		handleClose();
	};

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setIsLoading(true);
				let apiUrl = "";

				if (type === "cat") {
					apiUrl = `/api/product/getAllProductsByCatId/${id}`;
				} else if (type === "sub") {
					apiUrl = `/api/product/getAllProductsBySubCatId/${id}`;
				} else if (type === "third") {
					apiUrl = `/api/product/getAllProductsByThirdLevelCatId/${id}`;
				}

				const res = await fetchDataFromApi(apiUrl);

				if (res?.success) {
					setOriginalProducts(res.products);
					setProductsData(res.products);

					setTimeout(() => setIsLoading(false), 1000);
				}
			} catch (error) {
				console.error("Error fetching products", error);
				setTimeout(() => setIsLoading(false), 800);
			}
		};

		fetchProducts();
		window.scrollTo(0, 0);
	}, [id]);

	// PAGINATION
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 8;

	const totalPages = Math.ceil(productsData.length / itemsPerPage);
	const indexOfLast = currentPage * itemsPerPage;
	const indexOfFirst = indexOfLast - itemsPerPage;
	const currentProducts = productsData.slice(indexOfFirst, indexOfLast);

	const handlePageChange = (event, page) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};
	return (
		<section className="">
			<div className="container py-5 flex items-center gap-3">
				<button
					onClick={() => setIsSidebarOpen(true)}
					className="lg:hidden text-[22px] p-2 rounded-md border border-[rgb(0,0,0,0.4)] "
				>
					<HiOutlineMenuAlt2 />
				</button>
				<Breadcrumbs aria-label="breadcrumb">
					<Link
						underline="hover"
						color="inherit"
						href="/"
						className="link transition !text[14px]"
					>
						Home
					</Link>
					<Link
						underline="hover"
						color="inherit"
						href="/"
						className="link transition !text[14px]"
					>
						{catName}
					</Link>
				</Breadcrumbs>
			</div>
			<div className="bg-white p-2 ">
				<div className="container flex gap-3 relative">
					<div className="sidebarWrapper hidden lg:block  flex-shrink-0 w-[20%]  h-full bg-white ">
						<Sidebar
							data={productsData}
							originalData={originalProducts}
							catId={id}
							setProductsData={setProductsData}
							showLoader={showLoader} // FIXED 🔥 passed here
						/>
					</div>

					{/* Overlay Background */}
					<div
						className={`fixed inset-0 bg-black/40 z-40 transition-opacity lg:hidden  ${
							isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
						}`}
						onClick={() => setIsSidebarOpen(false)}
					/>

					{/* Sidebar Drawer */}
					<div
						className={`fixed top-0 left-0 h-full p-4 w-[280px] bg-white z-50 transform transition-transform lg:hidden ${
							isSidebarOpen ? "translate-x-0" : "-translate-x-full"
						}`}
					>
						<div className="p-3 border-b flex justify-between items-center">
							<h3 className="font-[600]">Filters</h3>
							<button onClick={() => setIsSidebarOpen(false)}>✕</button>
						</div>

						<div className="px-4">
							<Sidebar
								data={productsData}
								originalData={originalProducts}
								catId={id}
								setProductsData={setProductsData}
								showLoader={showLoader}
							/>
						</div>
					</div>

					<div className="rightContent flex-grow w-80% py-3">
						<div className="bg-[#f1f1f1] p-2 w-full mb-3 rounded-md flex  gap-3 flex-row items-center justify-between ">
							<div className="col1 flex flex-wrap items-center gap-3 itemViewAction">
								<div className=" hidden sm:flex items-center gap-2">
									<Button
										onClick={() => showLoader(() => setItemView("list"))}
										className={`hidden sm:block !w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] ${
											itemView === "list" && "active"
										}`}
									>
										<FaListUl className="!text-[rgba(0,0,0,0.7)] " />
									</Button>

									<Button
										onClick={() => showLoader(() => setItemView("grid"))}
										className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] ${
											itemView === "grid" && "active"
										}`}
									>
										<IoGrid className="!text-[rgba(0,0,0,0.7)] " />
									</Button>
								</div>
								<span className="text-[14px] font-[500]  text-[rgba(0,0,0,0.7)] ">
									There are{" "}
									<span className="text-[#ff5151] ">{productsData.length}</span>{" "}
									products
								</span>
							</div>
							<div className="flex items-center gap-2 sm:gap-3 sm:justify-start">
								<span className="text-[13px] sm:text-[14px] font-[500] text-[rgba(0,0,0,0.7)]">
									Sort by :
								</span>
								<Button
									id="basic-button"
									aria-controls={open ? "basic-menu" : undefined}
									aria-haspopup="true"
									aria-expanded={open ? "true" : undefined}
									onClick={handleClick}
									className="!bg-white !text-[12px] !text-[rgba(0,0,0,0.7)] !capitalize !border-2 !border-black !px-3"
								>
									Dashboard
								</Button>
								<Menu
									id="basic-menu"
									anchorEl={anchorEl}
									open={open}
									onClose={handleClose}
									MenuListProps={{
										"aria-labelledby": "basic-button",
									}}
								>
									<MenuItem
										onClick={() => handleSort("sales-high-low")}
										className=" !text-[13px] !text-[rgba(0,0,0,0.7)] !capitalize "
									>
										Sales, highest to lowest
									</MenuItem>

									<MenuItem
										onClick={() => handleSort("relevance")}
										className=" !text-[13px] !text-[rgba(0,0,0,0.7)] !capitalize "
									>
										Relevance
									</MenuItem>

									<MenuItem
										onClick={() => handleSort("name-a-z")}
										className=" !text-[13px] !text-[rgba(0,0,0,0.7)] !capitalize "
									>
										Name, A to Z
									</MenuItem>

									<MenuItem
										onClick={() => handleSort("name-z-a")}
										className=" !text-[13px] !text-[rgba(0,0,0,0.7)] !capitalize "
									>
										Name, Z to A
									</MenuItem>

									<MenuItem
										onClick={() => handleSort("price-low-high")}
										className=" !text-[13px] !text-[rgba(0,0,0,0.7)] !capitalize "
									>
										Price Low to High
									</MenuItem>

									<MenuItem
										onClick={() => handleSort("price-high-low")}
										className=" !text-[13px] !text-[rgba(0,0,0,0.7)] !capitalize "
									>
										Price High to Low
									</MenuItem>
								</Menu>
							</div>
						</div>
						<div
							className={`grid gap-4 ${
								itemView === "grid"
									? "grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
									: "grid-cols-1 md:grid-cols-2"
							}`}
						>
							{itemView === "grid" ? (
								<>
									{/* 1️⃣ Show skeleton when loading */}
									{isLoading ? (
										Array.from({ length: 8 }).map((_, i) => (
											<ProductItemSkeleton key={i} />
										))
									) : currentProducts.length === 0 ? (
										/* 2️⃣ Fallback if no product found */
										<div className="col-span-full text-center py-10">
											<h2 className="text-gray-600 text-[18px] font-medium">
												No products available in this category.
											</h2>
										</div>
									) : (
										/* 3️⃣ Show products */
										currentProducts.map((product) => (
											<ProductItem item={product} key={product._id} />
										))
									)}
								</>
							) : (
								<>
									{/* LIST VIEW */}
									{isLoading ? (
										Array.from({ length: 8 }).map((_, i) => (
											<ProductItemListSkeleton key={i} />
										))
									) : currentProducts.length === 0 ? (
										<div className="w-full text-center py-10">
											<h2 className="text-gray-600 text-[18px] font-medium">
												No products available in this category.
											</h2>
										</div>
									) : (
										currentProducts.map((product) => (
											<ProductItemListView item={product} key={product._id} />
										))
									)}
								</>
							)}
						</div>
						<div className="flex items-center justify-center mt-8 sm:mt-10">
							<Pagination
								count={totalPages}
								page={currentPage}
								onChange={handlePageChange}
								shape="rounded"
								showFirstButton
								showLastButton
								size="small"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
export default ProductListing;
