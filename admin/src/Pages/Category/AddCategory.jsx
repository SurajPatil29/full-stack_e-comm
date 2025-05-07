import React from "react";
import UploadBox from "../../Components/UploadBox";
import { IoMdCloseCircle } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css"; //css for lasyload img
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button } from "@mui/material";

function AddCategory() {
	return (
		<section className="p-2 bg-gray-50">
			<form className="form py-3 p-2  ">
				<div className="scroll max-h-[72vh] pr-4 overflow-y-scroll ">
					<div className="grid grid-cols-1 mb-3">
						<div className="col">
							<h3 className="text-[14px] font-[500] mb-1 text-black ">
								Product Category Name
							</h3>
							<input
								type="text"
								className="w-[25%] h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm p-3 text-sm "
							/>
						</div>
					</div>
					<div className="col w-full px-5">
						<h3 className="font-[700] text-[18px] mb-3">Category Images</h3>
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

							<UploadBox multiple={false} />
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

export default AddCategory;
