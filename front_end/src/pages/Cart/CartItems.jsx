import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { VscTriangleDown } from "react-icons/vsc";
// import { VscTriangleUp } from "react-icons/vsc";
import { Button, Rating } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import { deleteDataReview, fetchDataFromApi, putData } from "../../utils/api";
import MyContext from "../../context/MyContext";
import { IoCartOutline } from "react-icons/io5";

const Dropdown = ({
	label,
	value,
	onClick,
	menuOpen,
	anchorEl,
	onClose,
	options,
}) => (
	<div className="relative">
		<span
			onClick={onClick}
			className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer gap-1 "
		>
			{label}: {value} <VscTriangleDown />
		</span>

		<Menu anchorEl={anchorEl} open={menuOpen} onClose={() => onClose(null)}>
			{options.map((opt) => (
				<MenuItem
					key={opt}
					sx={{ fontSize: "12px" }}
					onClick={() => onClose(opt)}
				>
					{opt}
				</MenuItem>
			))}
		</Menu>
	</div>
);

function CartItems({ data, selected, onSelectChange }) {
	const context = useContext(MyContext);
	const [sizeAnchorEl, setSizeAnchorEl] = useState(null);
	const [selectedSize, setSelectedSize] = useState(data.size);
	const openSize = Boolean(sizeAnchorEl);

	const [qtyAnchorEl, setQtyAnchorEl] = useState(null);
	const [selectedQty, setSelectedQty] = useState(data.quantity);
	const openQty = Boolean(qtyAnchorEl);
	const qtyOptions = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

	const [ramAnchorEl, setRamAnchorEl] = useState(null);
	const [selectedRam, setSelectedRam] = useState(data.ram);
	const openRam = Boolean(ramAnchorEl);

	const [weightAnchorEl, setWeightAnchorEl] = useState(null);
	const [selectedWeight, setSelectedWeight] = useState(data.weight);
	const openWeight = Boolean(weightAnchorEl);

	const updateCart = async (fields) => {
		try {
			await putData("/api/cart/update-item", {
				_id: data._id,
				qty: fields.qty ?? selectedQty,
				size: fields.size ?? selectedSize,
				ram: fields.ram ?? selectedRam,
				weight: fields.weight ?? selectedWeight,
			});
			context?.fetchCartData();
		} catch (error) {
			console.error("Cart update failed:", error);
		}
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [data]);

	const handleClickSize = (event) => {
		setSizeAnchorEl(event.currentTarget);
	};
	const handleCloseSize = (value) => {
		setSizeAnchorEl(null);
		if (value !== null) {
			setSelectedSize(value);
			updateCart({ size: value });
		}
	};

	const handleClickQty = (event) => {
		setQtyAnchorEl(event.currentTarget);
	};
	const handleCloseQty = (value) => {
		setQtyAnchorEl(null);
		if (value !== null) {
			setSelectedQty(value);
			updateCart({ qty: value });
		}
	};

	const handleClickRam = (event) => {
		setRamAnchorEl(event.currentTarget);
	};
	const handleCloseRam = (value) => {
		setRamAnchorEl(null);
		if (value !== null) {
			setSelectedRam(value);
			updateCart({ ram: value });
		}
	};

	const handleClickWeight = (event) => {
		setWeightAnchorEl(event.currentTarget);
	};
	const handleCloseWeight = (value) => {
		setWeightAnchorEl(null);
		if (value !== null) {
			setSelectedWeight(value);
			updateCart({ weight: value });
		}
	};

	const removeItem = async (id, productId, updatedStockQty) => {
		try {
			// DELETE CART ITEM
			const res = await deleteDataReview(`/api/cart/delete-cart-item/${id}`);

			if (res.error === false) {
				context.openAlertBox("success", "Item removed successfully");

				// REFETCH CART
				context.fetchCartData();
			} else {
				context.openAlertBox("error", res.message || "Item not removed");
			}
		} catch (error) {
			context.openAlertBox("error", "Something went wrong!");
			console.error(error);
		}
	};
	return (
		<>
			<div className="cartItem w-full p-3 flex flex-col sm:flex-row gap-4 pb-5 border-b border-[rgba(0,0,0,0.2)] ">
				<input
					type="checkbox"
					checked={selected}
					onChange={(e) => onSelectChange(data._id, e.target.checked)}
					className="w-4 h-4 accent-[#ff5151] cursor-pointer"
				/>
				<div className="img w-full sm:w-[120px] group border border-[rgba(0,0,0,0.2)] rounded-md">
					<Link to={`/productDetails/${data?.productId}`}>
						<img
							src={data?.image}
							alt={data?.productId}
							className="w-full object-contain rounded-md group-hover:scale-105 transition-all"
						/>
					</Link>
				</div>
				<div className="info w-full sm:flex-1 relative">
					<button
						className="!absolute !top-2 !right-2 rounded-full !w-[22px] !min-w-[22px] !h-[22px]  !bg-[#f1f1f1] !text-black !p-0"
						onClick={() =>
							removeItem(
								data?._id,
								data?.productId,
								data.countInStock + data.quantity
							)
						}
					>
						<IoMdClose className="cursor-pointer absolute top-[0px] right-[0px] text-[22px] link transition-all " />
					</button>
					<span className="text-[13px] ">{data?.ProductBrand}</span>
					<h3 className="tetx-[15px] ">
						<Link to={`/productDetails/${data?.productId}`} className="link">
							{data?.productTitle}
						</Link>
					</h3>

					<Rating
						name="size-small"
						defaultValue={data?.rating}
						size="small"
						readOnly
					/>
					<div className="flex flex-wrap items-center gap-3 mt-2">
						{data?.sizeRange && (
							<Dropdown
								label="Size"
								value={selectedSize}
								onClick={handleClickSize}
								menuOpen={openSize}
								anchorEl={sizeAnchorEl}
								onClose={handleCloseSize}
								options={data.sizeRange}
							/>
						)}

						{data?.ramRange && (
							<Dropdown
								label="Ram"
								value={selectedRam}
								onClick={handleClickRam}
								menuOpen={openRam}
								anchorEl={ramAnchorEl}
								onClose={handleCloseRam}
								options={data.ramRange} // you can customize
							/>
						)}

						<Dropdown
							label="Weight"
							value={selectedWeight}
							onClick={handleClickWeight}
							menuOpen={openWeight}
							anchorEl={weightAnchorEl}
							onClose={handleCloseWeight}
							options={data.weightRange}
						/>

						<Dropdown
							label="Qty"
							value={selectedQty}
							onClick={handleClickQty}
							menuOpen={openQty}
							anchorEl={qtyAnchorEl}
							onClose={handleCloseQty}
							options={qtyOptions} // 1 to 10
						/>
					</div>

					<div className="flex flex-wrap items-center gap-3 mt-2 text-sm ">
						<span className="pprice  text[14px] font-[600] ">
							&#8377;{data?.price.toLocaleString()}
						</span>
						<span className="oldPrice line-through text-gray-500 text-[14px] font[500] ">
							&#8377;{data?.oldPrice.toLocaleString()}
						</span>

						<span className="pprice text-[#ff5151] text[12px] font-[500] ">
							{data?.oldPrice && data?.price
								? `${Math.round(
										((data.oldPrice - data.price) / data.oldPrice) * 100
								  )}% OFF`
								: ""}
						</span>
					</div>
				</div>
			</div>
		</>
	);
}

export default CartItems;
