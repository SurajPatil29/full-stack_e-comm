import { Button } from "@mui/material";
import { RiMenu2Fill } from "react-icons/ri";
import { RiArrowDownWideLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { IoRocketOutline } from "react-icons/io5";
import { CatagoryPanel } from "./CatagoryPanel";
import { useState } from "react";

function Navigation() {
	const [open, setOpen] = useState(false);

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	return (
		<>
			<nav className="py-2">
				<div className="container flex items-center justify-end gap-8">
					<div className="col_1 w-[20%] ">
						<Button
							className="!text-black gap-2 w-full "
							onClick={toggleDrawer(true)}
						>
							<RiMenu2Fill className="text-[18px]" />
							Shop By Categories
							<RiArrowDownWideLine className="text-[18px] ml-auto font-bold" />
						</Button>
					</div>
					<div className="col_2 w-[60%]">
						<ul className="flex items-center gap-4 nav">
							<li className="list-none">
								<Link to="/" className="link transition text-[14px] font-[500]">
									<Button>Home</Button>
								</Link>
							</li>
							<li className="list-none relative">
								<Link to="/" className="link transition text-[14px] font-[500]">
									<Button>Fashion</Button>
								</Link>
								<div className="submenu absolute top-[120%] left-[0%] min-w-[200px] bg-white shadow-md opacity-0 transition-all">
									<ul>
										<li className="list-none w-full">
											<Link className="w-full">
												<Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start">
													Men
												</Button>
												<div className="submenu absolute top-[0%] left-[100%] min-w-[200px] bg-white shadow-md opacity-0 transition-all">
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
								<Link to="/" className="link transition text-[14px] font-[500]">
									<Button>Electronics</Button>
								</Link>
							</li>
							<li className="list-none">
								<Link to="/" className="link transition text-[14px] font-[500]">
									<Button>Bags</Button>
								</Link>
							</li>
							<li className="list-none">
								<Link to="/" className="link transition text-[14px] font-[500]">
									<Button>Footware</Button>
								</Link>
							</li>
							<li className="list-none">
								<Link to="/" className="link transition text-[14px] font-[500]">
									<Button>Groceries</Button>
								</Link>
							</li>
							<li className="list-none">
								<Link to="/" className="link transition text-[14px] font-[500]">
									<Button>Beauty</Button>
								</Link>
							</li>
							<li className="list-none">
								<Link to="/" className="link transition text-[14px] font-[500]">
									<Button>Wellness</Button>
								</Link>
							</li>
							<li className="list-none">
								<Link to="/" className="link transition text-[14px] font-[500]">
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
		</>
	);
}

export { Navigation };
