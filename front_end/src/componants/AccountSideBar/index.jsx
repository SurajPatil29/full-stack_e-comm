import { Button, CircularProgress } from "@mui/material";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { IoMdCloudUpload } from "react-icons/io";
import { IoBagCheckOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import {
	deleteImagefromCloudi,
	fetchDataFromApi,
	postFormData,
} from "../../utils/api";
import { useContext, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import MyContext from "../../context/MyContext";

function AccountSideBar() {
	const [isLoading, setIsLoading] = useState(false);

	const context = useContext(MyContext);
	const logOut = () => {
		// console.log("logout");
		fetchDataFromApi("/api/user/logout").then((res) => {
			context.setIsLogin(false);
			localStorage.removeItem("accessToken");
			localStorage.removeItem("refreshToken");
			localStorage.removeItem("userId");

			history("/");
		});
	};

	const handleAvatarChange = async (e) => {
		setIsLoading(true);
		const file = e.target.files?.[0];
		if (!file) {
			setIsLoading(false);
			context.openAlertBox("error", "No file selected");
			return;
		}

		const formData = new FormData();
		formData.append("avatar", file);

		const responce = await postFormData("/api/user/user-avatar", formData);

		setIsLoading(false);
		if (responce.error) {
			context.openAlertBox("error", `Upload failse : + ${responce.message}`);
		} else {
			context.openAlertBox("success", responce.message);
			const updatedUser = await fetchDataFromApi("/api/user/user-details");
			context.setUserData(updatedUser.user);
		}
	};

	const handleDeleteAvatar = async () => {
		if (!context?.userData?.avatar) {
			setIsLoading(false);
			context.openAlertBox("error", "You don't have an avatar");
			return;
		}

		const avatarUrl = context?.userData?.avatar;
		const encodedUrl = encodeURIComponent(avatarUrl);
		// console.log(encodedUrl);
		setIsLoading(true);

		const response = await deleteImagefromCloudi(
			"/api/user/deleteImage",
			avatarUrl
		);
		setIsLoading(false);
		if (response.error) {
			context.openAlertBox(
				"error",
				`Delete avatar failed: ${response.message}`
			);
		} else {
			context.openAlertBox("success", response.message);
			const updatedUser = await fetchDataFromApi("/api/user/user-details");
			context.setUserData(updatedUser.user);
		}
	};
	return (
		<div className="card bg-white shadow-md rounded-md  sticky top-10 ">
			<div className="w-full p-5 flex items-center justify-center flex-col">
				<div className="relative w-fit">
					<div className="flex items-center justify-center w-[110px] aspect-square rounded-full overflow-hidden mb-4 relative group">
						{!context?.userData?.avatar ? (
							<FaRegUser className="text-[16px] text-[rgba(0,0,0,0.7)]" />
						) : (
							<img
								src={context?.userData?.avatar}
								alt="userProfile"
								className="w-full h-full object-contain rounded-full"
							/>
						)}

						{isLoading ? (
							<div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.7)] z-50 rounded-full">
								<CircularProgress color="inherit" />
							</div>
						) : (
							<div className="overlay w-full h-full absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100">
								<IoMdCloudUpload className="text-white text-[25px]" />
								<input
									type="file"
									accept="image/*"
									className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
									onChange={handleAvatarChange}
								/>
							</div>
						)}
					</div>
					{context?.userData?.avatar && !isLoading && (
						<div
							onClick={handleDeleteAvatar}
							className="absolute bottom-1 right-1 z-50 bg-white rounded-full p-[6px] shadow-md cursor-pointer hover:bg-red-100 transition "
							title="Delete Avatar"
						>
							<MdOutlineDelete className="text-red-500 text-[18px]" />
						</div>
					)}
				</div>

				<h3>{context?.userData?.name}</h3>
				<h6 className="text-[13px] font-[500] ">{context?.userData?.email}</h6>
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
					<Button
						className="w-full !text-left !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2"
						onClick={logOut}
					>
						<LuLogOut className="text-[15px]" /> Logout
					</Button>
				</li>
			</ul>
		</div>
	);
}

export default AccountSideBar;
