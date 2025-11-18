import { Link, useNavigate } from "react-router-dom";
import { Search } from "../Search/index";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { IoBagCheckOutline, IoCartOutline } from "react-icons/io5";
import { GoGitCompare } from "react-icons/go";
import { MdFavoriteBorder } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import { Navigation } from "./navigation";
import { useContext, useState } from "react";
import { Button } from "@mui/material";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { LuLogOut } from "react-icons/lu";
import { fetchDataFromApi } from "../../utils/api";
import MyContext from "../../context/MyContext";

const StyledBadge = styled(Badge)(({ theme }) => ({
	//this is material ui componant shows the how many product in cart on symbol
	"& .MuiBadge-badge": {
		right: -3,
		top: 13,
		border: `2px solid ${theme.palette.background.paper}`,
		padding: "0 4px",
	},
}));

function Header() {
	const { setOpenCartPanel, isLogin } = useContext(MyContext);
	const context = useContext(MyContext);

	const history = useNavigate();

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const logout = () => {
		setAnchorEl(null);
		fetchDataFromApi("/api/user/logout").then((res) => {
			// console.log(res);
			context.setIsLogin(false);
			localStorage.removeItem("accessToken");
			localStorage.removeItem("refreshToken");
			localStorage.removeItem("userId");
			history("/");
		});
	};

	return (
		<header className="bg-white sticky -top-[130px] z-50 shadow-[0px_1px_5px_#0000001a]  ">
			{/* header include top strim line, mid search line, bottom navigation line */}
			<div className="top-strim py-2 mt-1 border-t-[1px] border-gray-300 border-b-[1px]">
				{/* top strim line */}
				<div className="container">
					<div className="flex items-center justify-between">
						<div className="col1 w-[50%]">
							<p className="text-[12px] font-[500]">
								Get up to 50% off new season styles, limited time only
							</p>
						</div>

						<div className="col1 w-[50%] flex item-center justify-end">
							<ul className="flex items-center gap-2">
								<li className="list-none">
									<Link
										to="/help-center"
										className="text-[12px] link font-[500] transition"
									>
										Help Center
									</Link>
								</li>

								<li className="list-none">
									<Link
										to="/order-tracking"
										className="text-[12px] link font-[500] transition"
									>
										Order Tracking
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<div className="header py-3  border-gray-300 border-b-[1px]">
				{/* all componanat include search, login, register and fevorite cart */}
				<div className="container flex items-center justify-between">
					<div className="clo1 w-[25%]">
						<Link to={"/"}>
							<img src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1735815171/logo_xqjli7.png" />{" "}
						</Link>
					</div>
					<div className="clo2 w-[40%]">
						<Search />
					</div>
					<div className="clo3 w-[35%] flex items-center pl-7">
						<ul className="flex items-center justify-end gap-3 w-full">
							{isLogin === false ? (
								<li className="list-none">
									<Link
										to="/login"
										className="link transition text-[15px] font-[500]"
									>
										Login
									</Link>
									&nbsp; | &nbsp;
									<Link
										to="/register"
										className="link transition text-[15px] font-[500]"
									>
										Register
									</Link>
								</li>
							) : (
								<>
									<Button
										onClick={handleClick}
										className="!text-[#000] myAccountWrap flex items-center gap-3 cursor-pointer "
									>
										<Button className="!text-[#000] !w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-[#f1f1f1] p-0">
											{!context?.userData?.avatar ? (
												<FaRegUser className="text-[16px] text-[rgba(0,0,0,0.7)]" />
											) : (
												<img
													src={context.userData.avatar}
													alt="user avatar"
													className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full object-contain "
												/>
											)}
										</Button>

										<div className="info flex flex-col ">
											<h4 className="leading-3 text-[14px] text-[rgba(0,0,0,06)] font-[500] mb-0 capitalize text-left justify-start ">
												{context?.userData?.name}
											</h4>
											<span className="text-[13px] text-[rgba(0,0,0,0.6)] font-[400] capitalize text-left justify-start ">
												{context?.userData?.email}
											</span>
										</div>
									</Button>

									<Menu
										anchorEl={anchorEl}
										id="account-menu"
										open={open}
										onClose={handleClose}
										onClick={handleClose}
										slotProps={{
											paper: {
												elevation: 0,
												sx: {
													overflow: "visible",
													filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
													mt: 1.5,
													"& .MuiAvatar-root": {
														width: 32,
														height: 32,
														ml: -0.5,
														mr: 1,
													},
													"&::before": {
														content: '""',
														display: "block",
														position: "absolute",
														top: 0,
														right: 14,
														width: 10,
														height: 10,
														bgcolor: "background.paper",
														transform: "translateY(-50%) rotate(45deg)",
														zIndex: 0,
													},
												},
											},
										}}
										transformOrigin={{ horizontal: "right", vertical: "top" }}
										anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
									>
										<Link to="my-account" className="w-full block">
											<MenuItem
												onClick={handleClose}
												className="flex gap-2 py-2"
											>
												<FaRegUser />
												<span className="text-[14px] "> My Account</span>
											</MenuItem>
										</Link>

										<Link to="my-list" className="w-full block">
											<MenuItem
												onClick={handleClose}
												className="flex gap-2 py-2"
											>
												<FaRegHeart className="text-[18px] " />{" "}
												<span className="text-[14px] ">My List</span>
											</MenuItem>
										</Link>
										<Link to="my-orders" className="w-full block">
											<MenuItem
												onClick={handleClose}
												className="flex gap-2 py-2"
											>
												<IoBagCheckOutline className="text-[18px] " />{" "}
												<span className="text-[14px] ">My Orders</span>
											</MenuItem>
										</Link>
										<div className="w-full block" onClick={logout}>
											<MenuItem className="flex gap-2 py-2">
												<LuLogOut className="text-[18px]" />
												<span className="text-[14px]">Logout</span>
											</MenuItem>
										</div>
									</Menu>
								</>
							)}

							<li>
								<Tooltip title="Compair">
									<IconButton aria-label="cart">
										<StyledBadge badgeContent={5} color="secondary">
											<GoGitCompare />
										</StyledBadge>
									</IconButton>
								</Tooltip>
							</li>

							<li>
								<Tooltip title="Favorite">
									<IconButton aria-label="cart">
										<StyledBadge badgeContent={5} color="secondary">
											<MdFavoriteBorder />
										</StyledBadge>
									</IconButton>
								</Tooltip>
							</li>

							<li>
								<Tooltip title="Cart">
									<IconButton
										aria-label="cart"
										onClick={() => setOpenCartPanel(true)}
									>
										<StyledBadge badgeContent={5} color="secondary">
											<IoCartOutline />
										</StyledBadge>
									</IconButton>
								</Tooltip>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<Navigation />
			{/* this is nav componant we import here */}
		</header>
	);
}

export { Header };
