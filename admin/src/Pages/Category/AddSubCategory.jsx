import React, { useState } from "react";
import "react-lazy-load-image-component/src/effects/blur.css"; //css for lasyload img
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button, MenuItem, Select } from "@mui/material";

function AddSubCategory() {
	// this for product catagory
	const [productCat, setProductCat] = useState("");

	const handleChangeProductCat = (event) => {
		setProductCat(event.target.value);
	};
	// this for product catagory
	return (
		<section className="p-2 bg-gray-50">
			<form className="form py-3 p-2  ">
				<div className="scroll max-h-[72vh] pr-4 overflow-y-scroll ">
					<div className="grid grid-cols-4 mb-3 gap-5">
						<div className="col  ">
							<h3 className="text-[14px] font-[500] mb-1 text-black ">
								Product Category
							</h3>
							<Select
								className="w-full bg-white"
								size="small"
								labelId="demo-simple-select-helper-label"
								id="productCatDrop"
								value={productCat}
								displayEmpty
								inputProps={{ "aria-label": "Without label" }}
								onChange={handleChangeProductCat}
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value="Fashion">Fashion</MenuItem>
								<MenuItem value="Beauty">Beauty</MenuItem>
								<MenuItem value="Wellness">Wellness</MenuItem>
							</Select>
						</div>
						<div className="col">
							<h3 className="text-[14px] font-[500] mb-1 text-black ">
								Sub Category Name
							</h3>
							<input
								type="text"
								className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm p-3 text-sm "
							/>
						</div>
					</div>
				</div>
				<br />
				<hr />
				<br />
				<div className="w-[250px] ">
					<Button type="button" className="btn-blue btn-lg w-full gap-2">
						<FaCloudUploadAlt className="text-[20px] " />
						Publish & View
					</Button>
				</div>
			</form>
		</section>
	);
}

export default AddSubCategory;
