import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { CiSquareMinus } from "react-icons/ci";
import "../navigation/style.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function CatagoryPanel({ toggleDrawer, open }) {
	const [submenuindex, setSubmenuIndex] = useState(null);
	const [innersubmenuindex, setInnerSubmenuIndex] = useState(null);
	// both state use for the toggeling purpose open and close the catagory filters

	const openSubmenu = (index) => {
		if (submenuindex === index) {
			setSubmenuIndex(null);
		} else {
			setSubmenuIndex(index);
		}
	};

	const openinnerSubmenu = (index) => {
		if (innersubmenuindex === index) {
			setInnerSubmenuIndex(null);
		} else {
			setInnerSubmenuIndex(index);
		}
	};
	// above both funcuction use to chane the state

	const DrawerList = (
		<Box sx={{ width: 300 }} role="presentation" className="catagoryPanel">
			{/* this box represent the drawer */}
			<div className="flex items-center justify-between p-3 gap-1">
				{/* this contain title and close button */}
				<h3 className="text-[16px] font-[500] ">Shop By Categories </h3>
				<Button
					onClick={toggleDrawer(false)}
					className="!text-[rgba(0,0,0,0.7)] cursor-pointer transition"
				>
					<IoMdClose className="text-[rgba(0,0,0,0.7)] " />
				</Button>
			</div>
			<Divider />
			<div className="scorll">
				{/* this div contain full drawer and filters */}
				<ul className="w-full">
					<li className="list-none flex items-center relative flex-col">
						<Link className="w-full">
							<Button className="w-full !text-left !justify-start px-3 !text-[rgba(0,0,0,0.8)]">
								FASHION
							</Button>
						</Link>
						{/* use condition rendering to show case the buttons according to open or close */}
						{submenuindex === 0 ? (
							<CiSquareMinus
								className="absolute top-[10px] right-[15px] cursor-pointer"
								onClick={() => openSubmenu(0)}
							/>
						) : (
							<AiOutlinePlusSquare
								className="absolute top-[10px] right-[15px] cursor-pointer"
								onClick={() => openSubmenu(0)}
							/>
						)}
						{/* this rendering use to show case the filter option acoording to condition */}
						{submenuindex === 0 && (
							<ul className="submenu w-full pl-4 ">
								<li className="list-none relative ">
									<Link className="w-full">
										<Button className="w-full !text-left !justify-start !text-[rgba(0,0,0,0.8)]">
											APPERAL
										</Button>
									</Link>
									{/* redering for buttons */}
									{innersubmenuindex === 0 ? (
										<CiSquareMinus
											className="absolute top-[10px] right-[15px] cursor-pointer"
											onClick={() => openinnerSubmenu(0)}
										/>
									) : (
										<AiOutlinePlusSquare
											className="absolute top-[10px] right-[15px] cursor-pointer"
											onClick={() => openinnerSubmenu(0)}
										/>
									)}
									{/* rendering for menu / filters */}
									{innersubmenuindex == 0 && (
										<ul className="inner_submenu w-full pl-8 ">
											<li className="list-none relative py-1">
												<Link
													to="/"
													className="w-full link !text-left !justify-start transition text-[14px] "
												>
													Smart Tablet
												</Link>
											</li>
											<li className="list-none flex items-center relative py-1">
												<Link
													to="/"
													className="w-full link !text-left !justify-start transition text-[14px] "
												>
													Crepe T-Shirt
												</Link>
											</li>
											<li className="list-none flex items-center relative py-1">
												<Link
													to="/"
													className="w-full link !text-left !justify-start transition text-[14px] "
												>
													Leather Watch
												</Link>
											</li>
											<li className="list-none flex items-center relative py-1">
												<Link
													to="/"
													className="w-full link !text-left !justify-start transition text-[14px] "
												>
													Rolling Dimond
												</Link>
											</li>
										</ul>
									)}
								</li>
							</ul>
						)}
					</li>
					{/* this is same as above but state is chane */}
					<li className="list-none flex items-center relative flex-col">
						<Link className="w-full">
							<Button className="w-full !text-left !justify-start px-3 !text-[rgba(0,0,0,0.8)]">
								FASHION
							</Button>
						</Link>
						{submenuindex === 1 ? (
							<CiSquareMinus
								className="absolute top-[10px] right-[15px] cursor-pointer"
								onClick={() => openSubmenu(1)}
							/>
						) : (
							<AiOutlinePlusSquare
								className="absolute top-[10px] right-[15px] cursor-pointer"
								onClick={() => openSubmenu(1)}
							/>
						)}

						{submenuindex === 1 && (
							<ul className="submenu w-full pl-4 ">
								<li className="list-none relative ">
									<Link className="w-full">
										<Button className="w-full !text-left !justify-start !text-[rgba(0,0,0,0.8)]">
											APPERAL
										</Button>
									</Link>
									{innersubmenuindex === 1 ? (
										<CiSquareMinus
											className="absolute top-[10px] right-[15px] cursor-pointer"
											onClick={() => openinnerSubmenu(1)}
										/>
									) : (
										<AiOutlinePlusSquare
											className="absolute top-[10px] right-[15px] cursor-pointer"
											onClick={() => openinnerSubmenu(1)}
										/>
									)}
									{innersubmenuindex == 1 && (
										<ul className="inner_submenu w-full pl-8 ">
											<li className="list-none relative py-1">
												<Link
													to="/"
													className="w-full link !text-left !justify-start transition text-[14px] "
												>
													Smart Tablet
												</Link>
											</li>
											<li className="list-none flex items-center relative py-1">
												<Link
													to="/"
													className="w-full link !text-left !justify-start transition text-[14px] "
												>
													Crepe T-Shirt
												</Link>
											</li>
											<li className="list-none flex items-center relative py-1">
												<Link
													to="/"
													className="w-full link !text-left !justify-start transition text-[14px] "
												>
													Leather Watch
												</Link>
											</li>
											<li className="list-none flex items-center relative py-1">
												<Link
													to="/"
													className="w-full link !text-left !justify-start transition text-[14px] "
												>
													Rolling Dimond
												</Link>
											</li>
										</ul>
									)}
								</li>
							</ul>
						)}
					</li>
				</ul>
			</div>
		</Box>
	);
	return (
		<div>
			<Drawer open={open} onClose={toggleDrawer(false)}>
				{DrawerList}
			</Drawer>
		</div>
	);
}

CatagoryPanel.propTypes = {
	toggleDrawer: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
};

export { CatagoryPanel };
