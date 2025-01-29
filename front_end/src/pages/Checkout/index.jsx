import { Button, TextField } from "@mui/material";
import { IoBagCheck } from "react-icons/io5";

function Checkout() {
	return (
		<section className="py-10">
			<div className="container flex gap-5">
				<div className="leftCol w-[70%] ">
					<div className="card bg-white shadow-md p-5 rounded-md w-full">
						<h1>Billing Detail</h1>

						<form className="w-full mt-5">
							<div className="flex items-center gap-5">
								<div className="col w-[50%]">
									<TextField
										className="w-full"
										label="Full Name *"
										variante="outlined"
										size="small"
										sx={{
											"& .MuiOutlinedInput-root": {
												"&.Mui-focused fieldset": {
													borderColor: "#ff5151", // Focused border color
												},
											},
											"& .MuiInputLabel-root.Mui-focused": {
												color: "#ff5151", // Focused label color
											},
										}}
									/>
								</div>
								<div className="col w-[50%]">
									<TextField
										className="w-full"
										label="Country *"
										variante="outlined"
										size="small"
										sx={{
											"& .MuiOutlinedInput-root": {
												"&.Mui-focused fieldset": {
													borderColor: "#ff5151", // Focused border color
												},
											},
											"& .MuiInputLabel-root.Mui-focused": {
												color: "#ff5151", // Focused label color
											},
										}}
									/>
								</div>
							</div>

							<h6 className="text-[14px] font-[500] mb-3 mt-2 ">
								Street Address *
							</h6>

							<div className="flex items-center gap-5 pb-5">
								<div className="col w-full">
									<TextField
										className="w-full"
										label="House No. and Street Name *"
										variante="outlined"
										size="small"
										sx={{
											"& .MuiOutlinedInput-root": {
												"&.Mui-focused fieldset": {
													borderColor: "#ff5151", // Focused border color
												},
											},
											"& .MuiInputLabel-root.Mui-focused": {
												color: "#ff5151", // Focused label color
											},
										}}
									/>
								</div>
							</div>

							<div className="flex items-center gap-5 pb-5">
								<div className="col w-full">
									<TextField
										className="w-full"
										label="Apartment, suite, unit, etc. (optional) *"
										variante="outlined"
										size="small"
										sx={{
											"& .MuiOutlinedInput-root": {
												"&.Mui-focused fieldset": {
													borderColor: "#ff5151", // Focused border color
												},
											},
											"& .MuiInputLabel-root.Mui-focused": {
												color: "#ff5151", // Focused label color
											},
										}}
									/>
								</div>
							</div>

							<h6 className="text-[14px] font-[500] mb-3 ">Town/City *</h6>

							<div className="flex items-center gap-5 pb-5">
								<div className="col w-full">
									<TextField
										className="w-full"
										label="City *"
										variante="outlined"
										size="small"
										sx={{
											"& .MuiOutlinedInput-root": {
												"&.Mui-focused fieldset": {
													borderColor: "#ff5151", // Focused border color
												},
											},
											"& .MuiInputLabel-root.Mui-focused": {
												color: "#ff5151", // Focused label color
											},
										}}
									/>
								</div>
							</div>

							<h6 className="text-[14px] font-[500] mb-3 ">State/Country *</h6>

							<div className="flex items-center gap-5 pb-5">
								<div className="col w-full">
									<TextField
										className="w-full"
										label="State *"
										variante="outlined"
										size="small"
										sx={{
											"& .MuiOutlinedInput-root": {
												"&.Mui-focused fieldset": {
													borderColor: "#ff5151", // Focused border color
												},
											},
											"& .MuiInputLabel-root.Mui-focused": {
												color: "#ff5151", // Focused label color
											},
										}}
									/>
								</div>
							</div>

							<h6 className="text-[14px] font-[500] mb-3 ">PostCode/Zip *</h6>

							<div className="flex items-center gap-5 pb-5">
								<div className="col w-full">
									<TextField
										className="w-full"
										label="Zip code *"
										variante="outlined"
										size="small"
										sx={{
											"& .MuiOutlinedInput-root": {
												"&.Mui-focused fieldset": {
													borderColor: "#ff5151", // Focused border color
												},
											},
											"& .MuiInputLabel-root.Mui-focused": {
												color: "#ff5151", // Focused label color
											},
										}}
									/>
								</div>
							</div>

							<div className="flex items-center gap-5">
								<div className="col w-[50%]">
									<TextField
										className="w-full"
										label="Phone Number *"
										variante="outlined"
										size="small"
										sx={{
											"& .MuiOutlinedInput-root": {
												"&.Mui-focused fieldset": {
													borderColor: "#ff5151", // Focused border color
												},
											},
											"& .MuiInputLabel-root.Mui-focused": {
												color: "#ff5151", // Focused label color
											},
										}}
									/>
								</div>
								<div className="col w-[50%]">
									<TextField
										className="w-full"
										label="Email Address *"
										variante="outlined"
										size="small"
										sx={{
											"& .MuiOutlinedInput-root": {
												"&.Mui-focused fieldset": {
													borderColor: "#ff5151", // Focused border color
												},
											},
											"& .MuiInputLabel-root.Mui-focused": {
												color: "#ff5151", // Focused label color
											},
										}}
									/>
								</div>
							</div>
						</form>
					</div>
				</div>

				<div className="rightCol w-[30%] ">
					<div className="card shadow-md bg-white p-5 rounded-md">
						<h2 className="mb-4 ">Your Order</h2>

						<div className="flex items-center justify-between py-3 border-t border-b border-[rgba(0,0,0,0.1)] ">
							<span className="text-[14px] font-[600] "> Product</span>
							<span className="text-[14px] font-[600]">Subtotal</span>
						</div>

						<div className="scroll max-h-[300px] overflow-x-hidden overflow-y-scroll ">
							<div className="flex items-center justify-between py-2">
								<div className="part1 flex items-center gap-3">
									<div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer ">
										<img
											src="https://api.spicezgold.com/download/file_1734528821890_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-0-202308161431.webp"
											alt="productimg"
											className="w-full transition-all group-hover:scale-105"
										/>
									</div>

									<div className="info">
										<h4 className="text-[14px] ">A-Line Kurti With sh...</h4>
										<span className="text-[13px]">Qty : 1</span>
									</div>
								</div>

								<span className="text-[14px] font-[500] ">$50.00</span>
							</div>
							<div className="flex items-center justify-between py-2">
								<div className="part1 flex items-center gap-3">
									<div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer ">
										<img
											src="https://api.spicezgold.com/download/file_1734528821890_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-0-202308161431.webp"
											alt="productimg"
											className="w-full transition-all group-hover:scale-105"
										/>
									</div>

									<div className="info">
										<h4 className="text-[14px] ">A-Line Kurti With sh...</h4>
										<span className="text-[13px]">Qty : 1</span>
									</div>
								</div>

								<span className="text-[14px] font-[500] ">$50.00</span>
							</div>
							<div className="flex items-center justify-between py-2">
								<div className="part1 flex items-center gap-3">
									<div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer ">
										<img
											src="https://api.spicezgold.com/download/file_1734528821890_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-0-202308161431.webp"
											alt="productimg"
											className="w-full transition-all group-hover:scale-105"
										/>
									</div>

									<div className="info">
										<h4 className="text-[14px] ">A-Line Kurti With sh...</h4>
										<span className="text-[13px]">Qty : 1</span>
									</div>
								</div>

								<span className="text-[14px] font-[500] ">$50.00</span>
							</div>
							<div className="flex items-center justify-between py-2">
								<div className="part1 flex items-center gap-3">
									<div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer ">
										<img
											src="https://api.spicezgold.com/download/file_1734528821890_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-0-202308161431.webp"
											alt="productimg"
											className="w-full transition-all group-hover:scale-105"
										/>
									</div>

									<div className="info">
										<h4 className="text-[14px] ">A-Line Kurti With sh...</h4>
										<span className="text-[13px]">Qty : 1</span>
									</div>
								</div>

								<span className="text-[14px] font-[500] ">$50.00</span>
							</div>
							<div className="flex items-center justify-between py-2">
								<div className="part1 flex items-center gap-3">
									<div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer ">
										<img
											src="https://api.spicezgold.com/download/file_1734528821890_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-0-202308161431.webp"
											alt="productimg"
											className="w-full transition-all group-hover:scale-105"
										/>
									</div>

									<div className="info">
										<h4 className="text-[14px] ">A-Line Kurti With sh...</h4>
										<span className="text-[13px]">Qty : 1</span>
									</div>
								</div>

								<span className="text-[14px] font-[500] ">$50.00</span>
							</div>
							<div className="flex items-center justify-between py-2">
								<div className="part1 flex items-center gap-3">
									<div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer ">
										<img
											src="https://api.spicezgold.com/download/file_1734528821890_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-0-202308161431.webp"
											alt="productimg"
											className="w-full transition-all group-hover:scale-105"
										/>
									</div>

									<div className="info">
										<h4 className="text-[14px] ">A-Line Kurti With sh...</h4>
										<span className="text-[13px]">Qty : 1</span>
									</div>
								</div>

								<span className="text-[14px] font-[500] ">$50.00</span>
							</div>
							<div className="flex items-center justify-between py-2">
								<div className="part1 flex items-center gap-3">
									<div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer ">
										<img
											src="https://api.spicezgold.com/download/file_1734528821890_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-0-202308161431.webp"
											alt="productimg"
											className="w-full transition-all group-hover:scale-105"
										/>
									</div>

									<div className="info">
										<h4 className="text-[14px] ">A-Line Kurti With sh...</h4>
										<span className="text-[13px]">Qty : 1</span>
									</div>
								</div>

								<span className="text-[14px] font-[500] ">$50.00</span>
							</div>
							<div className="flex items-center justify-between py-2">
								<div className="part1 flex items-center gap-3">
									<div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer ">
										<img
											src="https://api.spicezgold.com/download/file_1734528821890_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-0-202308161431.webp"
											alt="productimg"
											className="w-full transition-all group-hover:scale-105"
										/>
									</div>

									<div className="info">
										<h4 className="text-[14px] ">A-Line Kurti With sh...</h4>
										<span className="text-[13px]">Qty : 1</span>
									</div>
								</div>

								<span className="text-[14px] font-[500] ">$50.00</span>
							</div>
							<div className="flex items-center justify-between py-2">
								<div className="part1 flex items-center gap-3">
									<div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer ">
										<img
											src="https://api.spicezgold.com/download/file_1734528821890_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-0-202308161431.webp"
											alt="productimg"
											className="w-full transition-all group-hover:scale-105"
										/>
									</div>

									<div className="info">
										<h4 className="text-[14px] ">A-Line Kurti With sh...</h4>
										<span className="text-[13px]">Qty : 1</span>
									</div>
								</div>

								<span className="text-[14px] font-[500] ">$50.00</span>
							</div>
							<div className="flex items-center justify-between py-2">
								<div className="part1 flex items-center gap-3">
									<div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer ">
										<img
											src="https://api.spicezgold.com/download/file_1734528821890_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-0-202308161431.webp"
											alt="productimg"
											className="w-full transition-all group-hover:scale-105"
										/>
									</div>

									<div className="info">
										<h4 className="text-[14px] ">A-Line Kurti With sh...</h4>
										<span className="text-[13px]">Qty : 1</span>
									</div>
								</div>

								<span className="text-[14px] font-[500] ">$50.00</span>
							</div>
							<div className="flex items-center justify-between py-2">
								<div className="part1 flex items-center gap-3">
									<div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer ">
										<img
											src="https://api.spicezgold.com/download/file_1734528821890_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-0-202308161431.webp"
											alt="productimg"
											className="w-full transition-all group-hover:scale-105"
										/>
									</div>

									<div className="info">
										<h4 className="text-[14px] ">A-Line Kurti With sh...</h4>
										<span className="text-[13px]">Qty : 1</span>
									</div>
								</div>

								<span className="text-[14px] font-[500] ">$50.00</span>
							</div>
						</div>

						<Button className="btn-org btn-lg w-full gap-2 ">
							Checkout
							<IoBagCheck className="text-[22px] " />
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Checkout;
