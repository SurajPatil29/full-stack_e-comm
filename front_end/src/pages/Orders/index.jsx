import { Button } from "@mui/material";
import AccountSideBar from "../../componants/AccountSideBar";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Badges from "../../componants/Badge";
import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../../utils/api";
import Pagination from "@mui/material/Pagination";
import { FiMenu } from "react-icons/fi";

const OrderTableSkeleton = (rows = 5) => {
	return (
		<div className="space-y-4 mt-5 animate-pulse">
			{Array.from({ length: rows }).map((_, i) => (
				<div
					key={i}
					className="border rounded-md bg-white shadow-sm overflow-hidden"
				>
					<div className="flex gap-4 p-4">
						<div className="w-8 h-8 bg-gray-200 rounded-full" />
						<div className="flex-1 space-y-2">
							<div className="h-4 bg-gray-200 rounded w-[40%]" />
							<div className="h-4 bg-gray-200 rounded w-[60%]" />
						</div>
					</div>

					<div className="grid grid-cols-6 gap-4 px-6 pb-4">
						{Array.from({ length: 6 }).map((_, j) => (
							<div key={j} className="h-4 bg-gray-200 rounded" />
						))}
					</div>
				</div>
			))}
		</div>
	);
};

const EmptyOrders = () => {
	return (
		<div className="flex flex-col items-center justify-center py-20 text-center">
			<img
				src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
				alt="No Orders"
				className="w-28 mb-4 opacity-80"
			/>
			<h3 className="text-lg font-semibold text-gray-700">No orders found</h3>
			<p className="text-sm text-gray-500 mt-1">
				Looks like you haven’t placed any orders yet.
			</p>
		</div>
	);
};

const Orders = () => {
	const [openOrderIndex, setOpenOrderIndex] = useState(null);

	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	const [sidebarOpen, setSidebarOpen] = useState(false);

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
		const fetchOrders = async () => {
			setLoading(true);
			const res = await fetchDataFromApi("/api/order/order-list");

			if (res?.error === false) {
				setOrders(res.orders || []);
			}

			setLoading(false);
		};

		fetchOrders();
		window.scrollTo(0, 0);
	}, []);

	// for closing Accoubntsidebar
	useEffect(() => {
		if (sidebarOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => (document.body.style.overflow = "");
	}, [sidebarOpen]);
	return (
		<section className="section py-10 ">
			<div className="container max-w-7xl mx-auto flex gap-5 px-4 relative">
				<div className="col1 hidden lg:block w-[22%] ">
					<AccountSideBar />
				</div>
				<div className="leftPart w-full lg:w-[78%] ">
					<div className="shadow-md rounded-md  bg-white">
						<div className="py-2 px-3 border-b border-[rgba(0,0,0,0.2)] ">
							<div className="py-2 px-3 border-b border-[rgba(0,0,0,0.2)]">
								{/* Header row */}
								<div className="flex items-center justify-between gap-3">
									<h2 className="text-[18px] font-semibold">My Orders</h2>

									{/* Mobile menu button */}
									<Button
										onClick={() => setSidebarOpen(true)}
										className="lg:hidden !min-w-[40px] !p-0 !text-[rgba(0,0,0,0.9)]"
									>
										<FiMenu className="text-[22px]" />
									</Button>
								</div>

								{/* Subtitle */}
								<p className="mt-1 text-[14px] text-gray-600">
									There are{" "}
									<span className="font-bold text-[#ff5151]">
										{loading ? "..." : orders.length}
									</span>{" "}
									orders
								</p>
							</div>

							{/* 🔹 SKELETON */}
							{loading && OrderTableSkeleton()}

							{/* 🔹 EMPTY FALLBACK */}
							{!loading && orders.length === 0 && EmptyOrders()}

							{/* 🔹 ORDERS TABLE */}
							{!loading &&
								currentOrders.length > 0 &&
								currentOrders.map((order, i) => {
									const actualIndex = i + indexOfFirst;

									return (
										<div key={i} className="relative overflow-x-auto mt-5">
											<table className="min-w-[900px] w-full text-sm text-left rtl:text-right text-gray-500">
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
															user
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
																	<FaAngleUp className="text-[16px] !text-[#ff5151] " />
																) : (
																	<FaAngleDown
																		className={`transition-transform duration-300 !text-[#ff5151] ${
																			openOrderIndex === actualIndex
																				? "rotate-180"
																				: ""
																		}`}
																	/>
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
																"en-IN",
															)}
														</td>
													</tr>

													<tr>
														<td colSpan="10" className="bg-gray-50">
															<div
																className={`overflow-hidden transition-all duration-300 ease-in-out
			${
				openOrderIndex === actualIndex
					? "max-h-[500px] opacity-100 translate-y-0"
					: "max-h-0 opacity-0 -translate-y-2"
			}`}
															>
																<div className="pl-20 py-4">
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
																</div>
															</div>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									);
								})}
						</div>
					</div>
				</div>
			</div>
			{!loading && orders.length > itemsPerPage && (
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
			)}

			{/* overlay accountsidebar */}
			{sidebarOpen && (
				<div className="fixed inset-0 z-50 lg:hidden">
					{/* backdrop */}
					<div
						className="absolute inset-0 bg-black/40"
						onClick={() => setSidebarOpen(false)}
					/>

					{/* drawer */}
					<div className="absolute left-0 top-0 h-full w-[80%] max-w-[320px] bg-white shadow-lg animate-slide-in">
						<div className="flex justify-between items-center p-4 border-b">
							<h3 className="font-semibold">My Account</h3>
							<button onClick={() => setSidebarOpen(false)}>✕</button>
						</div>

						<AccountSideBar />
					</div>
				</div>
			)}
			{/* overlay accountsidebar */}
		</section>
	);
};

export default Orders;
