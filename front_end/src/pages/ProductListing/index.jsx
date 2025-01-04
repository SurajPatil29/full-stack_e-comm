import Sidebar from "../../componants/Sidebar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ProductItem from "../../componants/ProductItem";
import { Button } from "@mui/material";
import { IoGrid } from "react-icons/io5";
import { FaListUl } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import ProductItemListView from "../../componants/ProductItemListView";
import Pagination from "@mui/material/Pagination";

function ProductListing() {
	const [itemView, setItemView] = useState("grid");
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<section className="">
			<div className="container py-5">
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
						Fashion
					</Link>
				</Breadcrumbs>
			</div>
			<div className="bg-white p-2 ">
				<div className="container flex gap-3">
					<div className="sidebarWrapper flex-shrink-0 w-[20%] h-full bg-white ">
						<Sidebar />
					</div>

					<div className="rightContent flex-grow w-80% py-3">
						<div className="bg-[#f1f1f1] p-2 w-full mb-3 rounded-md flex items-center justify-between ">
							<div className="col1 flex items-center gap-3 itemViewAction">
								<Button
									onClick={() => setItemView("list")}
									className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] ${
										itemView === "list" && "active"
									}`}
								>
									<FaListUl className="!text-[rgba(0,0,0,0.7)] " />
								</Button>
								<Button
									onClick={() => setItemView("grid")}
									className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] ${
										itemView === "grid" && "active"
									}`}
								>
									<IoGrid className="!text-[rgba(0,0,0,0.7)] " />
								</Button>
								<span className="text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)] ">
									There are 27 products
								</span>
							</div>
							<div className="col2 ml-auto flex items-center justify-end gap-3 pr-3">
								<span className="text-[14px] font-[500] text-[rgba(0,0,0,0.7)] ">
									Sort by :
								</span>
								<Button
									id="basic-button"
									aria-controls={open ? "basic-menu" : undefined}
									aria-haspopup="true"
									aria-expanded={open ? "true" : undefined}
									onClick={handleClick}
									className="!bg-white !text-[12px] !text-[rgba(0,0,0,0.7)] !capitalize !border-2 !border-black"
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
										onClick={handleClose}
										className=" !text-[13px] !text-[rgba(0,0,0,0.7)] !capitalize "
									>
										Sales, highest to lowest
									</MenuItem>
									<MenuItem
										onClick={handleClose}
										className=" !text-[13px] !text-[rgba(0,0,0,0.7)] !capitalize "
									>
										Relevance
									</MenuItem>
									<MenuItem
										onClick={handleClose}
										className=" !text-[13px] !text-[rgba(0,0,0,0.7)] !capitalize "
									>
										Name, A to Z
									</MenuItem>
									<MenuItem
										onClick={handleClose}
										className=" !text-[13px] !text-[rgba(0,0,0,0.7)] !capitalize "
									>
										Name, Zto A
									</MenuItem>
									<MenuItem
										onClick={handleClose}
										className=" !text-[13px] !text-[rgba(0,0,0,0.7)] !capitalize "
									>
										Price Low to High
									</MenuItem>
									<MenuItem
										onClick={handleClose}
										className=" !text-[13px] !text-[rgba(0,0,0,0.7)] !capitalize "
									>
										Price, High to Low
									</MenuItem>
								</Menu>
							</div>
						</div>
						<div
							className={`grid ${
								itemView === "grid"
									? "grid-cols-4 md:grid-cols-4"
									: "grid-cols-1 md:grid-cols-1"
							}  gap-4`}
						>
							{itemView === "grid" ? (
								<>
									<ProductItem />
									<ProductItem />
									<ProductItem />
									<ProductItem />
									<ProductItem />
									<ProductItem />
									<ProductItem />
									<ProductItem />
									<ProductItem />
									<ProductItem />
									<ProductItem />
									<ProductItem />
									<ProductItem />
									<ProductItem />
									<ProductItem />
									<ProductItem />
									<ProductItem />
									<ProductItem />
									<ProductItem />
									<ProductItem />
									<ProductItem />
									<ProductItem />
								</>
							) : (
								<>
									<ProductItemListView />
									<ProductItemListView />
									<ProductItemListView />
									<ProductItemListView />
									<ProductItemListView />
								</>
							)}
						</div>
						<div className="flex items-center justify-center mt-10">
							<Pagination count={10} showFirstButton showLastButton />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
export default ProductListing;
