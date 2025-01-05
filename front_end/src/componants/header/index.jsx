import { Link } from "react-router-dom";
import { Search } from "../Search/index";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { IoCartOutline } from "react-icons/io5";
import { GoGitCompare } from "react-icons/go";
import { MdFavoriteBorder } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import { Navigation } from "./navigation";
import { useContext } from "react";
import { MyContext } from "../../App";

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
	const { setOpenCartPanel } = useContext(MyContext);
	return (
		<header className="bg-white">
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
					<div className="clo2 w-[45%]">
						<Search />
					</div>
					<div className="clo3 w-[30%] flex items-center pl-7">
						<ul className="flex items-center justify-end gap-3 w-full">
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
