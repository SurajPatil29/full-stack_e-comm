function AddressCard({ address, onSelect, onDelete }) {
	const fullAddress = `${address.address_line}, ${address.city}, ${address.state} - ${address.pincode}`;

	return (
		<div className="border rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition cursor-pointer">
			<div className="flex items-start gap-3">
				{/* RADIO BUTTON */}
				<input
					type="radio"
					name="selectedAddress"
					checked={address.status === true}
					onChange={() => onSelect(address._id)}
					className="mt-1 h-4 w-4 cursor-pointer accent-[#ff5151]"
				/>

				{/* ADDRESS DETAILS */}
				<div className="flex-1">
					{/* Title + Default Badge */}
					<div className="flex items-center gap-2">
						<p className="text-[15px] font-semibold text-gray-900 capitalize">
							{address.addressType} Address
						</p>

						{address.status === true && (
							<span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">
								DEFAULT
							</span>
						)}
					</div>

					{/* ⭐ NEW: SHOW NAME */}
					<p className="text-gray-900 font-medium text-sm mt-1">
						{address.name}
					</p>

					{/* Address text */}
					<p className="text-gray-700 text-sm mt-1 leading-5">{fullAddress}</p>

					{/* Landmark */}
					{address.landmark && (
						<p className="text-gray-600 text-xs mt-1">
							Landmark: {address.landmark}
						</p>
					)}

					{/* Mobile */}
					<p className="text-gray-800 text-sm font-medium mt-1">
						Phone: {address.mobile}
					</p>
				</div>
			</div>

			{/* Divider */}
			<div className="border-t my-3"></div>

			{/* DELETE BUTTON */}
			<div className="flex justify-end">
				<button
					onClick={() => onDelete(address._id)}
					className="text-red-500 hover:text-red-700 font-semibold text-sm"
				>
					Delete
				</button>
			</div>
		</div>
	);
}

export default AddressCard;
