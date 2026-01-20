import { Button, CircularProgress, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import QtyBox from "../QtyBox";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { useContext } from "react";
import MyContext from "../../context/MyContext";
import { putData } from "../../utils/api";

function ProductDetailsComponant({ item = {}, gotoReviews }) {
	const {
		isLogin,
		userData,
		addToCart,
		cartData,
		isLoadingAddToCart,
		addToMyList,
		myListData,
		openAlertBox,
		fetchCartData,
	} = useContext(MyContext);

	const isInCart = cartData?.some(
		(cartItem) => cartItem.productId === item._id
	);

	const cartItem = cartData?.find(
		(cartItem) => cartItem.productId === item._id
	);

	const isInMyList = myListData?.some(
		(listItem) => listItem.productId === item._id
	);

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

	const [selectedRam, setSelectedRam] = useState(
		cartItem ? productRam.indexOf(cartItem.ram) : null
	);

	const [selectedSize, setSelectedSize] = useState(
		cartItem ? size.indexOf(cartItem.size) : null
	);

	const [selectedWeight, setSelectedWeight] = useState(
		cartItem ? productWeight.indexOf(cartItem.weight) : null
	);

	const [quantity, setQuantity] = useState(cartItem?.quantity || 1);

	if (!item || Object.keys(item).length === 0) return null;

	const discount =
		oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

	// -----------------------------
	// HANDLE ADD TO CART
	// -----------------------------
	const handleAddToCart = () => {
		// Validate RAM selection
		if (productRam.length > 0 && selectedRam === null) {
			openAlertBox("error", "Please select RAM option.");
			return;
		}

		// Validate Size selection
		if (size.length > 0 && selectedSize === null) {
			openAlertBox("error", "Please select Size option.");
			return;
		}

		// Validate Weight selection
		if (productWeight.length > 0 && selectedWeight === null) {
			openAlertBox("error", "Please select Weight option.");
			return;
		}

		// Extract selected values
		const selectedRamValue =
			selectedRam !== null ? productRam[selectedRam] : null;

		const selectedSizeValue = selectedSize !== null ? size[selectedSize] : null;

		const selectedWeightValue =
			selectedWeight !== null ? productWeight[selectedWeight] : null;

		// CALL ADD TO CART
		addToCart(
			item,
			userData?._id,
			quantity,
			selectedRamValue,
			selectedSizeValue,
			selectedWeightValue
		);
	};

	const updateCart = async (updatedFields) => {
		if (!cartItem?._id) return;

		try {
			await putData("/api/cart/update-item", {
				_id: cartItem._id,
				qty: updatedFields.qty ?? quantity,
				size: updatedFields.size ?? size[selectedSize],
				ram: updatedFields.ram ?? productRam[selectedRam],
				weight: updatedFields.weight ?? productWeight[selectedWeight],
			});
			fetchCartData();
		} catch (error) {
			console.error("Cart update failed:", error);
		}
	};

	return (
		<>
			{/* TITLE */}
			<h1 className="text-[18px] sm:text-[22px] lg:text-[24px] font-[600] mb-2 leading-snug">
				{name}
			</h1>

			{/* BRAND + RATING */}
			<div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[12px] sm:text-[13px]">
				<span className="text-gray-400 text-[13px]">
					Brand: <span className="font-[500] text-black">{brand}</span>
				</span>

				<Rating size="small" value={avgRating || rating} readOnly />

				<span
					className="cursor-pointer underline-offset-2 hover:underline"
					onClick={gotoReviews || (() => {})}
				>
					Reviews {numReviews}
				</span>
			</div>

			{/* PRICE */}
			<div className="flex flex-wrap items-center gap-3 mt-4">
				{oldPrice > price && (
					<span className="line-through text-gray-500 text-[14px] sm:text-[18px] font-[500]">
						₹{oldPrice.toLocaleString()}
					</span>
				)}

				<span className="text-[#ff5252] text-[18px] sm:text-[20px] font-[600]">
					₹{price.toLocaleString()}
				</span>

				{discount > 0 && (
					<span className="text-green-600 text-[13px] sm:text-[14px] font-[600]">
						{discount}% OFF
					</span>
				)}

				<span className="text-[13px] sm:text-[14px]">
					In Stock:
					<span className="text-green-600 font-bold"> {countInStock}</span>
				</span>
			</div>

			{/* DESCRIPTION */}
			<div
				className="description-content text-gray-700 leading-relaxed text-[14px] sm:text-[15px] mt-4 break-words"
				dangerouslySetInnerHTML={{ __html: description }}
			></div>
			{/* RAM OPTIONS */}
			{productRam.length > 0 && (
				<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4">
					<span className="text-[15px] sm:text-[16px]">RAM:</span>

					<div className="flex flex-wrap gap-2 actions">
						{productRam.map((ram, index) => (
							<Button
								key={index}
								size="small"
								className={`!px-3 !py-1 !text-[13px]
				${selectedRam === index && "!bg-[#ff5252] !text-white"}`}
								onClick={() => {
									setSelectedRam(index);
									updateCart({ ram: productRam[index] });
								}}
							>
								{ram}
							</Button>
						))}
					</div>
				</div>
			)}

			{/* SIZE OPTIONS */}
			{size.length > 0 && (
				<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4">
					<span className="text-[15px] sm:text-[16px]">Size:</span>

					<div className="flex flex-wrap gap-2 actions">
						{size.map((sz, index) => (
							<Button
								key={index}
								size="small"
								className={`!px-3 !py-1 !text-[13px]
				${selectedSize === index && "!bg-[#ff5252] !text-white"}`}
								onClick={() => {
									setSelectedSize(index);
									updateCart({ size: size[index] });
								}}
							>
								{sz}
							</Button>
						))}
					</div>
				</div>
			)}

			{/* WEIGHT */}
			{productWeight.length > 0 && (
				<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4">
					<span className="text-[15px] sm:text-[16px]">Weight :</span>

					<div className="flex flex-wrap gap-2 actions">
						{productWeight.map((w, index) => (
							<Button
								key={index}
								size="small"
								className={`!px-3 !py-1 !text-[13px]
				${selectedWeight === index && "!bg-[#ff5252] !text-white"}`}
								onClick={() => {
									setSelectedWeight(index);
									updateCart({ weight: productWeight[index] });
								}}
							>
								{w}
							</Button>
						))}
					</div>
				</div>
				// <p className="text-[14px] mb-4">
				// 	Weight: <span className="font-[600]">{productWeight[0]}</span>
				// </p>
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
						<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
							<div className="w-[80px]">
								<QtyBox
									quantity={quantity}
									setQuantity={(val) => {
										setQuantity(val);
										updateCart({ qty: val });
									}}
									stock={item.countInStock}
								/>
							</div>

							<Button
								className="btn-org w-full sm:w-auto flex gap-2 !py-3 !rounded-full !text-[15px] sm:!text-[16px]"
								onClick={handleAddToCart}
								disabled={isLoadingAddToCart || item?.countInStock <= 0}
							>
								{isLoadingAddToCart ? (
									<CircularProgress size={22} thickness={5} />
								) : item?.countInStock > 0 ? (
									<>
										<HiOutlineShoppingCart className="text-[22px]" />
										Add To Cart
									</>
								) : (
									"Out of Stock"
								)}
							</Button>
						</div>
					)}
				</>
			)}

			{/* WISHLIST + COMPARE */}
			<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-5">
				{/* Add to Wishlist */}
				<button
					onClick={() => {
						if (!isLogin) {
							openAlertBox("error", "Please login to continue");
							return;
						}
						addToMyList(item, userData?._id);
					}}
					className={`
      flex items-center gap-2 px-4 py-2 rounded-full border 
      transition-all duration-300 select-none
      ${
				isInMyList
					? "bg-red-500 border-red-500 text-white hover:bg-red-600"
					: "bg-white border-gray-300 text-gray-700 hover:bg-red-500 hover:text-white"
			}
    `}
				>
					{isInMyList ? (
						<FaHeart className="text-white text-[17px]" />
					) : (
						<FaRegHeart
							className={`
        text-[17px] transition-all duration-300 
        text-gray-700 
        group-hover:text-white
      `}
						/>
					)}
					{isInMyList ? "Added to Wishlist" : "Add to Wishlist"}
				</button>

				{/* Compare Button */}
			</div>
		</>
	);
}

export default ProductDetailsComponant;
