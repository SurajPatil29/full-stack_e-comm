import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { VscTriangleDown } from "react-icons/vsc";
// import { VscTriangleUp } from "react-icons/vsc";
import { Rating } from "@mui/material";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";

function CartItems(props) {
	const [sizeAnchorEl, setSizeAnchorEl] = useState(null);
	const [selectedSize, setSelectedSize] = useState(props.size);
	const openSize = Boolean(sizeAnchorEl);

	const [qtyAnchorEl, setQtyAnchorEl] = useState(null);
	const [selectedQty, setSelectedQty] = useState(props.qty);
	const openQty = Boolean(qtyAnchorEl);

	const handleClickSize = (event) => {
		setSizeAnchorEl(event.currentTarget);
	};
	const handleCloseSize = (value) => {
		setSizeAnchorEl(null);
		if (value !== null) {
			setSelectedSize(value);
		}
	};

	const handleClickQty = (event) => {
		setQtyAnchorEl(event.currentTarget);
	};
	const handleCloseQty = (value) => {
		setQtyAnchorEl(null);
		if (value !== null) {
			setSelectedQty(value);
		}
	};
	return (
		<div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.2)] ">
			<div className="img w-[15%] group border border-[rgba(0,0,0,0.2)] rounded-md">
				<Link to="productDetails/123">
					<img
						src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/53-home_default/today-is-a-good-day-framed-poster.jpg"
						alt="CartItem Img"
						className="w-full rounded-md group-hover:scale-105 transition-all"
					/>
				</Link>
			</div>
			<div className="info w-[85%] relative">
				<IoMdClose className="cursor-pointer absolute top-[0px] right-[0px] text-[22px] link transition-all " />
				<span className="text-[13px] ">Sangria</span>
				<h3 className="tetx-[15px] ">
					<Link to="productDetails/123" className="link">
						A-Line Kruti with Sharara & Dupatta
					</Link>
				</h3>

				<Rating name="size-small" defaultValue={4} size="small" readOnly />
				<div className="flex items-center gap-4">
					<div className="relative">
						<span
							className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer gap-1 "
							onClick={handleClickSize}
						>
							Size: {selectedSize} <VscTriangleDown />
						</span>
						<Menu
							id="size-menu"
							anchorEl={sizeAnchorEl}
							open={openSize}
							onClose={() => handleCloseSize(null)}
							MenuListProps={{
								"aria-labelledby": "basic-button",
							}}
						>
							<MenuItem
								sx={{ fontSize: "12px" }}
								onClick={() => handleCloseSize("S")}
							>
								S
							</MenuItem>
							<MenuItem
								sx={{ fontSize: "12px" }}
								onClick={() => handleCloseSize("M")}
							>
								M
							</MenuItem>
							<MenuItem
								sx={{ fontSize: "12px" }}
								onClick={() => handleCloseSize("L")}
							>
								L
							</MenuItem>
							<MenuItem
								sx={{ fontSize: "12px" }}
								onClick={() => handleCloseSize("XL")}
							>
								XL
							</MenuItem>
							<MenuItem
								sx={{ fontSize: "12px" }}
								onClick={() => handleCloseSize("XXl")}
							>
								XXL
							</MenuItem>
						</Menu>
					</div>
					<div className="relative">
						<span
							onClick={handleClickQty}
							className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer gap-1 "
						>
							Qty: {selectedQty} <VscTriangleDown />
						</span>
						<Menu
							id="size-menu"
							anchorEl={qtyAnchorEl}
							open={openQty}
							onClose={() => handleCloseQty(null)}
							MenuListProps={{
								"aria-labelledby": "basic-button",
							}}
						>
							<MenuItem
								sx={{ fontSize: "12px" }}
								onClick={() => handleCloseQty("1")}
							>
								1
							</MenuItem>
							<MenuItem
								sx={{ fontSize: "12px" }}
								onClick={() => handleCloseQty("2")}
							>
								2
							</MenuItem>
							<MenuItem
								sx={{ fontSize: "12px" }}
								onClick={() => handleCloseQty("3")}
							>
								3
							</MenuItem>
							<MenuItem
								sx={{ fontSize: "12px" }}
								onClick={() => handleCloseQty("4")}
							>
								4
							</MenuItem>
							<MenuItem
								sx={{ fontSize: "12px" }}
								onClick={() => handleCloseQty("5")}
							>
								5
							</MenuItem>
							<MenuItem
								sx={{ fontSize: "12px" }}
								onClick={() => handleCloseQty("6")}
							>
								6
							</MenuItem>
							<MenuItem
								sx={{ fontSize: "12px" }}
								onClick={() => handleCloseQty("7")}
							>
								7
							</MenuItem>
							<MenuItem
								sx={{ fontSize: "12px" }}
								onClick={() => handleCloseQty("8")}
							>
								8
							</MenuItem>
							<MenuItem
								sx={{ fontSize: "12px" }}
								onClick={() => handleCloseQty("9")}
							>
								9
							</MenuItem>
							<MenuItem
								sx={{ fontSize: "12px" }}
								onClick={() => handleCloseQty("10")}
							>
								10
							</MenuItem>
						</Menu>
					</div>
				</div>

				<div className="flex items-center gap-4 mt-2 ">
					<span className="pprice  text[14px] font-[600] ">$49.00</span>
					<span className="oldPrice line-through text-gray-500 text-[14px] font[500] ">
						$58.00
					</span>

					<span className="pprice text-[#ff5151] text[12px] font-[500] ">
						20% OFF
					</span>
				</div>
			</div>
		</div>
	);
}

CartItems.propTypes = {
	size: PropTypes.string.isRequired,
	qty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default CartItems;
