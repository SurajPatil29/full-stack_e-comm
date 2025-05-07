import { Button, MenuItem, Select } from "@mui/material";
import React from "react";
import Rating from "@mui/material/Rating";
import UploadBox from "../../Components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css"; //css for lasyload img
import { IoMdCloseCircle } from "react-icons/io";
import { FaCloudUploadAlt } from "react-icons/fa";

function AddProduct() {
	// this for product catagory
	const [productCat, setProductCat] = React.useState("");

	const handleChangeProductCat = (event) => {
		setProductCat(event.target.value);
	};
	// this for product catagory

	// this for product sub catagory
	const [productSubCat, setProductSubCat] = React.useState("");

	const handleChangeProductSubCat = (event) => {
		setProductSubCat(event.target.value);
	};
	// this for product sub catagory

	// this for product Featured
	const [productFeatured, setProductFeatured] = React.useState("");

	const handleChangeProductFeatured = (event) => {
		setProductFeatured(event.target.value);
	};
	// this for product Featured

	// this for product Rams
	const [productRams, setProductRams] = React.useState("");

	const handleChangeProductRams = (event) => {
		setProductRams(event.target.value);
	};
	// this for product Rams

	// this for product Weight
	const [productWeight, setProductWeight] = React.useState("");

	const handleChangeProductWeight = (event) => {
		setProductWeight(event.target.value);
	};
	// this for product Weight

	// this for product Size
	const [productSize, setProductSize] = React.useState("");

	const handleChangeProductSize = (event) => {
		setProductSize(event.target.value);
	};
	// this for product Size

	return (
		<section className="p-5 bg-gray-50">
			<form className="form py-3 p-8  ">
				<div className="scroll max-h-[72vh] pr-4 overflow-y-scroll ">
					<div className="grid grid-cols-1 mb-3">
						<div className="col">
							<h3 className="text-[14px] font-[500] mb-1 text-black ">
								Product Name
							</h3>
							<input
								type="text"
								className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm p-3 text-sm "
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 mb-3">
						<div className="col">
							<h3 className="text-[14px] font-[500] mb-1 text-black ">
								Product Description
							</h3>
							<textarea
								type="text"
								className="w-full h-[100px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm p-3 text-sm "
							/>
						</div>
					</div>

					<div className="grid grid-cols-4 mb-3 gap-4">
						<div className="col">
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
								Product Sub Category
							</h3>
							<Select
								className="w-full bg-white "
								size="small"
								labelId="demo-simple-select-helper-label"
								id="productCatDrop"
								value={productSubCat}
								displayEmpty
								inputProps={{ "aria-label": "Without label" }}
								onChange={handleChangeProductSubCat}
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value="Men">Men</MenuItem>
								<MenuItem value="Women">Women</MenuItem>
								<MenuItem value="Kids">Kids</MenuItem>
							</Select>
						</div>

						<div className="col">
							<h3 className="text-[14px] font-[500] mb-1 text-black ">
								Product Price
							</h3>
							<input
								type="number"
								className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm p-3 text-sm "
							/>
						</div>

						<div className="col">
							<h3 className="text-[14px] font-[500] mb-1 text-black ">
								Product Old Price
							</h3>
							<input
								type="number"
								className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm p-3 text-sm "
							/>
						</div>
					</div>

					<div className="grid grid-cols-4 mb-3 gap-4">
						<div className="col">
							<h3 className="text-[14px] font-[500] mb-1 text-black ">
								Is Featured?
							</h3>
							<Select
								className="w-full bg-white"
								size="small"
								labelId="demo-simple-select-helper-label"
								id="productCatDrop"
								value={productFeatured}
								displayEmpty
								inputProps={{ "aria-label": "Without label" }}
								onChange={handleChangeProductFeatured}
							>
								<MenuItem value="True">True</MenuItem>
								<MenuItem value="False">False</MenuItem>
							</Select>
						</div>

						<div className="col">
							<h3 className="text-[14px] font-[500] mb-1 text-black ">
								Product Stock
							</h3>
							<input
								type="number"
								className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm p-3 text-sm "
							/>
						</div>

						<div className="col">
							<h3 className="text-[14px] font-[500] mb-1 text-black ">
								Product Brand
							</h3>
							<input
								type="text"
								className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm p-3 text-sm "
							/>
						</div>

						<div className="col">
							<h3 className="text-[14px] font-[500] mb-1 text-black ">
								Product Discount
							</h3>
							<input
								type="number"
								className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm p-3 text-sm "
							/>
						</div>
					</div>

					<div className="grid grid-cols-4 mb-3 gap-4">
						<div className="col">
							<h3 className="text-[14px] font-[500] mb-1 text-black ">
								Product RAMS
							</h3>
							<Select
								className="w-full bg-white "
								size="small"
								labelId="demo-simple-select-helper-label"
								id="productCatDrop"
								value={productRams}
								displayEmpty
								inputProps={{ "aria-label": "Without label" }}
								onChange={handleChangeProductRams}
							>
								<MenuItem value="4GB">4GB</MenuItem>
								<MenuItem value="6GB">6GB</MenuItem>
								<MenuItem value="8GB">8GB</MenuItem>
							</Select>
						</div>

						<div className="col">
							<h3 className="text-[14px] font-[500] mb-1 text-black ">
								Product Sub Category
							</h3>
							<Select
								className="w-full bg-white "
								size="small"
								labelId="demo-simple-select-helper-label"
								id="productCatDrop"
								value={productWeight}
								displayEmpty
								inputProps={{ "aria-label": "Without label" }}
								onChange={handleChangeProductWeight}
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value="2KG">2KG</MenuItem>
								<MenuItem value="4KG">4KG</MenuItem>
								<MenuItem value="5Kg">5Kg</MenuItem>
							</Select>
						</div>

						<div className="col">
							<h3 className="text-[14px] font-[500] mb-1 text-black ">
								Product Weight
							</h3>
							<Select
								className="w-full bg-white"
								size="small"
								labelId="demo-simple-select-helper-label"
								id="productCatDrop"
								value={productSize}
								displayEmpty
								inputProps={{ "aria-label": "Without label" }}
								onChange={handleChangeProductSize}
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value="S">S</MenuItem>
								<MenuItem value="M">M</MenuItem>
								<MenuItem value="L">L</MenuItem>
							</Select>
						</div>

						<div className="col">
							<h3 className="text-[14px] font-[500] mb-1 text-black ">
								Product Rating
							</h3>
							<Rating name="half-rating" defaultValue={2.5} precision={0.5} />
						</div>
					</div>

					<div className="col w-full p-5">
						<h3 className="font-[700] text-[18px] mb-3">Media & Images</h3>

						<div className="grid grid-cols-7 gap-4 ">
							<div className="uploadBoxWrapper relative">
								<span className="absolute w-[20px] h-[25px] rounded-full overflow-hidden -top-[5px] -right-[5px] z-50 cursor-pointer">
									<IoMdCloseCircle className=" text-red-700 text-[20px] " />
								</span>
								<div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
									<LazyLoadImage
										className="w-full h-full object-cover"
										alt="image"
										src="https://m.media-amazon.com/images/I/510uTHyDqGL._SY450_.jpg" // use normal <img> attributes as props
										effect="blur"
										wrapperProps={{
											// If you need to, you can tweak the effect transition using the wrapper style.
											style: { transitionDelay: "1s" },
										}}
									/>
								</div>
							</div>
							<div className="uploadBoxWrapper relative">
								<span className="absolute w-[20px] h-[25px] rounded-full overflow-hidden -top-[5px] -right-[5px] z-50 cursor-pointer">
									<IoMdCloseCircle className=" text-red-700 text-[20px] " />
								</span>
								<div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
									<LazyLoadImage
										className="w-full h-full object-cover"
										alt="image"
										src="https://m.media-amazon.com/images/I/510uTHyDqGL._SY450_.jpg" // use normal <img> attributes as props
										effect="blur"
										wrapperProps={{
											// If you need to, you can tweak the effect transition using the wrapper style.
											style: { transitionDelay: "1s" },
										}}
									/>
								</div>
							</div>
							<div className="uploadBoxWrapper relative">
								<span className="absolute w-[20px] h-[25px] rounded-full overflow-hidden -top-[5px] -right-[5px] z-50 cursor-pointer">
									<IoMdCloseCircle className=" text-red-700 text-[20px] " />
								</span>
								<div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
									<LazyLoadImage
										className="w-full h-full object-cover"
										alt="image"
										src="https://m.media-amazon.com/images/I/510uTHyDqGL._SY450_.jpg" // use normal <img> attributes as props
										effect="blur"
										wrapperProps={{
											// If you need to, you can tweak the effect transition using the wrapper style.
											style: { transitionDelay: "1s" },
										}}
									/>
								</div>
							</div>
							<div className="uploadBoxWrapper relative">
								<span className="absolute w-[20px] h-[25px] rounded-full overflow-hidden -top-[5px] -right-[5px] z-50 cursor-pointer">
									<IoMdCloseCircle className=" text-red-700 text-[20px] " />
								</span>
								<div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
									<LazyLoadImage
										className="w-full h-full object-cover"
										alt="image"
										src="https://m.media-amazon.com/images/I/510uTHyDqGL._SY450_.jpg" // use normal <img> attributes as props
										effect="blur"
										wrapperProps={{
											// If you need to, you can tweak the effect transition using the wrapper style.
											style: { transitionDelay: "1s" },
										}}
									/>
								</div>
							</div>
							<div className="uploadBoxWrapper relative">
								<span className="absolute w-[20px] h-[25px] rounded-full overflow-hidden -top-[5px] -right-[5px] z-50 cursor-pointer">
									<IoMdCloseCircle className=" text-red-700 text-[20px] " />
								</span>
								<div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
									<LazyLoadImage
										className="w-full h-full object-cover"
										alt="image"
										src="https://m.media-amazon.com/images/I/510uTHyDqGL._SY450_.jpg" // use normal <img> attributes as props
										effect="blur"
										wrapperProps={{
											// If you need to, you can tweak the effect transition using the wrapper style.
											style: { transitionDelay: "1s" },
										}}
									/>
								</div>
							</div>
							<div className="uploadBoxWrapper relative">
								<span className="absolute w-[20px] h-[25px] rounded-full overflow-hidden -top-[5px] -right-[5px] z-50 cursor-pointer">
									<IoMdCloseCircle className=" text-red-700 text-[20px] " />
								</span>
								<div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
									<LazyLoadImage
										className="w-full h-full object-cover"
										alt="image"
										src="https://m.media-amazon.com/images/I/510uTHyDqGL._SY450_.jpg" // use normal <img> attributes as props
										effect="blur"
										wrapperProps={{
											// If you need to, you can tweak the effect transition using the wrapper style.
											style: { transitionDelay: "1s" },
										}}
									/>
								</div>
							</div>

							<UploadBox multiple={true} />
						</div>
					</div>
				</div>
				<hr />
				<br />
				<Button type="button" className="btn-blue btn-lg w-full gap-2">
					<FaCloudUploadAlt className="text-[20px] " />
					Publish & View
				</Button>
			</form>
		</section>
	);
}

export default AddProduct;
