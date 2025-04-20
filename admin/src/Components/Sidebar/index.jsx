import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FaAngleDown, FaProductHunt, FaRegImage } from "react-icons/fa";
import { RiProductHuntLine } from "react-icons/ri";

import { FiUsers } from "react-icons/fi";
import { TbCategory } from "react-icons/tb";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { Collapse } from "react-collapse";

function Sidebar() {
	const [submenuIndex, setSubmenuIndex] = useState(null);
	const isOpenSubMenu = (index) => {
		if (submenuIndex === index) {
			setSubmenuIndex(null);
		} else {
			setSubmenuIndex(index);
		}
	};
	return (
		<>
			<div className="sidebar fixed top-0 left-0 bg-[#fff] w-[18%] h-full border-r border-[rgba(0,0,0,0.1)] py-2 px-2 ">
				<div className="py-2 w-full">
					<Link to="/">
						<img
							src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1735815171/logo_xqjli7.png"
							alt="site_logo"
							className="w-[150px] "
						/>
					</Link>
				</div>

				<ul className="mt-4">
					<li>
						<Link to="/">
							<Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center py-2 hover:!bg-[#f1f1f1] ">
								<RxDashboard className="text-[20px] " /> <span>Dashboard</span>
							</Button>
						</Link>
					</li>
					<li>
						<Button
							className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center py-2 hover:!bg-[#f1f1f1] "
							onClick={() => isOpenSubMenu(1)}
						>
							<FaRegImage className="text-[20px] " /> <span>Home Slide</span>
							<span className="ml-auto w-[30px] flex items-center justify-center ">
								<FaAngleDown
									className={`transition-all ${
										submenuIndex === 1 ? "rotate-180" : ""
									} `}
								/>
							</span>
						</Button>

						<Collapse isOpened={submenuIndex === 1 ? true : false}>
							<ul className="w-full">
								<li className="w-full">
									<Button className="!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 ">
										{" "}
										<span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)] "></span>
										Home Banner List
									</Button>
								</li>
								<li className="w-full">
									<Button className="!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 ">
										<span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)] "></span>
										Add Home Banner Slide
									</Button>
								</li>
							</ul>
						</Collapse>
					</li>
					<li>
						<Link to="/user">
							<Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center py-2 hover:!bg-[#f1f1f1] ">
								<FiUsers className="text-[20px] " /> <span>User</span>
							</Button>
						</Link>
					</li>
					<li>
						<Button
							className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center py-2 hover:!bg-[#f1f1f1] "
							onClick={() => isOpenSubMenu(3)}
						>
							<RiProductHuntLine className="text-[20px] " />{" "}
							<span>Product</span>
							<span className="ml-auto w-[30px] flex items-center justify-center ">
								<FaAngleDown
									className={`transition-all ${
										submenuIndex === 3 ? "rotate-180" : ""
									} `}
								/>
							</span>
						</Button>

						<Collapse isOpened={submenuIndex === 3 ? true : false}>
							<ul className="w-full">
								<li className="w-full">
									<Link to="/products">
										<Button className="!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 ">
											{" "}
											<span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)] "></span>
											Product List
										</Button>
									</Link>
								</li>
								<li className="w-full">
									<Link to="/product/upload">
										<Button className="!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 ">
											<span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)] "></span>
											Product Upload
										</Button>
									</Link>
								</li>
							</ul>
						</Collapse>
					</li>
					<li>
						<Button
							className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center py-2 hover:!bg-[#f1f1f1] "
							onClick={() => isOpenSubMenu(4)}
						>
							<TbCategory className="text-[20px] " /> <span>Catagory</span>
							<span className="ml-auto w-[30px] flex items-center justify-center ">
								<FaAngleDown
									className={`transition-all ${
										submenuIndex === 4 ? "rotate-180" : ""
									} `}
								/>
							</span>
						</Button>

						<Collapse isOpened={submenuIndex === 4 ? true : false}>
							<ul className="w-full">
								<li className="w-full">
									<Link to="/categories">
										<Button className="!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 ">
											{" "}
											<span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)] "></span>
											category List
										</Button>
									</Link>
								</li>
								<li className="w-full">
									<Link to="/category/add">
										<Button className="!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 ">
											<span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)] "></span>
											Add a Category
										</Button>
									</Link>
								</li>
								<li className="w-full">
									<Link to="/category/subCat">
										<Button className="!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 ">
											<span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)] "></span>
											Sub Category List
										</Button>
									</Link>
								</li>
								<li className="w-full">
									<Link to="/category/subCat/add">
										<Button className="!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 ">
											<span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)] "></span>
											Add a Sub Category
										</Button>
									</Link>
								</li>
							</ul>
						</Collapse>
					</li>
					<li>
						<Link to="orders">
							<Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center py-2 hover:!bg-[#f1f1f1] ">
								<IoBagCheckOutline className="text-[20px] " />{" "}
								<span>Orders</span>
							</Button>
						</Link>
					</li>

					<li>
						<Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center py-2 hover:!bg-[#f1f1f1] ">
							<MdOutlineLogout className="text-[20px] " /> <span>Logout</span>
						</Button>
					</li>
				</ul>
			</div>
		</>
	);
}

export default Sidebar;
