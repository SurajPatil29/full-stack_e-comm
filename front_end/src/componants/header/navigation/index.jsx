import { Button } from "@mui/material";
import { RiMenu2Fill } from "react-icons/ri";
import { RiArrowDownWideLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { IoRocketOutline } from "react-icons/io5";
import { CatagoryPanel } from "./CatagoryPanel";
import { useState } from "react";

function Navigation() {
	//this navigation componant contain navigation and subnav bar
	const [open, setOpen] = useState(false); // this use to save state and use to open and close drawer

	const toggleDrawer = (newOpen) => () => {
		// togal function is change state
		setOpen(newOpen);
	};

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
									<Button>Home</Button>
								</Link>
							</li>
							<li className="list-none relative">
								{/* in this link write the code of submenu when hover it occurs the submenu */}
								<Link
									to="/"
									className="link transition text-[14px] font-[500] !py-4"
								>
									<Button>Fashion</Button>
								</Link>
								<div className="submenu absolute top-[120%] left-[0%] min-w-[200px] bg-white shadow-md opacity-0 transition-all">
									{/* this is submenu container and this will include another menu which show case the Mens catagory */}
									<ul>
										<li className="list-none w-full">
											<Link className="w-full">
												<Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start">
													Men
												</Button>
												<div className="submenu absolute top-[0%] left-[100%] min-w-[200px] bg-white shadow-md opacity-0 transition-all">
													{/* this is inner submenu */}
													<ul>
														<li className="list-none w-full">
															<Link className="w-full">
																<Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start">
																	T-Shirt
																</Button>
															</Link>
														</li>
														<li className="list-none w-full">
															<Link className="w-full">
																<Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start">
																	Jeans
																</Button>
															</Link>
														</li>
														<li className="list-none w-full">
															<Link className="w-full">
																<Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start">
																	Footwear
																</Button>
															</Link>
														</li>
														<li className="list-none w-full">
															<Link className="w-full">
																<Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start">
																	Watch
																</Button>
															</Link>
														</li>
														<li className="list-none w-full">
															<Link className="w-full">
																<Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start">
																	Pents
																</Button>
															</Link>
														</li>
													</ul>
												</div>
											</Link>
										</li>
										<li className="list-none w-full">
											<Link className="w-full">
												<Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start">
													Women
												</Button>
											</Link>
										</li>
										<li className="list-none w-full">
											<Link className="w-full">
												<Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start">
													Kids
												</Button>
											</Link>
										</li>
										<li className="list-none w-full">
											<Link className="w-full">
												<Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start">
													Girls
												</Button>
											</Link>
										</li>
										<li className="list-none w-full">
											<Link className="w-full">
												<Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start">
													Boys
												</Button>
											</Link>
										</li>
									</ul>
								</div>
							</li>
							<li className="list-none">
								<Link
									to="/"
									className="link transition text-[14px] font-[500] !py-4"
								>
									<Button>Electronics</Button>
								</Link>
							</li>
							<li className="list-none">
								<Link
									to="/"
									className="link transition text-[14px] font-[500] !py-4"
								>
									<Button>Bags</Button>
								</Link>
							</li>
							<li className="list-none">
								<Link
									to="/"
									className="link transition text-[14px] font-[500] !py-4"
								>
									<Button>Footware</Button>
								</Link>
							</li>
							<li className="list-none">
								<Link
									to="/"
									className="link transition text-[14px] font-[500] !py-4"
								>
									<Button>Groceries</Button>
								</Link>
							</li>
							<li className="list-none">
								<Link
									to="/"
									className="link transition text-[14px] font-[500] !py-4"
								>
									<Button>Beauty</Button>
								</Link>
							</li>
							<li className="list-none">
								<Link
									to="/"
									className="link transition text-[14px] font-[500] !py-4"
								>
									<Button>Wellness</Button>
								</Link>
							</li>
							<li className="list-none ">
								<Link
									to="/"
									className="link transition text-[14px] font-[500] !py-4"
								>
									<Button>Jewellery</Button>
								</Link>
							</li>
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
			<CatagoryPanel toggleDrawer={toggleDrawer} open={open} />
			{/* this is drawer componant which take two props to use it open and close */}
		</>
	);
}

export { Navigation };
