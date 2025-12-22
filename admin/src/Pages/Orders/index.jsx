import SearchBox from "../../Components/SearchBox";

import OrdersCompo from "./OrdersCompo";

function Orders() {
	// this for recent order table
	return (
		<div className="card m-4 shadow-md sm:rounded-lg bg-white">
			<OrdersCompo />
		</div>
	);
}

export default Orders;
