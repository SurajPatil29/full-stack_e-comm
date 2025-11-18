import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FaAngleDown, FaProductHunt, FaRegImage } from "react-icons/fa";
import { RiProductHuntLine } from "react-icons/ri";

import { FiUsers } from "react-icons/fi";
import { TbCategory } from "react-icons/tb";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { Collapse } from "react-collapse";
import MyContext from "../../context/MyContext";
import { fetchDataFromApi } from "../../utils/api";

function Sidebar() {
	const context = useContext(MyContext);
	const [submenuIndex, setSubmenuIndex] = useState(null);
	const isOpenSubMenu = (index) => {
		if (submenuIndex === index) {
			setSubmenuIndex(null);
		} else {
			setSubmenuIndex(index);
		}
	};
	const history = useNavigate();

	const logOut = () => {
		// setAnchorMyAcc(null);
		fetchDataFromApi("/api/user/logout").then((res) => {
			context.setIsLogin(false);
			localStorage.removeItem("accessToken");
			localStorage.removeItem("refreshToken");
			localStorage.removeItem("userId");
			history("/");
		});
	};
	return (
		<>
			<div className="sidebar fixed top-0 left-0 bg-[#fff] w-[18%] h-full border-r border-[rgba(0,0,0,0.1)] py-2 px-2 z-50">
				<div className="py-2  w-full">
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
					{context.isLogin && (
						<>
							<li>
								<Button
									className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center py-2 hover:!bg-[#f1f1f1] "
									onClick={() => isOpenSubMenu(1)}
								>
									<FaRegImage className="text-[20px] " />{" "}
									<span>Home Slide</span>
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
											<Link to="/homeslider/list">
												<Button className="!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 ">
													{" "}
													<span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)] "></span>
													Home Banner List
												</Button>
											</Link>
										</li>

										<li className="w-full">
											<Button
												className="!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 "
												onClick={() =>
													context.setIsOpenFullScreenPanel({
														open: true,
														model: "Add Home Slide",
													})
												}
											>
												<span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)] "></span>
												Add Home Banner Slide
											</Button>
										</li>
										<li className="w-full">
											<Link to="/homesliderV2/list">
												<Button className="!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 ">
													{" "}
													<span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)] "></span>
													Home BannerV2 List
												</Button>
											</Link>
										</li>

										<li className="w-full">
											<Button
												className="!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 "
												onClick={() =>
													context.setIsOpenFullScreenPanel({
														open: true,
														model: "Add BannerV2",
													})
												}
											>
												<span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)] "></span>
												Add Home BannerV2 Slide
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
											<Button
												className="!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 "
												onClick={() =>
													context.setIsOpenFullScreenPanel({
														open: true,
														model: "Add Product",
													})
												}
											>
												<span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)] "></span>
												Product Upload
											</Button>
										</li>
										<li className="w-full">
											<Link to="/product/addRAMs">
												<Button className="!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 ">
													<span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)] "></span>
													Add Product RAMs
												</Button>
											</Link>
										</li>
										<li className="w-full">
											<Link to="/product/addSize">
												<Button className="!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 ">
													<span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)] "></span>
													Add Product Sizes
												</Button>
											</Link>
										</li>
										<li className="w-full">
											<Link to="/product/addWeight">
												<Button className="!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 ">
													<span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)] "></span>
													Add Product Weights
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
											<Link to="/category/list">
												<Button className="!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 ">
													{" "}
													<span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)] "></span>
													category List
												</Button>
											</Link>
										</li>
										<li className="w-full">
											<Button
												className="!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 "
												onClick={() =>
													context.setIsOpenFullScreenPanel({
														open: true,
														model: "Add New Category",
													})
												}
											>
												<span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)] "></span>
												Add a Category
											</Button>
										</li>
										<li className="w-full">
											<Link to="/subcategory/list">
												<Button className="!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 ">
													<span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)] "></span>
													Sub Category List
												</Button>
											</Link>
										</li>
										<li className="w-full">
											<Button
												className="!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 "
												onClick={() =>
													context.setIsOpenFullScreenPanel({
														open: true,
														model: "Add New Sub Category",
													})
												}
											>
												<span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.3)] "></span>
												Add a Sub Category
											</Button>
										</li>
									</ul>
								</Collapse>
							</li>
							<li>
								<Link to="/orders">
									<Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center py-2 hover:!bg-[#f1f1f1] ">
										<IoBagCheckOutline className="text-[20px] " />{" "}
										<span>Orders</span>
									</Button>
								</Link>
							</li>

							<li>
								<Button
									className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center py-2 hover:!bg-[#f1f1f1] "
									onClick={logOut}
								>
									<MdOutlineLogout className="text-[20px] " />{" "}
									<span>Logout</span>
								</Button>
							</li>
						</>
					)}
				</ul>
			</div>
		</>
	);
}

export default Sidebar;
