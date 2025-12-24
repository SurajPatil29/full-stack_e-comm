import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "./style.css";
import { Collapse } from "react-collapse";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";

import { Button, Rating } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import MyContext from "../../context/MyContext";

function Sidebar({ data, originalData, catId, setProductsData, showLoader }) {
	const [isOpenedCatFilter, setIsOpenedCatFilter] = useState(true);
	const [isOpenedAvalFilter, setIsOpenedAvalFilter] = useState(true);
	const [isOpenedSizeFilter, setIsOpenedSizeFilter] = useState(true);
	const [isOpenedSubCatFilter, setIsOpenedSubCatFilter] = useState(true);

	const [selectedSubCat, setSelectedSubCat] = useState(null);
	const [selectedThirdCat, setSelectedThirdCat] = useState(null);

	const [priceRange, setPriceRange] = useState([0, 200000]);
	const minPrice = Math.min(...originalData.map((p) => p.price));
	const maxPrice = Math.max(...originalData.map((p) => p.price));

	useEffect(() => {
		setPriceRange([minPrice, maxPrice]);
	}, [originalData]);

	const [selectedRating, setSelectedRating] = useState(null);

	const handleRatingSelect = (value) => {
		if (selectedRating === value) {
			setSelectedRating(null);
			setProductsData(originalData);
			return;
		}

		setSelectedRating(value);

		const filtered = originalData.filter((p) => p.rating >= value);
		showLoader(() => {
			setProductsData(filtered);
		});
	};

	const context = useContext(MyContext);

	// 🔍 Find selected main category from context
	const selectedCategory = context.catData?.find((cat) => cat._id === catId);

	// 🧩 Extract children (sub categories)
	const subCategories = selectedCategory?.children || [];

	// 3️⃣ Level-2 children (3rd level categories)
	const subCatChildren = selectedSubCat?.children || []; // adjust field name if needed

	// When user clicks sub category checkbox
	const handleSubCatSelect = (sub) => {
		// Deselect subcategory
		if (selectedSubCat?._id === sub._id) {
			setSelectedSubCat(null);
			setSelectedThirdCat(null); // also clear third category
			setIsOpenedSubCatFilter(false);

			setProductsData(originalData); // ⭐ ALWAYS restore full data
			return;
		}

		// Select subcategory
		setSelectedSubCat(sub);
		setSelectedThirdCat(null); // reset third category
		setIsOpenedSubCatFilter(true);

		const filtered = originalData.filter((p) => p.subCatId === sub._id);

		showLoader(() => {
			setProductsData(filtered);
		});
	};

	const handleThirdCatSelect = (child) => {
		// deselect third category
		if (selectedThirdCat?._id === child._id) {
			setSelectedThirdCat(null);

			// Return to subcategory filtered list
			const filtered = originalData.filter(
				(p) => p.subCatId === selectedSubCat._id
			);

			showLoader(() => {
				setProductsData(filtered);
			});

			return;
		}

		// select third category
		setSelectedThirdCat(child);

		const filtered = originalData.filter((p) => p.thirdsubCatId === child._id);

		showLoader(() => {
			setProductsData(filtered);
		});
	};

	return (
		<aside className="sidebar py-5 w-full">
			{/* ---------------------- MAIN SUBCATEGORY FILTER ---------------------- */}
			{/* <div className="box w-full">
				<h3 className="w-full mb-3 text-[16px] font-[600] flex items-center ">
					Shop By Sub Category
					<Button
						onClick={() => setIsOpenedCatFilter(!isOpenedCatFilter)}
						className="link !ml-auto"
					>
						{isOpenedCatFilter ? (
							<FaAngleUp className="text-[#ff5252]" />
						) : (
							<FaAngleDown className="text-[#ff5252]" />
						)}
					</Button>
				</h3>

				<Collapse isOpened={isOpenedCatFilter}>
					<div className="scroll px-3 relative -left-[10px]">
						<FormGroup>
							{subCategories.length > 0 ? (
								subCategories.map((sub) => (
									<FormControlLabel
										key={sub._id}
										control={
											<Checkbox
												size="small"
												checked={selectedSubCat?._id === sub._id}
												onChange={() => handleSubCatSelect(sub)}
											/>
										}
										label={sub.name}
									/>
								))
							) : (
								<p className="text-gray-500 text-[14px]">
									No sub-categories found
								</p>
							)}
						</FormGroup>
					</div>
				</Collapse>
			</div> */}

			{/* ---------------------- SECOND LEVEL FILTER ---------------------- */}
			{/* 
			{subCatChildren.length > 0 && selectedSubCat && (
				<div className="box w-full mt-5">
					<h3 className="w-full mb-3 text-[16px] font-[600] flex items-center ">
						{selectedSubCat.name} Options
						<Button
							onClick={() => setIsOpenedSubCatFilter(!isOpenedSubCatFilter)}
							className="link !ml-auto"
						>
							{isOpenedSubCatFilter ? (
								<FaAngleUp className="text-[#ff5252]" />
							) : (
								<FaAngleDown className="text-[#ff5252]" />
							)}
						</Button>
					</h3>

					<Collapse isOpened={isOpenedSubCatFilter}>
						<div className="scroll px-3 relative -left-[10px]">
							<FormGroup>
								{subCatChildren.map((child) => (
									<FormControlLabel
										key={child._id}
										control={
											<Checkbox
												size="small"
												checked={selectedThirdCat?._id === child._id}
												onChange={() => handleThirdCatSelect(child)}
											/>
										}
										label={child.name}
									/>
								))}
							</FormGroup>
						</div>
					</Collapse>
				</div>
			)} */}

			{subCategories.length > 0 && (
				<>
					{/* ---------------------- MAIN SUBCATEGORY FILTER ---------------------- */}
					<div className="box w-full">
						<h3 className="w-full mb-3 text-[16px] font-[600] flex items-center">
							Shop By Sub Category
							<Button
								onClick={() => setIsOpenedCatFilter(!isOpenedCatFilter)}
								className="link !ml-auto"
							>
								{isOpenedCatFilter ? (
									<FaAngleUp className="text-[#ff5252]" />
								) : (
									<FaAngleDown className="text-[#ff5252]" />
								)}
							</Button>
						</h3>

						<Collapse isOpened={isOpenedCatFilter}>
							<div className="scroll px-3 relative -left-[10px]">
								<FormGroup>
									{subCategories.length > 0 ? (
										subCategories.map((sub) => (
											<FormControlLabel
												key={sub._id}
												control={
													<Checkbox
														size="small"
														checked={selectedSubCat?._id === sub._id}
														onChange={() => handleSubCatSelect(sub)}
													/>
												}
												label={sub.name}
											/>
										))
									) : (
										<p className="text-gray-500 text-[14px]">
											No sub-categories found
										</p>
									)}
								</FormGroup>
							</div>
						</Collapse>
					</div>

					{/* ---------------------- SECOND LEVEL FILTER ---------------------- */}
					{subCatChildren.length > 0 && selectedSubCat && (
						<div className="box w-full mt-5">
							<h3 className="w-full mb-3 text-[16px] font-[600] flex items-center">
								{selectedSubCat.name} Options
								<Button
									onClick={() => setIsOpenedSubCatFilter(!isOpenedSubCatFilter)}
									className="link !ml-auto"
								>
									{isOpenedSubCatFilter ? (
										<FaAngleUp className="text-[#ff5252]" />
									) : (
										<FaAngleDown className="text-[#ff5252]" />
									)}
								</Button>
							</h3>

							<Collapse isOpened={isOpenedSubCatFilter}>
								<div className="scroll px-3 relative -left-[10px]">
									<FormGroup>
										{subCatChildren.map((child) => (
											<FormControlLabel
												key={child._id}
												control={
													<Checkbox
														size="small"
														checked={selectedThirdCat?._id === child._id}
														onChange={() => handleThirdCatSelect(child)}
													/>
												}
												label={child.name}
											/>
										))}
									</FormGroup>
								</div>
							</Collapse>
						</div>
					)}
				</>
			)}

			{/* <div className="box w-full">
				<h3 className="w-full mb-3 text-[16px] font-[600] flex items-center ">
					Availability
					<Button
						onClick={() => setIsOpenedAvalFilter(!isOpenedAvalFilter)}
						className="link !ml-auto"
					>
						{isOpenedAvalFilter ? (
							<FaAngleUp className="text-[#ff5252]" />
						) : (
							<FaAngleDown className="text-[#ff5252]" />
						)}
					</Button>
				</h3>
				<Collapse isOpened={isOpenedAvalFilter}>
					<div className="scroll px-3 relative -left-[10px]">
						<FormGroup>
							<FormControlLabel
								control={<Checkbox size="small" />}
								label="Available (17)"
							/>
							<FormControlLabel
								control={<Checkbox size="small" />}
								label="In Stock (17)"
							/>
							<FormControlLabel
								control={<Checkbox size="small" />}
								label="Not Available (17)"
							/>
						</FormGroup>
					</div>
				</Collapse>
			</div>

			<div className="box w-full">
				<h3 className="w-full mb-3 text-[16px] font-[600] flex items-center ">
					Availability
					<Button
						onClick={() => setIsOpenedSizeFilter(!isOpenedSizeFilter)}
						className="link !ml-auto"
					>
						{isOpenedSizeFilter ? (
							<FaAngleUp className="text-[#ff5252]" />
						) : (
							<FaAngleDown className="text-[#ff5252]" />
						)}
					</Button>
				</h3>
				<Collapse isOpened={isOpenedSizeFilter}>
					<div className="scroll px-3 relative -left-[10px]">
						<FormGroup>
							<FormControlLabel
								control={<Checkbox size="small" />}
								label="Small (17)"
							/>
							<FormControlLabel
								control={<Checkbox size="small" />}
								label="Medium (17)"
							/>
							<FormControlLabel
								control={<Checkbox size="small" />}
								label="Large (17)"
							/>
							<FormControlLabel
								control={<Checkbox size="small" />}
								label="XL (17)"
							/>
							<FormControlLabel
								control={<Checkbox size="small" />}
								label="XXL (17)"
							/>
						</FormGroup>
					</div>
				</Collapse>
			</div> */}

			<div className="box ">
				<h3 className="w-full mb-3 text-[16px] font-[600] flex items-center ">
					Filter By Price
				</h3>
				<RangeSlider
					min={minPrice}
					max={maxPrice}
					value={priceRange}
					onInput={(value) => {
						setPriceRange(value);

						// Filter products globally
						const filtered = originalData.filter(
							(p) => p.price >= value[0] && p.price <= value[1]
						);

						showLoader(() => {
							setProductsData(filtered);
						});
					}}
				/>

				<div className="flex pt-4 pb-2 priceRange">
					<span className="text-[13px]">
						Min: <strong className="text-dark">₹ {priceRange[0]}</strong>
					</span>
					<span className="ml-auto text-[13px]">
						Max: <strong className="text-dark">₹ {priceRange[1]}</strong>
					</span>
				</div>
			</div>

			<div
				className="w-full cursor-pointer"
				onClick={() => handleRatingSelect(5)}
				style={{
					border: selectedRating === 5 ? "1px solid #ff5252" : "transparent",
					borderRadius: "6px",
					padding: "2px",
				}}
			>
				<Rating value={5} size="small" readOnly />
			</div>

			<div
				className="w-full cursor-pointer"
				onClick={() => handleRatingSelect(4)}
				style={{
					border: selectedRating === 4 ? "1px solid #ff5252" : "transparent",
					borderRadius: "6px",
					padding: "2px",
				}}
			>
				<Rating value={4} size="small" readOnly />
			</div>

			<div
				className="w-full cursor-pointer"
				onClick={() => handleRatingSelect(3)}
				style={{
					border: selectedRating === 3 ? "1px solid #ff5252" : "transparent",
					borderRadius: "6px",
					padding: "2px",
				}}
			>
				<Rating value={3} size="small" readOnly />
			</div>

			<div
				className="w-full cursor-pointer"
				onClick={() => handleRatingSelect(2)}
				style={{
					border: selectedRating === 2 ? "1px solid #ff5252" : "transparent",
					borderRadius: "6px",
					padding: "2px",
				}}
			>
				<Rating value={2} size="small" readOnly />
			</div>

			<div
				className="w-full cursor-pointer"
				onClick={() => handleRatingSelect(1)}
				style={{
					border: selectedRating === 1 ? "1px solid #ff5252" : "transparent",
					borderRadius: "6px",
					padding: "2px",
				}}
			>
				<Rating value={1} size="small" readOnly />
			</div>
		</aside>
	);
}

export default Sidebar;
