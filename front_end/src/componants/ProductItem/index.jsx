import { Link } from "react-router-dom";
import "../ProductItem/style.css";
import Rating from "@mui/material/Rating";
import { FaMinus, FaPlus, FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";
import { Button, CircularProgress } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { useContext, useState } from "react";
import MyContext from "../../context/MyContext";
import { HiOutlineShoppingCart } from "react-icons/hi";

function ProductItem({ item }) {
	// this componant use for shocase product info on home page
	const {
		setOpenProductDetailsModel,
		userData,
		addToCart,
		isLogin,
		cartData,
		isLoadingAddToCart,
	} = useContext(MyContext);

	const [quantity, setQuantity] = useState(1);
	const [addQty, setAddQty] = useState(false);

	// Fallback images (if no images found)
	const mainImg = item?.images?.[0] ?? "/placeholder.jpg";
	const hoverImg = item?.images?.[1] ?? item?.images?.[0] ?? "/placeholder.jpg";

	// Calculate discount dynamically
	const oldPrice = item?.oldPrice || 0;
	const newPrice = item?.price || 0;
	const discount =
		oldPrice > 0 ? Math.round(((oldPrice - newPrice) / oldPrice) * 100) : 0;

	const isInCart = cartData?.some(
		(cartItem) => cartItem.productId === item._id
	);

	return (
		<div className="productItem shadow-md rounded-md overflow-hidden border-2 border-[rgba(0,0,0,0.1)]">
			{/* IMAGE */}
			<div className="group imgWrapper w-[100%] overflow-hidden rounded-md relative">
				<Link to={`/productDetails/${item?._id}`}>
					<div className="img h-[220px] overflow-hidden">
						<img
							src={mainImg}
							alt={item?.name}
							className="w-full h-[220px] object-cover"
						/>

						<img
							src={hoverImg}
							alt={item?.name}
							className="w-full h-[220px] object-cover transition-all duration-500 absolute top-0 left-0 opacity-0 group-hover:opacity-100"
						/>
					</div>
				</Link>

				{/* DISCOUNT BADGE */}
				{discount > 0 && (
					<span className="discount flex items-center absolute top-[10px] left-[10px] z-auto bg-[#ff5151] text-white rounded-lg p-1 text-[10px] font-[500]">
						{discount}%
					</span>
				)}

				{/* ACTION HOVER BUTTONS */}
				<div className="actions absolute top-[-200px] right-[1px] z-50 flex items-center gap-4 flex-col w-[80px] transition-all duration-700 group-hover:top-[15px] opacity-0 group-hover:opacity-100">
					<Tooltip title="View" placement="left-start">
						<Button
							onClick={() =>
								setOpenProductDetailsModel({
									open: true,
									item: item,
								})
							}
							className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-[#ff5151] hover:text-white group "
						>
							<MdZoomOutMap className="text-[18px] !text-black group-hover:text-white" />
						</Button>
					</Tooltip>

					<Tooltip title="Favourite" placement="left-start">
						<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-[#ff5151] hover:text-white group ">
							<FaRegHeart className="text-[18px] !text-black group-hover:text-white" />
						</Button>
					</Tooltip>

					<Tooltip title="Compare" placement="left-start">
						<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-[#ff5151] hover:text-white group ">
							<IoGitCompareOutline className="text-[18px] !text-black group-hover:text-white" />
						</Button>
					</Tooltip>
				</div>
			</div>

			{/* PRODUCT INFO */}
			<div className="info p-3 py-4 bg-[#f8f6f6]">
				<h5 className="text-[14px] !font-[400]">
					<Link to={`/productDetails/${item?._id}`} className="link">
						{item?.brand || "Brand"}
					</Link>
				</h5>

				<h2 className="text-[15px] title mt-1 font-[500] text-[rgba(0,0,0)] mb-1">
					<Link to={`/productDetails/${item?._id}`} className="link">
						{item?.name?.substr(0, 50) + "..."}
					</Link>
				</h2>

				{/* RATING */}
				<Rating
					name="read-only"
					value={item?.rating || 0}
					size="small"
					readOnly
				/>

				{/* PRICE SECTION */}
				<div className="flex items-center gap-4">
					{oldPrice > newPrice && (
						<span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">
							₹{oldPrice.toLocaleString()}
						</span>
					)}
					<span className="newPrice text-[#ff5151] text-[15px] font-[600]">
						₹{newPrice.toLocaleString()}
					</span>
				</div>
				{isLogin && (
					<div className="mt-4 text-center space-y-4">
						{/* Quantity Selector */}
						{addQty && !isInCart && (
							<div className="flex items-center justify-center gap-4">
								<div className="flex items-center justify-between w-full bg-white shadow-sm border rounded-full overflow-hidden ">
									{/* Minus Button */}
									<button
										className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition"
										onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
									>
										<FaMinus className="text-gray-700 text-sm" />
									</button>

									<span className="text-lg font-semibold mx-4">{quantity}</span>

									{/* Plus Button */}
									<button
										className="w-8 h-8 flex items-center justify-center bg-red-500 text-white hover:bg-red-600 transition"
										onClick={() =>
											setQuantity((prev) =>
												Math.min(Math.min(item.countInStock, 10), prev + 1)
											)
										}
									>
										<FaPlus className="text-sm" />
									</button>
								</div>
							</div>
						)}

						{/* BUTTON SECTION */}
						{isInCart ? (
							<Button
								className="!w-full !py-3 !text-[16px] !rounded-full !bg-green-500 hover:!bg-green-600 !text-white !shadow-md cursor-default"
								disabled
							>
								✓ Already in Cart
							</Button>
						) : (
							<Button
								className={`btn-org gap-2 w-full !py-3 !text-[16px] !rounded-full shadow-md transition 
			${item?.countInStock === 0 ? "!bg-gray-300 !cursor-not-allowed" : ""}`}
								disabled={item?.countInStock <= 0 || isLoadingAddToCart}
								onClick={() => {
									if (!addQty) {
										setAddQty(true);
									} else {
										addToCart(item, userData?._id, quantity);
										setAddQty(false);
									}
								}}
							>
								{isLoadingAddToCart ? (
									<CircularProgress size={22} thickness={5} />
								) : item?.countInStock > 0 ? (
									<>
										<HiOutlineShoppingCart className="text-[20px]" />
										{addQty ? "Confirm Add" : "Add to Cart"}
									</>
								) : (
									"Out of Stock"
								)}
							</Button>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

export default ProductItem;
