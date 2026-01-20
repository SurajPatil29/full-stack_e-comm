import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { Button, CircularProgress, Rating } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import MyContext from "../../context/MyContext";
import { deleteDataReview, fetchDataFromApi } from "../../utils/api";

function MyListItems({ data }) {
	const {
		isLogin,
		userData,
		addToCart,
		cartData,
		isLoadingAddToCart,
		openAlertBox,
		fetchMyListData,
	} = useContext(MyContext);

	const [productData, setProductData] = useState({});

	const loadProduct = () => {
		fetchDataFromApi(`/api/product/${data?.productId}`).then((res) => {
			if (!res?.error) {
				setProductData(res?.data);
			}
		});
	};

	useEffect(() => {
		loadProduct();
	}, [data]);

	// -----------------------------
	// CHECK IF ITEM ALREADY IN CART
	// -----------------------------
	const isInCart = cartData?.some((item) => item.productId === data.productId);

	// Prices
	const oldPrice = data?.oldPrice || 0;
	const newPrice = data?.price || 0;

	const discount =
		oldPrice > newPrice
			? Math.round(((oldPrice - newPrice) / oldPrice) * 100)
			: 0;

	// ----------------------------------
	// HANDLE ADD TO CART (copy logic)
	// ----------------------------------
	const handleAddToCart = () => {
		if (!isLogin) {
			openAlertBox("error", "Please login to add items to cart.");
			return;
		}

		// ITEM DOES NOT HAVE RAM / SIZE / WEIGHT
		addToCart(
			productData, // full product
			userData?._id, // user ID
			1, // default qty = 1
			null, // RAM
			null, // Size
			null, // Weight
		);
	};

	const removeItem = async (id) => {
		try {
			// API CALL
			const res = await deleteDataReview(`/api/myList/delete-mylist/${id}`);

			// Success alert
			if (res?.success) {
				openAlertBox("success", "Item removed from your wishlist.");
			} else {
				openAlertBox(
					"error",
					res?.message || "Item not removed from your wishlist.",
				);
			}

			// Refresh My List (if you have function inside context)
			fetchMyListData();
		} catch (error) {
			console.error("Remove wishlist item failed:", error);
			openAlertBox("error", "Failed to remove item. Try again.");
		}
	};

	return (
		<div className="cartItem w-full p-3 pb-5 border-b border-[rgba(0,0,0,0.2)] flex flex-col sm:flex-row gap-4 ">
			<div className="img w-full sm:w-[120px] md:w-[15px] group border border-[rgba(0,0,0,0.2)] rounded-md">
				<Link to="/productDetails/123">
					<img
						src={data?.image}
						alt={data?.productTitle}
						className="w-full h-auto rounded-md object-cover group-hover:scale-105 transition-all"
					/>
				</Link>
			</div>
			<div className="info w-full sm:flex-1 relative">
				<button
					onClick={() => removeItem(data?._id)}
					className="absolute top-2 right-2 sm:top-0 sm:right-0"
				>
					<IoMdClose className="text-[22px] link transition-all" />
				</button>
				<span className="text-[12px] text-gray-500">{data?.ProductBrand}</span>
				<h3 className="text-[14px] sm:text-[15px] font-medium">
					<Link to={`/productDetails/${data?.productId}`} className="link">
						{data?.productTitle}
					</Link>
				</h3>

				<Rating
					name="size-small"
					defaultValue={data?.rating}
					size="small"
					readOnly
				/>

				<div className="flex flex-wrap items-center gap-3 mt-2 mb-2">
					<span className="text-[14px] font-semibold">
						&#8377;{data?.price.toLocaleString()}
					</span>
					<span className="line-through text-gray-500 text-[13px]">
						&#8377;{data?.oldPrice.toLocaleString()}
					</span>

					<span className="text-[#ff5151] text-[12px] font-medium">
						{discount}% OFF
					</span>
				</div>

				<br />
				{/* ADD TO CART BUTTON */}
				<div className="mt-3">
					{isInCart ? (
						<Button
							className="!bg-green-500 !text-white !rounded-full btn-sm w-full sm:w-auto"
							disabled
						>
							✓ Added In Cart
						</Button>
					) : (
						<Button
							onClick={handleAddToCart}
							className="btn-org btn-sm flex items-center justify-center gap-2 !rounded-full w-full sm:w-auto"
							disabled={isLoadingAddToCart}
						>
							{isLoadingAddToCart ? (
								<CircularProgress size={20} thickness={5} />
							) : (
								"Add to Cart"
							)}
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}

export default MyListItems;
