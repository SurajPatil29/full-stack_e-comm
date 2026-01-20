import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
	IoHomeOutline,
	IoSearchOutline,
	IoCartOutline,
	IoPersonOutline,
} from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import MyContext from "../../../context/MyContext";
import { Badge } from "@mui/material";

const navItemClass =
	"flex flex-col items-center justify-center gap-0.5 " +
	"text-[11px] transition-colors";

function MobileNav() {
	const { cartData, myListData, setOpenCartPanel } = useContext(MyContext);

	return (
		<div
			className="mobileNav md:hidden fixed bottom-0 left-0 z-[9999]
      w-full bg-white border-t
      grid grid-cols-4 py-1 px-2
      pb-[env(safe-area-inset-bottom)]"
		>
			<NavItem to="/" label="Home" icon={IoHomeOutline} />

			{/* <NavItem to="/search" label="Search" icon={IoSearchOutline} /> */}

			{/* Cart (opens panel) */}
			<NavItem
				to="/cart"
				label="Cart"
				icon={IoCartOutline}
				badge={cartData?.length}
			/>

			{/* Wishlist */}
			<NavItem
				to="/my-list"
				label="Wishlist"
				icon={MdFavoriteBorder}
				badge={myListData?.length}
			/>

			<NavItem to="/my-account" label="Profile" icon={IoPersonOutline} />
		</div>
	);
}

function NavItem({ to, label, icon: Icon, badge }) {
	return (
		<NavLink to={to} className="flex justify-center">
			{({ isActive }) => (
				<div
					aria-label={label}
					className={`${navItemClass} ${
						isActive ? "text-[#ff5151] font-medium" : "text-black/70"
					}`}
				>
					{badge ? (
						<Badge badgeContent={badge} color="secondary">
							<Icon size={20} />
						</Badge>
					) : (
						<Icon size={20} />
					)}
					<span>{label}</span>
				</div>
			)}
		</NavLink>
	);
}

export default MobileNav;
