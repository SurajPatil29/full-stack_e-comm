import React, { useContext, useState } from "react";
import { GrGallery } from "react-icons/gr";
import { CircularProgress } from "@mui/material";
import MyContext from "../../context/MyContext";
import { postFormData } from "../../utils/api";

function UploadBox({ multiple = false, setImg }) {
	const context = useContext(MyContext);
	const [isLoading, setIsLoading] = useState(false);

	const handleFileChange = async (e) => {
		const file = e.target.files?.[0];
		if (!file) {
			context.openAlertBox("error", "No file selected");
			return;
		}

		if (!file.type.startsWith("image/")) {
			context.openAlertBox("error", "Only image files allowed");
			return;
		}

		try {
			setIsLoading(true);
			const formData = new FormData();
			formData.append("images", file);

			const res = await postFormData("/api/category/uploadImages", formData);
			// console.log(res);

			if (!res.success) {
				context.openAlertBox("error", `Upload failed: ${res.message}`);
			} else {
				setImg(res.images[0]); // Pass uploaded URL to parent
				context.openAlertBox("success", "Image uploaded successfully");
			}
		} catch (err) {
			context.openAlertBox("error", "Upload error. Try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div
			className="uploadBox p-3 rounded-md overflow-hidden border border-dashed 
		border-gray-400 h-[150px] w-full bg-gray-100 cursor-pointer hover:bg-gray-200 
		flex items-center justify-center flex-col relative"
		>
			<GrGallery className="text-[50px] text-gray-400 pointer-events-none" />
			<h4 className="text-[14px] text-gray-400 text-center pointer-events-none">
				Image Upload
			</h4>

			{isLoading ? (
				<div
					className="absolute inset-0 flex items-center justify-center 
				bg-[rgba(0,0,0,0.5)] z-50"
				>
					<CircularProgress color="inherit" />
				</div>
			) : (
				<input
					type="file"
					accept="image/*"
					multiple={multiple}
					className="absolute top-0 w-full h-full opacity-0 cursor-pointer"
					onChange={handleFileChange}
				/>
			)}
		</div>
	);
}

export default UploadBox;
