import { Button } from "@mui/material";
import { BsBagCheck } from "react-icons/bs";

import CartItems from "./CartItems";
import { useContext, useEffect, useState } from "react";
import MyContext from "../../context/MyContext";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import SkeletonCart from "./SkeletonCartItem";
import SkeletonCartTotal from "./SkeletonCartTotal";

/* ================= CONSTANT ================= */
const RAZORPAY_MAX_AMOUNT = 25000;

/* ============ WARNING COMPONENT ============ */
function RazorpayLimitWarning({ amount, limit }) {
	if (amount <= limit) return null;

	return (
		<p className="text-red-500 text-sm mt-2 flex items-center gap-1">
			⚠ Maximum Online payment allowed is ₹{limit.toLocaleString()}
		</p>
	);
}

function CartPage() {
	const context = useContext(MyContext);
	const [localLoading, setLocalLoading] = useState(true);
	const [selectedProductsIds, setSelectedProductsIds] = useState([]);

	const handleSelectChange = (id, checked) => {
		setSelectedProductsIds((prev) =>
			checked ? [...prev, id] : prev.filter((item) => item !== id)
		);
	};

	useEffect(() => {
		window.scrollTo(0, 0);

		// Create 1 sec loading delay
		const timer = setTimeout(() => {
			setLocalLoading(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);
	// console.log(context.cartData);
	const totalSubtotal = context.cartData
		.filter((item) => selectedProductsIds.includes(item._id))
		.reduce((sum, item) => sum + (item.subTotal || 0), 0);

	return (
		<section className="section py-10 px-5">
			<div className="container w-[80%] min-w-[80%] flex gap-5">
				<div className="leftPart w-[70%]">
					<div className="shadow-md rounded-md  bg-white">
						<div className="py-2 px-3 border-b border-[rgba(0,0,0,0.2)] ">
							<h2>Your Cart</h2>

							<p className="mt-0">
								There are{" "}
								<span className="font-bold text-[#ff5151]">
									{context.cartData.length}
								</span>{" "}
								products in your cart
							</p>
						</div>
						{localLoading ? (
							<SkeletonCart count={3} />
						) : context.cartData.length > 0 ? (
							context.cartData.map((item, i) => (
								<CartItems
									data={item}
									key={i}
									selected={selectedProductsIds.includes(item._id)}
									onSelectChange={handleSelectChange}
								/>
							))
						) : (
							<div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
								{/* Icon Box */}
								<div
									className="w-20 h-20 flex items-center justify-center rounded-full"
									style={{ backgroundColor: "rgba(255, 82, 82, 0.1)" }}
								>
									<IoCartOutline
										className="text-4xl"
										style={{ color: "#ff5252" }}
									/>
								</div>

								<h3
									className="text-lg font-semibold"
									style={{ color: "#ff5252" }}
								>
									Your cart is empty
								</h3>

								<p className="text-sm text-gray-500">
									Add items to your cart to see them here.
								</p>

								<Link to="/">
									<Button
										className="!mt-3 !px-6 !py-2 !rounded-full !text-white"
										style={{ backgroundColor: "#ff5252" }}
									>
										Start Shopping
									</Button>
								</Link>
							</div>
						)}
					</div>
				</div>

				<div className="rightPart w-[30%]">
					{localLoading ? (
						<SkeletonCartTotal />
					) : (
						<div className="shadow-md rounded-md bg-white p-5 sticky top-[155px]">
							<h3>Cart Total</h3>
							<hr />

							<p className="flex items-center justify-between">
								<span className="text-[14px] font-[500]">Subtotal</span>
								<span className="text-[#ff5151] font-bold">
									₹{totalSubtotal.toLocaleString()}
								</span>
							</p>

							<p className="flex items-center justify-between">
								<span className="text-[14px] font-[500]">Shipping</span>
								<span className="font-bold">Free</span>
							</p>

							<p className="flex items-center justify-between">
								<span className="text-[14px] font-[500]">Total</span>
								<span className="text-[#ff5151] font-bold">
									₹{totalSubtotal.toLocaleString()}
								</span>
							</p>

							{/* ⚠ Razorpay Limit Warning */}
							<RazorpayLimitWarning
								amount={totalSubtotal}
								limit={RAZORPAY_MAX_AMOUNT}
							/>

							{/* ============ CHECKOUT BUTTON LOGIC ============ */}
							{selectedProductsIds.length === 0 ? (
								<Button
									className="btn-org btn-lg w-full flex gap-3 opacity-50 cursor-not-allowed"
									onClick={() =>
										context.openAlertBox(
											"error",
											"Please select at least one product"
										)
									}
								>
									<BsBagCheck className="text-[20px]" /> Checkout
								</Button>
							) : totalSubtotal > RAZORPAY_MAX_AMOUNT ? (
								<Button
									className="btn-org btn-lg w-full flex gap-3 opacity-50 cursor-not-allowed"
									onClick={() =>
										context.openAlertBox(
											"error",
											"Razorpay supports payments up to ₹25,000 only"
										)
									}
								>
									<BsBagCheck className="text-[20px]" /> Checkout
								</Button>
							) : (
								<Link
									to="/checkout"
									state={{ selectedProductsIds }}
									className="w-full d-block link"
								>
									<Button className="btn-org btn-lg w-full flex gap-3">
										<BsBagCheck className="text-[20px]" /> Checkout
									</Button>
								</Link>
							)}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}

export default CartPage;
