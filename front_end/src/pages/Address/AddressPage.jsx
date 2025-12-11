import { Button } from "@mui/material";
import AccountSideBar from "../../componants/AccountSideBar";
import { useContext, useEffect } from "react";
import MyContext from "../../context/MyContext";
import { deleteDataReview, postData } from "../../utils/api";

function AddressPage() {
	const context = useContext(MyContext);
	const Addresses = context?.userData?.address_details;

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
		<section className="py-10 w-full">
			<div className="container flex gap-5">
				<div className="col1 w-[20%]">
					<AccountSideBar />
				</div>
				<div className="col2 w-[60%] ">
					<div className="flex justify-between items-center">
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
					<div className="pl-12">
						{Addresses?.length > 0 ? (
							Addresses?.map((item, i) => (
								<div
									key={i}
									className="my-4 p-4 border rounded-lg bg-white shadow-md w-[70%]  "
								>
									<div className="flex gap-4 items-start  ">
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
										</div>
									</div>

									{/* Divider */}
									<div className="border-t my-3"></div>

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
			</div>
		</section>
	);
}

export default AddressPage;
