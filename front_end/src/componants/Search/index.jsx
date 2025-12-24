import { Button, CircularProgress } from "@mui/material";
import { IoSearch } from "react-icons/io5";
import "../Search/style.css";
import { useState } from "react";
import { useContext } from "react";
import MyContext from "../../context/MyContext";
import { fetchDataFromApi } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";

function Search() {
	const context = useContext(MyContext);
	const navigate = useNavigate();
	const searchRef = useRef(null);

	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [isLoding, setIsloading] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);

	const onChangeInput = async (e) => {
		const value = e.target.value;
		setSearchQuery(value);

		if (value.trim().length < 3) {
			context?.setSearchData([]);
			setSearchResults([]);
			setShowDropdown(false);
			return;
		}

		try {
			const res = await fetchDataFromApi(`/api/product/search?q=${value}`);

			if (res?.success === true) {
				const data = res?.data || [];
				const topTenResults = data.slice(0, 10);
				context?.setSearchData(data);
				setSearchResults(topTenResults);
				setShowDropdown(true);
			}
		} catch (error) {
			console.error("Search error: ", error);
		}
	};

	const handleSearchClick = () => {
		setIsloading(true);
		// ❌ Case 1: Less than 3 characters
		if (searchQuery.trim().length < 3) {
			setTimeout(() => {
				context.openAlertBox(
					"info",
					"Please enter at least 3 characters to search"
				);
				setIsloading(false);
			}, 1500);

			return;
		}

		// ❌ Case 2: No products found
		if (searchResults.length === 0) {
			setTimeout(() => {
				context.openAlertBox(
					"info",
					"No products found related to your search"
				);
				setIsloading(false);
			}, 1500);

			return;
		}

		// ✅ Valid search → navigate
		setTimeout(() => {
			navigate("/search-page");
			setIsloading(false);
			setShowDropdown(false);
		}, 1500);
	};

	const handleProductClick = (id) => {
		setShowDropdown(false);
		setSearchQuery("");
		navigate(`/productDetails/${id}`);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (searchRef.current && !searchRef.current.contains(event.target)) {
				setShowDropdown(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div ref={searchRef} className="relative w-full">
			<div className="searchBox w-[100%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative p-2">
				<input
					type="text"
					placeholder="Sarch for Products name, brand, category..."
					className="w-full h-35px focus:outline-none bg-inherit p-2 text-[15px]"
					onChange={onChangeInput}
					value={searchQuery}
				/>
				{isLoding === true ? (
					<div className="search-loader">
						<CircularProgress size={24} />
					</div>
				) : (
					<Button
						className="!absolute top-[8px] right-[5px] z-50 !w-[37px] !min-w-[37px] h-[37px] !rounded-full !text-black"
						onClick={handleSearchClick}
					>
						<IoSearch className="text-[#4e4e4e] text-[22px]" />
					</Button>
				)}
			</div>
			{/* 🔽 SEARCH DROPDOWN */}
			{showDropdown && searchResults.length > 0 && (
				<div className="absolute top-[55px] left-0 w-full bg-white shadow-lg rounded-md z-50 max-h-[300px] overflow-y-auto">
					{searchResults.map((item) => (
						<div
							key={item._id}
							onClick={() => handleProductClick(item._id)}
							className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 border-b"
						>
							<img
								src={item.images?.[0]}
								alt={item.name}
								className="w-[45px] h-[45px] object-contain rounded"
							/>

							<div className="flex flex-col">
								<span className="text-[14px] font-[500] line-clamp-1">
									{item.name}
								</span>
								<span className="text-[12px] text-gray-500">{item.brand}</span>
								<span className="text-[13px] font-[600] text-[#ff5252]">
									₹{item.price}
								</span>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export { Search };
