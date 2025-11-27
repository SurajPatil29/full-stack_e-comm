import { Button } from "@mui/material";
import { RiMenu2Fill } from "react-icons/ri";
import { RiArrowDownWideLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { IoRocketOutline } from "react-icons/io5";
import { CatagoryPanel } from "./CatagoryPanel";
import { useContext, useEffect, useState } from "react";
import { fetchDataFromApi } from "../../../utils/api";
import MyContext from "../../../context/MyContext";

function Navigation() {
	//this navigation componant contain navigation and subnav bar
	const [open, setOpen] = useState(false); // this use to save state and use to open and close drawer
	const context = useContext(MyContext);
	const catData = context.catData;

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
							to={`/productListing/${item._id}`}
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
						to={`/productListing/${item._id}`}
						className="block px-4 py-2 hover:bg-gray-100 text-left"
					>
						{item.name}
					</Link>
					{item.children &&
						item.children.length > 0 &&
						renderThird(item.children)}
				</li>
			))}
		</ul>
	);

	const renderTopCategories = () =>
		catData.map((cat) => (
			<li key={cat._id} className="list-none relative">
				<Link
					to={`/productListing/${cat._id}`}
					className="link hover-text-[#ff5252] transition text-[14px] font-[500] !py-4 "
				>
					<Button
						component="span"
						className=" link !capitalize !text-[rgba(0,0,0,0.7)] "
					>
						{cat.name}{" "}
					</Button>
				</Link>
				{cat.children && cat.children.length > 0 && (
					<div className="submenu absolute top-[120%] left-0 min-w-[200px] bg-white shadow-md opacity-0 transition-all ">
						{renderSecond(cat.children)}
					</div>
				)}
			</li>
		));

	return (
		<>
			<nav>
				{/* this nav container contain nav bar and sub nav bar and side drawer */}
				<div className="container flex items-center justify-end gap-8">
					<div className="col_1 w-[20%] ">
						<Button
							className="!text-black gap-2 w-full "
							onClick={toggleDrawer(true)}
						>
							{/* this button open drawer */}
							<RiMenu2Fill className="text-[18px]" />
							Shop By Categories
							<RiArrowDownWideLine className="text-[18px] ml-auto font-bold" />
						</Button>
					</div>
					<div className="col_2 w-[60%] !py-2">
						{/* this container for the main navbar / patent container */}
						<ul className="flex items-center gap-4 nav">
							{/* i use list to show the nav links-buttons */}
							<li className="list-none">
								<Link
									to="/"
									className="link transition text-[14px] font-[500] !py-4"
								>
									<Button className="!capitalize !text-[rgba(0,0,0,0.7)] ">
										Home
									</Button>
								</Link>
							</li>
							{renderTopCategories()}
						</ul>
					</div>
					<div className="col_3 w-[20%]">
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
		</>
	);
}

export { Navigation };
