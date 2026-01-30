import { Button } from "@mui/material";
import { RiMenu2Fill } from "react-icons/ri";
import { RiArrowDownWideLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { IoRocketOutline } from "react-icons/io5";
import { CatagoryPanel } from "./CatagoryPanel";
import { useContext, useEffect, useState } from "react";
import { fetchDataFromApi } from "../../../utils/api";
import MyContext from "../../../context/MyContext";
import MobileNav from "./MobileNav";

function Navigation() {
	//this navigation componant contain navigation and subnav bar
	const [open, setOpen] = useState(false); // this use to save state and use to open and close drawer
	const context = useContext(MyContext);
	const catData = context.catData;
	const isMobileNav = context.windowWidth < 1200;

	const toggleDrawer = (newOpen) => () => {
		// togal function is change state
		setOpen(newOpen);
	};

	const renderThird = (third) => (
		<div className="submenu absolute top-0 left-full min-w-[200px] bg-white shadow-md opacity-0 transition-all">
			<ul>
				{third.map((item) => (
					<li key={item._id} className="list-none w-full">
						<Link
							to={`/productListing/third/${item._id}`}
							className="block px-4 py-2 hover:bg-gray-100 text-left"
						>
							{item.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);

	const renderSecond = (second) => (
		<ul>
			{second.map((item) => (
				<li key={item._id} className="list-none w-full relative">
					<Link
						to={`/productListing/sub/${item._id}`}
						className="block px-4 py-2 hover:bg-gray-100 text-left"
					>
						{item.name}
					</Link>
					{item.children &&
						item.children.length > 0 &&
						!isMobileNav &&
						renderThird(item.children)}
				</li>
			))}
		</ul>
	);

	const renderTopCategories = () =>
		catData.map((cat) => (
			<li key={cat._id} className="list-none relative shrink-0">
				<Link
					to={`/productListing/cat/${cat._id}`}
					className="link hover-text-[#ff5252] transition text-[14px] font-[500] !py-4 "
				>
					<Button
						component="span"
						className=" link !capitalize !text-[rgba(0,0,0,0.7)] whitespace-nowrap !px-1 "
					>
						{cat.name}{" "}
					</Button>
				</Link>
				{cat.children && cat.children.length > 0 && !isMobileNav && (
					<div className="submenu absolute top-[120%] left-0 min-w-[200px] bg-white shadow-md opacity-0 transition-all ">
						{renderSecond(cat.children)}
					</div>
				)}
			</li>
		));

	return (
		<>
			<nav className="w-full border-t border-b bg-white">
				{/* this nav container contain nav bar and sub nav bar and side drawer */}
				<div className="container mx-auto flex items-center gap-4">
					<div className="shrink-0 ">
						<Button className="!text-black gap-2 " onClick={toggleDrawer(true)}>
							{/* this button open drawer */}
							<RiMenu2Fill className="text-[18px]" />
							<span className="hidden sm:block">Shop By Categories</span>

							<RiArrowDownWideLine className="hidden sm:block text-[18px] ml-1 " />
						</Button>
					</div>
					<div className="col_2 w-[65%] !py-2">
						{/* this container for the main navbar / patent container */}
						<ul
							className={`flex gap-0 md:gap-4 nav ${
								isMobileNav
									? "w-full overflow-x-auto whitespace-nowrap scrollbar-hide"
									: ""
							}`}
						>
							{/* i use list to show the nav links-buttons */}
							<li className="list-none shrink-0">
								<Link
									to="/"
									className="link transition text-[14px] font-[500] !py-4"
								>
									<Button className="!capitalize !text-[rgba(0,0,0,0.7)] whitespace-nowrap !px-1">
										Home
									</Button>
								</Link>
							</li>
							{renderTopCategories()}
						</ul>
					</div>
					<div className="hidden xl2:flex shrink-0 items-center gap-2">
						<p className="text-[14px] font-[500] flex items-center gap-3 mb-0 mt-0">
							<IoRocketOutline className="text-[18px] text-[#ff5252]" />
							Free International Delivery
						</p>
					</div>
				</div>
			</nav>
			{catData?.length !== 0 && (
				<CatagoryPanel toggleDrawer={toggleDrawer} open={open} data={catData} />
			)}
			{/* this is drawer componant which take two props to use it open and close */}

			<MobileNav />
		</>
	);
}

export { Navigation };
