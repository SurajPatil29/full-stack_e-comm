import { Button } from "@mui/material";
import AccountSideBar from "../../componants/AccountSideBar";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Badges from "../../componants/Badge";
import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../../utils/api";
import Pagination from "@mui/material/Pagination";

const Orders = () => {
	const [openOrderIndex, setOpenOrderIndex] = useState(null);

	const [orders, setOrders] = useState([]);

	const toggleOrder = (index) => {
		setOpenOrderIndex(openOrderIndex === index ? null : index);
	};

	// PAGINATION
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	const totalPages = Math.ceil(orders.length / itemsPerPage);
	const indexOfLast = currentPage * itemsPerPage;
	const indexOfFirst = indexOfLast - itemsPerPage;
	const currentOrders = orders.slice(indexOfFirst, indexOfLast);

	const handlePageChange = (event, page) => {
		setCurrentPage(page);
		setOpenOrderIndex(null); // close expanded order on page change
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	useEffect(() => {
		fetchDataFromApi("/api/order/order-list").then((res) => {
			// console.log(res);
			if (res?.error === false) {
				setOrders(res?.orders);
			}
		});
		window.scrollTo(0, 0);
	}, []);
	return (
		<section className="section py-10 ">
			<div className="container  min-w-[80%] flex gap-5">
				<div className="col1 w-[20%] ">
					<AccountSideBar />
				</div>
				<div className="leftPart w-[80%] ">
					<div className="shadow-md rounded-md  bg-white">
						<div className="py-2 px-3 border-b border-[rgba(0,0,0,0.2)] ">
							<h2>My orders</h2>
							<p className="mt-0">
								There are{" "}
								<span className="font-bold text-[#ff5151]">
									{orders.length}
								</span>{" "}
								orders
							</p>
							{currentOrders.length > 0 &&
								currentOrders.map((order, i) => {
									const actualIndex = i + indexOfFirst;

									return (
										<div key={i} className="relative overflow-x-auto mt-5">
											<table className="w-full text-sm text-left rtl:text-right text-gray-500">
												<thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
													<tr>
														<th scope="col" className="px-6 py-3">
															&nbsp;
														</th>
														<th
															scope="col"
															className="px-6 py-3 whitespace-nowrap"
														>
															Order Id
														</th>
														<th
															scope="col"
															className="px-6 py-3 whitespace-nowrap"
														>
															Payment Id
														</th>
														<th
															scope="col"
															className="px-6 py-3 whitespace-nowrap"
														>
															Customer
														</th>
														<th
															scope="col"
															className="px-6 py-3 whitespace-nowrap"
														>
															Address
														</th>
														<th
															scope="col"
															className="px-6 py-3 whitespace-nowrap"
														>
															Pincode
														</th>
														<th
															scope="col"
															className="px-6 py-3 whitespace-nowrap"
														>
															Total Amount
														</th>
														<th
															scope="col"
															className="px-6 py-3 whitespace-nowrap"
														>
															Email
														</th>

														<th
															scope="col"
															className="px-6 py-3 whitespace-nowrap"
														>
															Order Status
														</th>
														<th
															scope="col"
															className="px-6 py-3 whitespace-nowrap"
														>
															Date
														</th>
													</tr>
												</thead>
												<tbody>
													<tr className="bg-white border-b font-[500] ">
														<td className="px-6 py-4 font-[500]">
															<Button
																className="!w-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] "
																onClick={() => toggleOrder(actualIndex)}
															>
																{openOrderIndex === actualIndex ? (
																	<FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)] " />
																) : (
																	<FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)] " />
																)}
															</Button>
														</td>
														<td className="px-6 py-4 font-[500]">
															<span className="text-[#ff5151]">
																{order._id}
															</span>
														</td>
														<td className="px-6 py-4 font-[500]">
															<span className="text-[#ff5151]">
																{order.paymentId || "COD"}
															</span>
														</td>
														<td className="px-6 py-4 font-[500] whitespace-nowrap">
															{order.userId?.name}
														</td>
														<td className="px-6 py-4">
															<span className="block w-[260px]">
																{order.delivery_address.address_line},{" "}
																{order.delivery_address.city},{" "}
																{order.delivery_address.state}
															</span>
														</td>
														<td className="px-6 py-4">
															{order.delivery_address.pincode}
														</td>

														<td className="px-6 py-4">₹{order.totalAmt}</td>

														<td className="px-6 py-4">{order.userId?.email}</td>

														<td className="px-6 py-4">
															<Badges status={order.order_status} />
														</td>

														<td className="px-6 py-4 whitespace-nowrap">
															{new Date(order.createdAt).toLocaleDateString(
																"en-IN"
															)}
														</td>
													</tr>

													{openOrderIndex === actualIndex && (
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
																					key={p._id}
																					className="bg-white border-b"
																				>
																					<td className="px-6 py-4 text-[#ff5151]">
																						{p.productId}
																					</td>

																					<td className="px-6 py-4">
																						{p.productsTitle}
																					</td>

																					<td className="px-6 py-4">
																						<img
																							src={p.image}
																							alt={p.productsTitle}
																							className="w-[40px] h-[40px] rounded-md object-cover"
																						/>
																					</td>

																					<td className="px-6 py-4">
																						{p.quantity}
																					</td>
																					<td className="px-6 py-4">
																						₹{p.price}
																					</td>
																					<td className="px-6 py-4">
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
												</tbody>
											</table>
										</div>
									);
								})}
						</div>
					</div>
				</div>
			</div>
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
		</section>
	);
};

export default Orders;
