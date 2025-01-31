import { Button, TextField } from "@mui/material";
import { FaRegUser } from "react-icons/fa";
import { IoMdCloudUpload } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { NavLink } from "react-router-dom";

function MyAccount() {
	return (
		<section className="py-10 w-full">
			<div className="container flex gap-5">
				<div className="col1 w-[20%] ">
					<div className="card bg-white shadow-md rounded-md p-5">
						<div className="w-full p-5 flex item-center justify-center flex-col">
							<div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group">
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
							<h6 className="text-[13px] font-[500] ">surajp@gmail.com</h6>
						</div>

						<ul className="list-none pb-5 bg-[#f1f1f1] myAccountTabs ">
							<li className="w-full">
								<NavLink
									to="/my-account"
									exact={true}
									className={({ isActive }) => (isActive ? "isActive" : "")}
								>
									<Button className="w-full !text-left !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2 ">
										<FaRegUser className="text-[15px] " /> My Profile
									</Button>
								</NavLink>
							</li>

							<li className="w-full">
								<NavLink
									to="/my-list"
									exact={true}
									className={({ isActive }) => (isActive ? "isActive" : "")}
								>
									<Button className="w-full !text-left !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2 ">
										<FaRegHeart className="text-[15px] " /> My List
									</Button>
								</NavLink>
							</li>

							<li className="w-full">
								<NavLink
									to="/my-orders"
									exact={true}
									className={({ isActive }) => (isActive ? "isActive" : "")}
								>
									<Button className="w-full !text-left !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2 ">
										<FaRegHeart className="text-[15px] " /> My Orders
									</Button>
								</NavLink>
							</li>

							<li className="w-full">
								<NavLink
									to="/logout"
									exact={true}
									className={({ isActive }) => (isActive ? "isActive" : "")}
								>
									<Button className="w-full !text-left !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2 ">
										<LuLogOut className="text-[15px] " />
										Logout
									</Button>
								</NavLink>
							</li>
						</ul>
					</div>
				</div>

				<div className="col2 w-[50%] ">
					<div className="card bg-white p-5 shadow-md rounded-md">
						<h2 className="pb-3">My Profile</h2>
						<hr />

						<form className="mt-5">
							<div className="flex items-center gap-5">
								<div className="w-[50%] ">
									<TextField
										label="Name"
										variant="outlined"
										size="small"
										className="w-full"
									/>
								</div>
								<div className="w-[50%] ">
									<TextField
										label="Email"
										variant="outlined"
										size="small"
										className="w-full"
									/>
								</div>
							</div>
							<div className="flex items-center gap-5 mt-4">
								<div className="w-[50%] ">
									<TextField
										label="Phone Number"
										variant="outlined"
										size="small"
										className="w-full"
									/>
								</div>
							</div>

							<br />
							<div className="flex items-center gap-4">
								<Button className="btn-org btn-lg w-[100px] ">Save</Button>
								<Button className="btn-org btn-lg btn-border w-[100px] ">
									Cancel
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}

export default MyAccount;
