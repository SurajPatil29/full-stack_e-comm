import React from "react";
import { FiSearch } from "react-icons/fi";

function SearchBox() {
	return (
		<div className="w-full h-auto relative overflow-hidden ">
			<FiSearch className="absolute left-2 top-[13px] z-50 pointer-events-none text-[15px] opacity-30 " />

			<input
				type="text"
				className="w-full h-[40px] bg-[#f1f1f1] border border-[rgba(0,0,0,0.1)] p-2 pl-8 focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md text-[15px]  "
				placeholder="Search here..."
			/>
		</div>
	);
}

export default SearchBox;
