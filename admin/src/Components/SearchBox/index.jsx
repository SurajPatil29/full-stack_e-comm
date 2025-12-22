import React, { useRef } from "react";
import { FiSearch } from "react-icons/fi";

function SearchBox({ searchQuery, setSearchQuery, setPageOrder }) {
	const searchInput = useRef(null);

	const onChangeInput = (e) => {
		const value = e.target.value;
		setSearchQuery(value);
		setPageOrder(0); // reset to page 1 on search
	};

	return (
		<div className="w-full relative">
			<FiSearch className="absolute left-2 top-[13px] text-[15px] opacity-40" />

			<input
				ref={searchInput}
				type="text"
				value={searchQuery}
				onChange={onChangeInput}
				placeholder="Search... "
				className="w-full h-[40px] bg-[#f1f1f1] border p-2 pl-8 rounded-md text-[15px] focus:outline-none"
			/>
		</div>
	);
}

export default SearchBox;
