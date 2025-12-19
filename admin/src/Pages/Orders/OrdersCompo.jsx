import { Button } from "@mui/material";
import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Badges from "../../Components/Badge";
import { useEffect } from "react";
import { fetchDataFromApi, putData } from "../../utils/api";
import Pagination from "@mui/material/Pagination";
import { Select, MenuItem, FormControl } from "@mui/material";
import { Fragment } from "react";

const statusColors = {
	pending: "#f59e0b", // amber
	confirmed: "#3b82f6", // blue
	shipped: "#8b5cf6", // purple
	delivered: "#22c55e", // green
};

function OrdersCompo() {
	const [openOrderIndex, setOpenOrderIndex] = useState(null);

	const [orders, setOrders] = useState([]);

	// PAGINATION
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	const totalPages = Math.ceil(orders.length / itemsPerPage);
	const indexOfLast = currentPage * itemsPerPage;
	const indexOfFirst = indexOfLast - itemsPerPage;
	const currentOrders = orders.slice(indexOfFirst, indexOfLast);

	const toggleOrder = (absoluteIndex) => {
		setOpenOrderIndex(openOrderIndex === absoluteIndex ? null : absoluteIndex);
	};

	const handlePageChange = (event, page) => {
		setCurrentPage(page);
		setOpenOrderIndex(null);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	useEffect(() => {
		fetchDataFromApi("/api/order/all-order-list").then((res) => {
			console.log(res);
			if (res?.error === false) {
				setOrders(res.orders);
			}
		});
		window.scrollTo(0, 0);
	}, []);

	const updateOrderStatus = async (orderId, newStatus) => {
		try {
			const res = await putData(`/api/order/update-order/${orderId}`, {
				order_status: newStatus,
			});

			if (res?.error === false) {
				// Update UI instantly (no refetch needed)
				setOrders((prev) =>
					prev.map((order) =>
						order._id === orderId
							? { ...order, order_status: newStatus }
							: order
					)
				);
			}
		} catch (err) {
			console.error("Order update failed", err);
		}
	};

	return (
		<div>
			<div className="shadow-md rounded-md bg-white">
				<div className="py-4 px-5 border-b">
					<h2 className="text-lg font-semibold">Orders</h2>
					<p>
						There are{" "}
						<span className="font-bold text-[#ff5151]">{orders.length}</span>{" "}
						orders
					</p>
				</div>
				<div className="relative overflow-x-auto mt-5">
					<table className="w-full text-sm text-left rtl:text-right text-gray-500">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
							<tr>
								<th scope="col" className="px-6 py-3">
									&nbsp;
								</th>
								<th scope="col" className="px-6 py-3 whitespace-nowrap">
									Order Id
								</th>
								<th scope="col" className="px-6 py-3 whitespace-nowrap">
									Payment Id
								</th>
								<th scope="col" className="px-6 py-3 whitespace-nowrap">
									Customer
								</th>
								<th scope="col" className="px-6 py-3 whitespace-nowrap">
									Address
								</th>
								<th scope="col" className="px-6 py-3 whitespace-nowrap">
									Pincode
								</th>
								<th scope="col" className="px-6 py-3 whitespace-nowrap">
									Total Amount
								</th>
								<th scope="col" className="px-6 py-3 whitespace-nowrap">
									Email
								</th>

								<th scope="col" className="px-6 py-3 whitespace-nowrap">
									Order Status
								</th>
								<th scope="col" className="px-6 py-3 whitespace-nowrap">
									Date
								</th>
							</tr>
						</thead>
						<tbody>
							{currentOrders.map((order, i) => {
								const absoluteIndex = i + indexOfFirst;

								return (
									<Fragment key={order._id}>
										<tr key={i} className="bg-white border-b font-[500] ">
											<td className="px-6 py-4 font-[500]">
												<Button
													className="!w-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] "
													onClick={() => toggleOrder(absoluteIndex)}
												>
													{openOrderIndex === absoluteIndex ? (
														<FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)] " />
													) : (
														<FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)] " />
													)}
												</Button>
											</td>
											<td className="px-6 py-4 font-[500]">
												<span className="text-[#3872fa] font-[600] ">
													{order._id}
												</span>
											</td>
											<td className="px-6 py-4 font-[500]">
												<span className="text-[#3872fa] font-[600] ">
													{order.paymentId || "COD"}
												</span>
											</td>
											<td className="px-6 py-4 font-[500] whitespace-nowrap">
												{order.userId?.name}
											</td>
											<td className="px-6 py-4 font-[500]">
												{" "}
												<span className="block w-[260px]">
													{order.delivery_address?.address_line},{" "}
													{order.delivery_address?.city},{" "}
													{order.delivery_address?.state}
												</span>
											</td>
											<td className="px-6 py-4 font-[500]">
												{order.delivery_address?.pincode}
											</td>
											<td className="px-6 py-4 font-[500]">
												₹{order.totalAmt}
											</td>
											<td className="px-6 py-4 font-[500]">
												{order.userId?.email}
											</td>
											<td className="px-6 py-4 font-[500]">
												<FormControl size="small">
													<Select
														value={order.order_status}
														disabled={order.order_status === "delivered"}
														onChange={(e) =>
															updateOrderStatus(order._id, e.target.value)
														}
														sx={{
															minWidth: 130,
															fontSize: "14px",
															fontWeight: 600,
															color: statusColors[order.order_status],
															"& .MuiOutlinedInput-notchedOutline": {
																borderColor: statusColors[order.order_status],
															},
															"&:hover .MuiOutlinedInput-notchedOutline": {
																borderColor: statusColors[order.order_status],
															},
															"&.Mui-focused .MuiOutlinedInput-notchedOutline":
																{
																	borderColor: statusColors[order.order_status],
																},
														}}
													>
														<MenuItem value="pending">Pending</MenuItem>
														<MenuItem value="confirmed">Confirmed</MenuItem>
														<MenuItem value="shipped">Shipped</MenuItem>
														<MenuItem value="delivered">Delivered</MenuItem>
													</Select>
												</FormControl>
											</td>

											<td className="px-6 py-4 font-[500] whitespace-nowrap">
												{new Date(order.createdAt).toLocaleDateString("en-IN")}
											</td>
										</tr>

										{openOrderIndex === absoluteIndex && (
											<tr>
												<td className=" pl-20 " colSpan="6">
													<div className="relative overflow-x-auto ">
														<table className="w-full text-sm text-left rtl:text-right text-gray-500">
															<thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
																<tr>
																	<th
																		scope="col"
																		className="px-6 py-3 whitespace-nowrap"
																	>
																		Product Id
																	</th>
																	<th
																		scope="col"
																		className="px-6 py-3 whitespace-nowrap"
																	>
																		Product Title
																	</th>
																	<th
																		scope="col"
																		className="px-6 py-3 whitespace-nowrap"
																	>
																		Image
																	</th>
																	<th
																		scope="col"
																		className="px-6 py-3 whitespace-nowrap"
																	>
																		Quantity
																	</th>
																	<th
																		scope="col"
																		className="px-6 py-3 whitespace-nowrap"
																	>
																		Price
																	</th>
																	<th
																		scope="col"
																		className="px-6 py-3 whitespace-nowrap"
																	>
																		Sub Total
																	</th>
																</tr>
															</thead>
															<tbody>
																{order.products.map((p) => (
																	<tr
																		className="bg-white border-b font-[500] "
																		key={p._id}
																	>
																		<td className="px-6 py-4 font-[500]">
																			<span className="text-[#3872fa] font-[600] ">
																				{p.productId}
																			</span>
																		</td>
																		<td className="px-6 py-4 font-[500]">
																			{p.productsTitle}
																		</td>
																		<td className="px-6 py-4 font-[500] whitespace-nowrap">
																			<img
																				src={p.image}
																				alt={p.productsTitle}
																				className="w-[40px] h-[40px] rounded-md object-cover"
																			/>
																		</td>
																		<td className="px-6 py-4 font-[500]">
																			{p.quantity}
																		</td>
																		<td className="px-6 py-4 font-[500]">
																			₹{p.price}
																		</td>
																		<td className="px-6 py-4 font-[500]">
																			₹{p.subTotal}
																		</td>
																	</tr>
																))}
															</tbody>
														</table>
													</div>
												</td>
											</tr>
										)}
									</Fragment>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
			{/* PAGINATION */}
			<div className="flex justify-center mt-8">
				<Pagination
					count={totalPages}
					page={currentPage}
					onChange={handlePageChange}
					shape="rounded"
					showFirstButton
					showLastButton
				/>
			</div>
		</div>
	);
}

export default OrdersCompo;
