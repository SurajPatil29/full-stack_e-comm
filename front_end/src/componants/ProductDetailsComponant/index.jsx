import { Button, Rating } from "@mui/material";
import { useState } from "react";
import QtyBox from "../QtyBox";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { useContext } from "react";
import MyContext from "../../context/MyContext";

function ProductDetailsComponant({ item, gotoReviews }) {
	const [selectedSize, setSelectedSize] = useState(null);
	const [selectedRam, setSelectedRam] = useState(null);
	const { isLogin, userData, addToCart, cartData } = useContext(MyContext);
	const [quantity, setQuantity] = useState(1);

	const isInCart = cartData?.some(
		(cartItem) => cartItem.productId === item._id
	);

	if (!item || Object.keys(item).length === 0) return null;

	const {
		name,
		brand,
		rating,
		price,
		oldPrice,
		countInStock,
		description,
		size = [],
		productRam = [],
		productWeight = [],
		avgRating,
		numReviews = 0,
	} = item;
	const discount =
		oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

	return (
		<>
			{/* TITLE */}
			<h1 className="text-[24px] font-[600] mb-2">{name}</h1>

			{/* BRAND + RATING */}
			<div className="flex items-center gap-3">
				<span className="text-gray-400 text-[13px]">
					Brand: <span className="font-[500] text-black">{brand}</span>
				</span>

				<Rating size="small" value={avgRating || rating} readOnly />

				<span
					className="text-[13px] cursor-pointer"
					onClick={gotoReviews || (() => {})}
				>
					Reviews {numReviews}
				</span>
			</div>

			{/* PRICE */}
			<div className="flex items-center gap-4 mt-4">
				{oldPrice > price && (
					<span className="line-through text-gray-500 text-[18px] font-[500]">
						₹{oldPrice}
					</span>
				)}

				<span className="text-[#ff5252] text-[18px] font-[600]">₹{price}</span>

				{discount > 0 && (
					<span className="text-green-600 text-[14px] font-[600]">
						{discount}% OFF
					</span>
				)}

				<span className="text-[14px]">
					In Stock:
					<span className="text-green-600 font-bold"> {countInStock}</span>
				</span>
			</div>

			{/* DESCRIPTION */}
			<div
				className="description-content text-gray-700 leading-relaxed"
				dangerouslySetInnerHTML={{ __html: description }}
			></div>
			{/* RAM OPTIONS */}
			{productRam.length > 0 && (
				<div className="flex items-center gap-3 mb-4">
					<span className="text-[16px]">RAM:</span>

					<div className="flex items-center gap-1 actions">
						{productRam.map((ram, index) => (
							<Button
								key={index}
								className={`${
									selectedRam === index && "!bg-[#ff5252] !text-white"
								}`}
								onClick={() => setSelectedRam(index)}
							>
								{ram}
							</Button>
						))}
					</div>
				</div>
			)}

			{/* SIZE OPTIONS */}
			{size.length > 0 && (
				<div className="flex items-center gap-3 mb-4">
					<span className="text-[16px]">Size:</span>

					<div className="flex items-center gap-1 actions">
						{size.map((sz, index) => (
							<Button
								key={index}
								className={`${
									selectedSize === index && "!bg-[#ff5252] !text-white"
								}`}
								onClick={() => setSelectedSize(index)}
							>
								{sz}
							</Button>
						))}
					</div>
				</div>
			)}

			{/* WEIGHT */}
			{productWeight.length > 0 && (
				<p className="text-[14px] mb-4">
					Weight: <span className="font-[600]">{productWeight[0]}</span>
				</p>
			)}

			{/* QTY + ADD TO CART */}
			{isLogin && (
				<>
					{isInCart ? (
						<Button
							className="!w-full !py-3 !text-[16px] !rounded-full !bg-green-500 hover:!bg-green-600 !text-white !shadow-md cursor-default"
							disabled
						>
							✓ Already in Cart
						</Button>
					) : (
						<div className="flex items-center mt-4 gap-4">
							<div className="w-[70px]">
								<QtyBox
									quantity={quantity}
									setQuantity={setQuantity}
									stock={item.countInStock}
								/>
							</div>

							<Button
								className="btn-org flex gap-2"
								onClick={() => addToCart(item, userData?._id, quantity)}
							>
								<HiOutlineShoppingCart className="text-[22px]" />
								Add To Cart
							</Button>
						</div>
					)}
				</>
			)}

			{/* WISHLIST + COMPARE */}
			<div className="flex items-center gap-4 mt-4">
				<span className="flex items-center gap-3 text-[14px] font-[500] cursor-pointer">
					<FaRegHeart className="text-[18px]" /> Add to Wishlist
				</span>

				<span className="flex items-center gap-3 text-[14px] font-[500] cursor-pointer">
					<IoGitCompareOutline className="text-[18px]" /> Add to Compare
				</span>
			</div>
		</>
	);
}

export default ProductDetailsComponant;
