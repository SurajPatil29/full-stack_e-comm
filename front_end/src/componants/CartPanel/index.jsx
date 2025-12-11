import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { Button } from "@mui/material";
import { deleteDataReview, putData } from "../../utils/api";
import { useContext, useState } from "react";
import MyContext from "../../context/MyContext";
import { BsBagCheck } from "react-icons/bs";

function CartPanel({ data }) {
	const context = useContext(MyContext);

	const [selectedIds, setSelectedIds] = useState([]);

	const handleSelectChange = (id, checked) => {
		setSelectedIds((prev) =>
			checked ? [...prev, id] : prev.filter((item) => item !== id)
		);
	};

	const removeItem = async (id, productId, updatedStockQty) => {
		try {
			// DELETE CART ITEM
			const res = await deleteDataReview(`/api/cart/delete-cart-item/${id}`);

			if (res.error === false) {
				context.openAlertBox("success", "Item removed successfully");

				// UPDATE PRODUCT STOCK
				await putData(`/api/product/updateProduct/${productId}`, {
					countInStock: updatedStockQty,
				});

				// REFETCH CART
				context.fetchCartData();
			} else {
				context.openAlertBox("error", res.message || "Item not removed");
			}
		} catch (error) {
			context.openAlertBox("error", "Something went wrong!");
			console.error(error);
		}
	};

	const getTotal = context.cartData
		.filter((item) => selectedIds.includes(item._id))
		.reduce((sum, item) => sum + (item.subTotal || 0), 0);

	// console.log(getTotal);

	return (
		<>
			<div className="scroll w-full max-h-[400px] overflow-y-scroll overflow-hidden ">
				{data?.map((item, i) => (
					<div
						className="cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.3)] mb-2 "
						key={i}
					>
						<input
							type="checkbox"
							checked={selectedIds.includes(item._id)}
							onChange={(e) => handleSelectChange(item._id, e.target.checked)}
							className="w-4 h-4 accent-[#ff5151] cursor-pointer"
						/>
						<div className="img w-[25%] border border-[rgba(0,0,0,0.1)] rounded-md group ">
							<Link to={`/productDetails/${item?.productId}`} className="block">
								<img
									className="w-full h-[80px] rounded-md group-hover:scale-105 "
									src={item?.image}
									alt={item?.productTitle}
								/>
							</Link>
						</div>

						<div className="w-[75%] pr-7 relative ">
							<h4 className="text-[14px] font-[500] " title={item.productTitle}>
								<Link
									className="link"
									to={`/productDetails/${item?.productId}`}
								>
									{item?.productTitle?.length > 30
										? item.productTitle.slice(0, 30) + "..."
										: item.productTitle}
								</Link>
							</h4>
							<h4 className="text-[14px] font-[400] ">{item?.ProductBrand}</h4>
							<p className="flex items-center gap-5">
								<span>
									Qty : <span>{item.quantity}</span>
								</span>{" "}
								<span className="text-[#ff5151] font-bold">
									price : &#8377;{item?.price}
								</span>
							</p>
							<Button
								className="!absolute !top-[2px] !right-[2px] rounded-full !w-[22px] !min-w-[22px] !h-[22px]  !bg-[#f1f1f1] !text-black !p-0"
								onClick={() =>
									removeItem(
										item?._id,
										item?.productId,
										item.countInStock + item.quantity
									)
								}
							>
								<MdDeleteOutline className="text-[#ff5151] text-[18px] " />
							</Button>
						</div>
					</div>
				))}
				{/* <div className="cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.3)] mb-2 ">
					<div className="img w-[25%] border border-[rgba(0,0,0,0.1)] rounded-md group ">
						<Link to="/productDetails/123" className="block">
							<img
								className="w-full h-[80px] rounded-md group-hover:scale-105 "
								src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/71-home_default/mug-today-is-a-good-day.jpg"
								alt="productimg"
							/>
						</Link>
					</div>

					<div className="w-[75%] pr-7 relative ">
						<h4 className="text-[14px] font-[500] ">
							<Link className="link" to="/productDetails/123">
								Mens Cotton Casual Short Sleeve T-Shirts
							</Link>
						</h4>
						<h4 className="text-[13px] font-[500]">T-Shirt</h4>
						<p className="flex items-center gap-5">
							<span>
								Qty : <span> 2</span>
							</span>{" "}
							<span className="text-[#ff5151] font-bold">price : $25</span>
						</p>
						<Button className="!absolute !top-[2px] !right-[2px] rounded-full !w-[22px] !min-w-[22px] !h-[22px]  !bg-[#f1f1f1] !text-black !p-0">
							<MdDeleteOutline className="text-[#ff5151] text-[18px] " />
						</Button>
					</div>
				</div> */}
			</div>

			<div className="bottomSec absolute bottom-[10px] left-[10px] w-[95%] !overflow-hidden ">
				<div className="bottomInfo py-3 mt-1 w-full border-t border-[rgba(0,0,0,0.1)] flex items-center justify-between flex-col">
					<br />
					<div className="flex items-center justify-between w-full">
						<span className="text-black font-[500]">
							{context.cartData.length} item
						</span>
						<span className="text-[#ff5151] font-bold"> &#8377;{getTotal}</span>
					</div>
				</div>

				<div className="bottomInfo py-3 my-2 w-full border-t border-[rgba(0,0,0,0.1)] flex items-center justify-between flex-col">
					<div className="flex items-center justify-between w-full">
						<span className="text-black font-[500]">Total (tax excl)</span>
						<span className="text-[#ff5151] font-bold"> &#8377;{getTotal}</span>
					</div>
				</div>

				<div className="flex items-center justify-center w-full gap-5">
					{/* VIEW CART BUTTON */}
					<Link to="/cart" className="w-[50%] d-block link">
						<Button
							className="btn-org btn-lg w-full"
							onClick={() => context.setOpenCartPanel(false)}
						>
							VIEW CART
						</Button>
					</Link>

					{/* CHECKOUT BUTTON - DISABLED IF NO ITEMS SELECTED */}
					{selectedIds.length === 0 ? (
						<div className="w-[50%] d-block link">
							<Button
								className="btn-org btn-lg w-full flex gap-3 opacity-50 cursor-not-allowed"
								onClick={() => {
									context.openAlertBox(
										"error",
										"Please select at least one product!"
									);
								}}
							>
								Checkout
							</Button>
						</div>
					) : (
						<Link
							to="/checkout"
							state={{ selectedIds }}
							className="w-[50%] d-block link"
							onClick={() => context.setOpenCartPanel(false)}
						>
							<Button className="btn-org btn-lg w-full flex gap-3">
								Checkout
							</Button>
						</Link>
					)}
				</div>
			</div>
		</>
	);
}

export default CartPanel;
