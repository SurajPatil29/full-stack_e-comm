import { Button, CircularProgress, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { IoBagCheck } from "react-icons/io5";
import MyContext from "../../context/MyContext";
import { deleteDataReview, postData } from "../../utils/api";
import { useLocation, useNavigate } from "react-router-dom";

const VITE_APP_RAZORPAY_KEY_ID = import.meta.env.VITE_APP_RAZORPAY_KEY_ID;

function Checkout() {
	const context = useContext(MyContext);
	const Addresses = context?.userData?.address_details;
	const cartData = context?.cartData || [];
	const [addressIsLoading, setAddressIsLoading] = useState(false);
	const [paymentMethod, setPaymentMethod] = useState("razorpay");

	const navigate = useNavigate();

	const location = useLocation();
	const { selectedProductsIds = [] } = location.state || [];

	// Get only selected cart items
	const selectedCartItems = cartData.filter((item) =>
		selectedProductsIds.includes(item._id)
	);

	const totalItems = selectedCartItems.reduce(
		(acc, item) => acc + (item.quantity || 1),
		0
	);

	const totalAmount = selectedCartItems.reduce(
		(acc, item) => acc + (item.subTotal || 0),
		0
	);

	const selectedAddressId = Addresses?.find(
		(item) => item.status === true
	)?._id;

	const name = context?.userData?.name;

	// console.log("Selected Cart Items:", selectedCartItems);

	useEffect(() => {
		window.scrollTo(0, 0);
		// if (selectedProductsIds) navigate("/");
	}, []);

	const handleDeleteAddress = async (id) => {
		const res = await deleteDataReview(`/api/address/delete/${id}`);

		if (res?.error) {
			return context.openAlertBox("error", res.message);
		}

		context.openAlertBox("success", res.message);

		// Refresh address list after delete
		context.loadUserDetails();
	};

	const handleDefaultAddressSelection = async (addressId) => {
		// ❌ Guard: invalid id
		if (!addressId) {
			return context.openAlertBox("error", "Invalid address");
		}

		// ❌ Prevent double click / multiple requests
		if (addressIsLoading) return;

		try {
			setAddressIsLoading(true);

			const res = await postData("/api/address/set-default", { addressId });

			// ❌ Backend-level error
			if (res?.error) {
				context.openAlertBox(
					"error",
					res.message || "Failed to select address"
				);
				return;
			}

			context.openAlertBox("success", "Address selected");

			// ✅ Reload user & addresses
			await context.loadUserDetails();
		} catch (error) {
			console.error("Set default address error:", error);
			context.openAlertBox("error", "Network error. Please try again");
		} finally {
			setAddressIsLoading(false);
		}
	};

	const handlePayment = async () => {
		if (!selectedAddressId) {
			return context.openAlertBox("error", "Select delivery address");
		}

		if (paymentMethod === "cod") {
			return placeOrder("cod", "pending");
		}

		if (paymentMethod === "razorpay") {
			return initiateRazorpay();
		}

		if (paymentMethod === "paypal") {
			// return initiatePaypal();
		}
	};

	const placeOrder = async (method, status, paymentId = "") => {
		if (!selectedCartItems?.length) {
			return context.openAlertBox("error", "No items selected");
		}

		if (!selectedAddressId) {
			return context.openAlertBox("error", "Select delivery address");
		}

		try {
			const orderPayload = {
				products: selectedCartItems,
				delivery_address: selectedAddressId,
				totalAmt: totalAmount,
				payment_method: method,
				payment_status: status,
				paymentId,
			};

			const orderRes = await postData("/api/order/create", orderPayload);

			if (orderRes?.error) {
				return context.openAlertBox(
					"error",
					orderRes.message || "Order failed"
				);
			}

			context.openAlertBox("success", "Order placed successfully");

			// delete selected cart items
			await Promise.all(
				selectedCartItems.map((item) =>
					deleteDataReview(`/api/cart/delete-cart-item/${item._id}`)
				)
			);

			await context.fetchCartData();

			navigate("/order-success", {
				state: { orderId: orderRes.order._id },
			});
		} catch (error) {
			console.error("Place order error:", error);
			context.openAlertBox("error", "Something went wrong. Try again.");
		}
	};

	const initiateRazorpay = () => {
		context.openAlertBox(
			"info",
			<div>
				<strong>⚠ Razorpay Test Mode (Not a Real Payment)</strong>
				<p style={{ marginTop: "6px" }}>
					This is a test transaction. No real money will be deducted.
				</p>
				<p style={{ marginTop: "6px" }}>Use Razorpay test credentials:</p>
				<p>
					Mobile: <b>9999999999</b>
					<br />
					OTP: <b>123456</b>
				</p>
			</div>
		);

		// ⏳ Small delay so user can read alert
		setTimeout(() => {
			const options = {
				key: import.meta.env.VITE_APP_RAZORPAY_KEY_ID,
				amount: Math.round(totalAmount * 100),
				currency: "INR",
				name: "New ClassyShop",
				description: "Order Payment",

				handler: async function (response) {
					const paymentId = response.razorpay_payment_id;
					await placeOrder("razorpay", "success", paymentId);
				},

				prefill: {
					name: context?.userData?.name || "Test User",
					email: context?.userData?.email || "test@example.com",
					contact: "9999999999",
				},

				theme: {
					color: "#ff5252",
				},
			};

			new window.Razorpay(options).open();
		}, 5000); // delay for better UX
	};

	return (
		<section className="py-10">
			<div className="container flex gap-5">
				<div className="leftCol w-[70%] pl-20 ">
					<div className="flex justify-between items-center ">
						<h3 className="text-xl font-semibold">Addresses</h3>

						{Addresses?.length > 0 && (
							<Button
								variant="contained"
								onClick={() => context.setOpenAddressPanel(true)}
								sx={{
									backgroundColor: "#ff5151",
									"&:hover": { backgroundColor: "#e64545" },
								}}
							>
								Add New Address
							</Button>
						)}
					</div>
					<div className="pl-20 relative">
						{addressIsLoading && (
							<div className="absolute inset-0 z-10 bg-white/60 flex items-center justify-center rounded-lg">
								<CircularProgress size={40} color="error" />
							</div>
						)}
						{Addresses?.length > 0 ? (
							Addresses?.map((item, i) => (
								<div
									key={i}
									className={`my-4 p-4 rounded-lg w-[70%] transition-all cursor-pointer
					${
						item.status
							? "border-2 border-[#ff5151] bg-[#fff5f5] shadow-md"
							: "border bg-white shadow-sm hover:shadow-md"
					}
					${addressIsLoading ? "pointer-events-none opacity-60" : ""}
				`}
									onClick={() =>
										!addressIsLoading && handleDefaultAddressSelection(item._id)
									}
								>
									<div className="flex gap-4 items-start">
										{/* Radio for Default */}
										<input
											type="radio"
											name="selectedAddress"
											checked={item.status === true}
											readOnly
											className="mt-1 h-4 w-4 cursor-pointer accent-[#ff5151]"
										/>

										{/* Address Info */}
										<div className="flex-1">
											<div className="flex items-center justify-between">
												<p className="text-[15px] font-semibold text-gray-900">
													{item.addressType} Address
												</p>

												{item.status === true && (
													<span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">
														DEFAULT
													</span>
												)}
											</div>

											<p className="text-gray-900 font-medium mt-1">
												{item.name}
											</p>

											<p className="text-gray-700 mt-1 leading-5">
												{item.address_line}, {item.city}, {item.state} -{" "}
												{item.pincode}
											</p>

											{item.landmark && (
												<p className="text-gray-800 font-medium text-sm mt-1">
													Landmark : {item.landmark}
												</p>
											)}

											<p className="text-gray-800 font-medium text-sm mt-1">
												Phone : {item.mobile}
											</p>
											{item.status === true && (
												<button className="w-[90%] bg-[#ff5151] text-white rounded-md  !capitalize py-2 ">
													Deliver to this Address
												</button>
											)}
										</div>
									</div>

									{/* Divider */}
									<div className="border-t my-3 border-orange-300"></div>

									{/* Actions */}
									<div className="flex justify-end gap-4">
										<button
											type="button"
											onClick={() => handleDeleteAddress(item._id)}
											className="text-red-500 hover:text-red-700 font-semibold text-sm"
										>
											DELETE
										</button>
									</div>
								</div>
							))
						) : (
							// ⭐ Fallback UI
							<div className="my-6 p-6 border rounded-lg bg-white shadow flex flex-col items-center justify-center text-center">
								<img
									src="https://cdn-icons-png.flaticon.com/512/4076/4076505.png"
									alt="empty"
									className="w-20 opacity-70 mb-3"
								/>

								<h3 className="text-lg font-semibold text-gray-700">
									No Address Found
								</h3>

								<p className="text-sm text-gray-500 mt-1">
									Add a new address to get started.
								</p>

								<Button
									onClick={() => context.setOpenAddressPanel(true)}
									className="!mt-4 !px-6 !py-2 !rounded-full !text-white"
									style={{ backgroundColor: "#ff5252" }}
								>
									Add New Address
								</Button>
							</div>
						)}
					</div>
				</div>

				<div className="rightCol w-[30%] ">
					<div className="card shadow-md bg-white p-5 rounded-md">
						<h2 className="mb-4 ">Your Order</h2>

						<div className="flex items-center justify-between py-3 border-t border-b border-[rgba(0,0,0,0.1)] ">
							<span className="text-[14px] font-[600] "> Product</span>
							<span className="text-[14px] font-[600]">Subtotal</span>
						</div>

						<div className="scroll max-h-[300px] overflow-x-hidden overflow-y-scroll ">
							{selectedCartItems?.length > 0 &&
								selectedCartItems?.map((item, i) => (
									<div
										className="flex items-center justify-between py-2"
										key={i}
									>
										<div className="part1 flex items-center gap-3">
											<div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer ">
												<img
													src={item?.image}
													alt={item?.productTitle}
													className="w-full transition-all group-hover:scale-105"
												/>
											</div>

											<div className="info">
												<h4 className="text-[14px] " title={item?.productTitle}>
													{item?.productTitle?.length > 30
														? item.productTitle.slice(0, 30) + "..."
														: item.productTitle}
												</h4>
												<span className="text-[13px]">
													Qty : {item?.quantity}
												</span>
											</div>
										</div>

										<span className="text-[14px] font-[500] ">
											&#8377;{item?.subTotal.toLocaleString()}
										</span>
									</div>
								))}
						</div>
						<div className="mt-4 border-t pt-4">
							<div className="flex justify-between mb-2">
								<span className="text-[14px] font-semibold">
									Total products
								</span>
								<span className="text-[14px] font-semibold">
									{selectedCartItems?.length}
								</span>
							</div>

							<div className="flex justify-between mb-2">
								<span className="text-[14px] font-semibold">Total Items</span>
								<span className="text-[14px] font-semibold">
									{totalItems.toLocaleString()}
								</span>
							</div>

							<div className="flex justify-between mb-2">
								<span className="text-[14px] font-semibold">Total Amount</span>
								<span className="text-[14px] font-semibold">
									₹ {totalAmount.toLocaleString()}
								</span>
							</div>

							<div className="mt-4">
								<h3 className="text-sm font-semibold mb-2">Payment Method</h3>

								<div className="space-y-3">
									{/* Razorpay */}
									<label className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:border-[#ff5151]">
										<input
											type="radio"
											name="paymentMethod"
											value="razorpay"
											checked={paymentMethod === "razorpay"}
											onChange={() => setPaymentMethod("razorpay")}
										/>
										<img
											src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1765700190/razorpay_pgrldg.png"
											className="w-6"
										/>
										<span className="font-medium">Razorpay</span>
									</label>

									{/* PayPal */}
									<label className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:border-[#ff5151]">
										<input
											type="radio"
											name="paymentMethod"
											value="paypal"
											checked={paymentMethod === "paypal"}
											onChange={() => setPaymentMethod("paypal")}
										/>
										<img
											src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1765700086/paypal_jgwy0b.svg"
											className="w-6"
										/>
										<span className="font-medium">PayPal</span>
									</label>

									{/* COD */}
									<label className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:border-[#ff5151]">
										<input
											type="radio"
											name="paymentMethod"
											value="cod"
											checked={paymentMethod === "cod"}
											onChange={() => setPaymentMethod("cod")}
										/>
										🚚 <span className="font-medium">Cash on Delivery</span>
									</label>
								</div>
							</div>

							<Button
								variant="contained"
								fullWidth
								sx={{
									backgroundColor: "#ff5151",
									mt: 3,
									py: 1.2,
									"&:hover": { backgroundColor: "#e64545" },
								}}
								onClick={handlePayment}
							>
								<IoBagCheck className="text-[20px] mr-2" />
								{paymentMethod === "cod"
									? "Place Order"
									: `Pay ₹${totalAmount.toLocaleString()}`}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Checkout;
