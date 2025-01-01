import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "./style.css";
import { Collapse } from "react-collapse";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";

import { Button, Rating } from "@mui/material";
import { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

function Sidebar() {
	const [isOpenedCatFilter, setIsOpenedCatFilter] = useState(true);
	const [isOpenedAvalFilter, setIsOpenedAvalFilter] = useState(true);
	const [isOpenedSizeFilter, setIsOpenedSizeFilter] = useState(true);

	return (
		<aside className="sidebar py-5 w-full">
			<div className="box w-full">
				<h3 className="w-full mb-3 text-[16px] font-[600] flex items-center ">
					Shop By Category
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
					<div className="scroll px-3 relative -left-[10px] ">
						<FormGroup>
							<FormControlLabel
								control={<Checkbox size="small" />}
								label="Fashion"
							/>
							<FormControlLabel
								control={<Checkbox size="small" />}
								label="Electronics"
							/>
							<FormControlLabel
								control={<Checkbox size="small" />}
								label="Bags"
							/>
							<FormControlLabel
								control={<Checkbox size="small" />}
								label="Footwear"
							/>
							<FormControlLabel
								control={<Checkbox size="small" />}
								label="Groceries"
							/>
							<FormControlLabel
								control={<Checkbox size="small" />}
								label="Beuty"
							/>
							<FormControlLabel
								control={<Checkbox size="small" />}
								label="Wellness"
							/>
							<FormControlLabel
								control={<Checkbox size="small" />}
								label="Jewellery"
							/>
						</FormGroup>
					</div>
				</Collapse>
			</div>

			<div className="box w-full">
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
			</div>

			<div className="box ">
				<h3 className="w-full mb-3 text-[16px] font-[600] flex items-center ">
					Filter By Price
				</h3>
				<RangeSlider />
				<div className="flex pt-4 pb-2 priceRange">
					<span className="text-[13px]">
						from: <strong className="text-dark">$:{100}</strong>
					</span>
					<span className="ml-auto text-[13px]">
						From:<strong className="text-dark">$:{5000}</strong>
					</span>
				</div>
			</div>

			<div className="box w-full">
				<h3 className="w-full mb-3 text-[16px] font-[600] flex items-center ">
					Filter By Rating
				</h3>
				<div className="w-full">
					<Rating name="size-small" defaultValue={5} size="small" readOnly />
				</div>
				<div className="w-full">
					<Rating name="size-small" defaultValue={4} size="small" readOnly />
				</div>
				<div className="w-full">
					<Rating name="size-small" defaultValue={3} size="small" readOnly />
				</div>
				<div className="w-full">
					<Rating name="size-small" defaultValue={2} size="small" readOnly />
				</div>
				<div className="w-full">
					<Rating name="size-small" defaultValue={1} size="small" readOnly />
				</div>
			</div>
		</aside>
	);
}

export default Sidebar;
