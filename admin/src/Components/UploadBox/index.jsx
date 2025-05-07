import React from "react";
import { GrGallery } from "react-icons/gr";

function UploadBox(props) {
	return (
		<div className="uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
			<GrGallery className="text-[50px] text-gray-400 pointer-events-none  " />

			<h4 className="text-[14px] text-gray-400 text-center pointer-events-none ">
				Image Upload
			</h4>

			<input
				type="file"
				multiple={props.multiple !== undefined ? props.multiple : false}
				className="absolute top-0 w-full h-full opacity-0 "
			/>
		</div>
	);
}

export default UploadBox;
