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
			null // Weight
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
					res?.message || "Item not removed from your wishlist."
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
		<div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.2)] ">
			<div className="img w-[15%] group border border-[rgba(0,0,0,0.2)] rounded-md">
				<Link to="productDetails/123">
					<img
						src={data?.image}
						alt={data?.productTitle}
						className="w-full rounded-md group-hover:scale-105 transition-all"
					/>
				</Link>
			</div>
			<div className="info w-[85%] relative">
				<button onClick={() => removeItem(data?._id)}>
					<IoMdClose className="cursor-pointer absolute top-[0px] right-[0px] text-[22px] link transition-all " />
				</button>
				<span className="text-[13px] ">{data?.ProductBrand}</span>
				<h3 className="tetx-[15px] ">
					<Link to={`productDetails/${data?.productId}`} className="link">
						{data?.productTitle}
					</Link>
				</h3>

				<Rating
					name="size-small"
					defaultValue={data?.rating}
					size="small"
					readOnly
				/>

				<div className="flex items-center gap-4 mt-2 mb-2 ">
					<span className="pprice  text[14px] font-[600] ">{data?.price}</span>
					<span className="oldPrice line-through text-gray-500 text-[14px] font[500] ">
						{data?.oldPrice}
					</span>

					<span className="pprice text-[#ff5151] text[12px] font-[500] ">
						{discount}% OFF
					</span>
				</div>

				<br />
				{/* ADD TO CART BUTTON */}
				{isInCart ? (
					<Button
						className="!bg-green-500 !text-white !rounded-full btn-sm"
						disabled
					>
						✓ Added In Cart
					</Button>
				) : (
					<Button
						onClick={handleAddToCart}
						className="btn-org btn-sm flex items-center gap-2 !rounded-full"
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
	);
}

export default MyListItems;
