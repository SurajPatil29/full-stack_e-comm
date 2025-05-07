import React, { useContext, useState } from "react";
import { Button, Divider } from "@mui/material";
import { RiMenu2Line } from "react-icons/ri";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { FaRegBell, FaRegUser } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoIosLogOut } from "react-icons/io";
import { MyContext } from "../../App";
import { Link } from "react-router-dom";
import { AiOutlineMenuFold } from "react-icons/ai";

const StyledBadge = styled(Badge)(({ theme }) => ({
	"& .MuiBadge-badge": {
		right: -3,
		top: 13,
		border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
		padding: "0 4px",
	},
}));

function Header() {
	const [anchorMyAcc, setAnchorMyAcc] = useState(null);
	const openMyAcc = Boolean(anchorMyAcc);
	const handleClickMyAcc = (event) => {
		setAnchorMyAcc(event.currentTarget);
	};
	const handleCloseMyAcc = () => {
		setAnchorMyAcc(null);
	};

	const context = useContext(MyContext);
	return (
		<header
			className={`w-full bg-white h-[auto] py-2 ${
				context.isSidebarOpen ? "pl-[19%]" : "pl-2 "
			} pr-7 shadow-md flex items-center justify-between`}
		>
			<div className="flex items-center gap-2 w-[50%]">
				{!context.isSidebarOpen && (
					<div className="py-2 w-[35%]">
						<Link to="/">
							<img
								src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1735815171/logo_xqjli7.png"
								alt="site_logo"
								className="w-[100%] max-w-[150px] "
							/>
						</Link>
					</div>
				)}
				<div className="part1">
					<Button
						className="!w-[40px] !h-[40px] !rounded-full !min-w-[40px] !text-[rgba(0,0,0,0.8)] "
						onClick={() => context.setIsSidebarOpen(!context.isSidebarOpen)}
					>
						<AiOutlineMenuFold
							className={`text-[20px] text-[rgba(0,0,0,0.8)] ${
								context.isSidebarOpen ? "rotate-0" : "rotate-180"
							}`}
						/>
					</Button>
				</div>
			</div>

			<div className="part2 w-[40%] flex items-center justify-end gap-4 ">
				<IconButton aria-label="cart">
					<StyledBadge badgeContent={4} color="secondary">
						<FaRegBell />
					</StyledBadge>
				</IconButton>

				{context.isLogIn === true ? (
					<div className="relative">
						<div
							className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer "
							onClick={handleClickMyAcc}
						>
							<img
								src="https://www.shutterstock.com/image-photo/studio-close-portrait-happy-smiling-260nw-2153541715.jpg"
								alt="profile img"
							/>
						</div>
						<Menu
							anchorEl={anchorMyAcc}
							id="account-menu"
							open={openMyAcc}
							onClose={handleCloseMyAcc}
							onClick={handleCloseMyAcc}
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
							<MenuItem onClick={handleCloseMyAcc} className="!bg-white">
								<div className="flex items-center gap-3">
									<div
										className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer "
										onClick={handleClickMyAcc}
									>
										<img
											src="https://www.shutterstock.com/image-photo/studio-close-portrait-happy-smiling-260nw-2153541715.jpg"
											alt="profile img"
										/>
									</div>

									<div className="info">
										<h3 className="text-[15px] font-[500] leading-5 ">
											Suraj Patil
										</h3>
										<p className="text-[12px] font-[400] opacity-70 ">
											surajpatil@gmail.com
										</p>
									</div>
								</div>
							</MenuItem>
							<Divider />

							<MenuItem
								onClick={handleCloseMyAcc}
								className="flex items-center gap-3"
							>
								<FaRegUser className="text-[18px] " />
								<span className="text-[14px] ">Profile</span>
							</MenuItem>

							<Divider />

							<MenuItem
								onClick={handleCloseMyAcc}
								className="flex items-center gap-3"
							>
								<IoIosLogOut className="text-[18px]" />
								<span className="text-[14px] ">Sign out</span>
							</MenuItem>
						</Menu>
					</div>
				) : (
					<Link to="/signup">
						<Button className="btn-blue btn-sm !rounded-full">Sign In</Button>
					</Link>
				)}
			</div>
		</header>
	);
}

export default Header;
