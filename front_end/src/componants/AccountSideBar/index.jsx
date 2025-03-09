import { Button } from "@mui/material";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { IoMdCloudUpload } from "react-icons/io";
import { IoBagCheckOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { NavLink } from "react-router-dom";

function AccountSideBar() {
	return (
		<div className="card bg-white shadow-md rounded-md  sticky top-10 ">
			<div className="w-full p-5 flex item-center justify-center flex-col">
				<div className="flex item-center justify-center w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group">
					<img
						src="https://bni-india.in/img/site/61b86b9c9c5dd2002726e657.jpg"
						alt=""
						className="w-full h-full object-cover"
					/>

					<div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100 ">
						<IoMdCloudUpload className="text-[#fff] text-[25px] " />
						<input
							type="file"
							className="absolute top-0 left-0 w-full h-full opacity-0"
						/>
					</div>
				</div>
				<h3>Rajesh Sharma</h3>
				<h6 className="text-[13px] font-[500] ">rajeshsharma@gmail.com</h6>
			</div>

			<ul className="list-none pb-5 bg-[#f1f1f1] myAccountTabs">
				<li className="w-full">
					<NavLink
						to="/my-account"
						className={({ isActive }) =>
							`w-full block ${isActive ? "bg-white isActive" : ""}`
						}
					>
						<Button className="w-full !text-left !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
							<FaRegUser className="text-[15px]" /> My Profile
						</Button>
					</NavLink>
				</li>

				<li className="w-full">
					<NavLink
						to="/my-list"
						className={({ isActive }) =>
							`w-full block ${isActive ? "bg-white isActive" : ""}`
						}
					>
						<Button className="w-full !text-left !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
							<FaRegHeart className="text-[15px]" /> My List
						</Button>
					</NavLink>
				</li>

				<li className="w-full">
					<NavLink
						to="/my-orders"
						className={({ isActive }) =>
							`w-full block ${isActive ? "bg-white isActive" : ""}`
						}
					>
						<Button className="w-full !text-left !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
							<IoBagCheckOutline className="text-[15px]" /> My Orders
						</Button>
					</NavLink>
				</li>

				<li className="w-full">
					<NavLink
						to="/logout"
						className={({ isActive }) =>
							`w-full block ${isActive ? "bg-white isActive" : ""}`
						}
					>
						<Button className="w-full !text-left !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
							<LuLogOut className="text-[15px]" /> Logout
						</Button>
					</NavLink>
				</li>
			</ul>
		</div>
	);
}

export default AccountSideBar;
