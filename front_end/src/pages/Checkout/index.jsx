import { Button, TextField } from "@mui/material";
import { useContext, useEffect } from "react";
import { IoBagCheck } from "react-icons/io5";
import MyContext from "../../context/MyContext";
import { deleteDataReview, postData } from "../../utils/api";
import { useLocation } from "react-router-dom";

function Checkout() {
	const context = useContext(MyContext);
	const Addresses = context?.userData?.address_details;
	const cartData = context?.cartData || [];

	const location = useLocation();
	const { selectedIds = [] } = location.state || [];

	// Get only selected cart items
	const selectedCartItems = cartData.filter((item) =>
		selectedIds.includes(item._id)
	);

	const totalItems = selectedCartItems.reduce(
		(acc, item) => acc + (item.quantity || 1),
		0
	);

	const totalAmount = selectedCartItems.reduce(
		(acc, item) => acc + (item.subTotal || 0),
		0
	);

	console.log("Selected Cart Items:", selectedCartItems);

	useEffect(() => {
		window.scrollTo(0, 0);
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
		const res = await postData("/api/address/set-default", { addressId });

		if (!res.error) {
			context.openAlertBox("success", "Address selected");
			context.loadUserDetails(); // Reload user to update address list
		}
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
					<div className="pl-20">
						{Addresses?.length > 0 ? (
							Addresses?.map((item, i) => (
								<div
									key={i}
									className={`my-4 p-4 rounded-lg w-[70%] transition-all 
		${
			item.status
				? "border-2 border-[#ff5151] bg-[#fff5f5] shadow-md"
				: "border bg-white shadow-sm hover:shadow-md"
		} `}
								>
									<div className="flex gap-4 items-start">
										{/* Radio for Default */}
										<input
											type="radio"
											name="selectedAddress"
											checked={item.status === true}
											onChange={() => handleDefaultAddressSelection(item._id)}
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
												<p className="text-gray-600 text-sm mt-1">
													Landmark: {item.landmark}
												</p>
											)}

											<p className="text-gray-800 font-medium text-sm mt-1">
												Phone: {item.mobile}
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
									<div className="flex items-center justify-between py-2">
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
											&#8377;{item?.subTotal}
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
								<span className="text-[14px] font-semibold">{totalItems}</span>
							</div>

							<div className="flex justify-between mb-2">
								<span className="text-[14px] font-semibold">Total Amount</span>
								<span className="text-[14px] font-semibold">
									₹ {totalAmount}
								</span>
							</div>

							<Button
								variant="contained"
								fullWidth
								sx={{
									backgroundColor: "#ff5151",
									mt: 2,
									py: 1.2,
									"&:hover": { backgroundColor: "#e64545" },
								}}
							>
								<IoBagCheck className="text-[20px] mr-2" />
								Pay ₹{totalAmount}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Checkout;
