import SearchBox from "../../Components/SearchBox";

import OrdersCompo from "./OrdersCompo";

function Orders() {
	// this for recent order table
	return (
		<div className="card m-4 shadow-md sm:rounded-lg bg-white">
			<div className="flex items-center justify-between px-5 py-5">
				<h2 className="text-[18px] font-[600] ">Recent Orders</h2>
				<div className="w-[40%] ">
					<SearchBox />
				</div>
			</div>
			<OrdersCompo />
		</div>
	);
}

export default Orders;
