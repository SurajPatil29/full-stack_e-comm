import { Button } from "@mui/material";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";

function QtyBox({ quantity, setQuantity, stock }) {
	const [qtyVal, setQtyVal] = useState(1);

	const handleChange = (e) => {
		const newValue = parseInt(e.target.value, 10);

		if (!isNaN(newValue) && newValue > 0) {
			setQuantity(newValue);
		}
	};

	const plusQty = () => {
		if (stock >= quantity) {
			setQuantity(quantity + 1);
		}
	};

	const minusQty = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	return (
		<div className="qtyBox flex items-center relative">
			<input
				type="number"
				className="w-full h-[40px] p-2 pl-4 text-[15px] focus:outline-none border border-[rgba(0,0,0,0.1) rounded-md]  "
				value={quantity}
				onChange={handleChange}
			/>
			<div className="flex items-center flex-col justify-between h-[40px] absolute top-0 right-0 z-auto  border-l-[2px] ">
				<Button
					onClick={plusQty}
					className="!min-w-[25px] !w-[25px] !h-[20px] !text-[#000] hover:!bg-[#f1f1f1] "
				>
					<FaAngleUp />
				</Button>
				<Button
					onClick={minusQty}
					className="!min-w-[25px] !w-[25px] !h-[20px] !text-[#000] hover:!bg-[#f1f1f1] "
				>
					<FaAngleDown />
				</Button>
			</div>
		</div>
	);
}

export default QtyBox;
