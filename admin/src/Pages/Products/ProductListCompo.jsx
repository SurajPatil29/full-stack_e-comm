import React from "react";

function ProductListCompo() {
	return (
		<div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
			<div className="flex items-center w-full px-5 justify-between ">
				<div className="flex items-center gap-5 w-full">
					{/* MAIN CATEGORY */}
					<div className="col w-[15%]">
						<h4 className="font-[600] text-[13px] mb-2">Category by</h4>
						<Select
							className="w-full"
							size="small"
							value={categoryValue}
							displayEmpty
							onChange={handleChangeCategory}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{catData.map((cat) => (
								<MenuItem key={cat._id} value={cat._id}>
									{cat.name}
								</MenuItem>
							))}
						</Select>
					</div>

					{/* SUB CATEGORY */}
					<div className="col w-[15%]">
						<h4 className="font-[600] text-[13px] mb-2">Sub Category by</h4>
						<Select
							className="w-full"
							size="small"
							value={subCategoryValue}
							displayEmpty
							onChange={handleChangeSubCategory}
							disabled={!categoryValue}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{subCatData.map((sub) => (
								<MenuItem key={sub._id} value={sub._id}>
									{sub.name}
								</MenuItem>
							))}
						</Select>
					</div>

					{/* THIRD LEVEL CATEGORY */}
					<div className="col w-[15%]">
						<h4 className="font-[600] text-[13px] mb-2">
							Third Level Category by
						</h4>
						<Select
							className="w-full"
							size="small"
							value={thirdCategoryValue}
							displayEmpty
							onChange={handleChangeThirdCategory}
							disabled={!subCategoryValue}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{thirdCatData.map((third) => (
								<MenuItem key={third._id} value={third._id}>
									{third.name}
								</MenuItem>
							))}
						</Select>
					</div>
				</div>

				<div className="col w-[20%] ml-auto ">
					<SearchBox />
				</div>
			</div>

			{/* ========================= TABLE ========================= */}
			<br />
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							<TableCell>
								<Checkbox
									checked={
										selected.length === products.length && products.length > 0
									}
									onChange={handleSelectAll}
									size="small"
								/>
							</TableCell>
							{columns.map((column) => (
								<TableCell key={column.id}>{column.label}</TableCell>
							))}
						</TableRow>
					</TableHead>

					<TableBody>
						{/* ✅ Show loading spinner while fetching */}
						{console.log(loading)}
						{loading ? (
							<TableRow>
								<TableCell colSpan={8}>
									<div className="flex items-center justify-center w-full min-h-[400px]">
										<CircularProgress color="inherit" />
									</div>
								</TableCell>
							</TableRow>
						) : products.length === 0 ? (
							// ✅ Show “No products found” when empty
							<TableRow>
								<TableCell colSpan={8}>
									<div className="flex items-center justify-center w-full min-h-[400px] text-gray-500 font-medium">
										No products found
									</div>
								</TableCell>
							</TableRow>
						) : (
							// ✅ Show product rows when data is available
							products
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((product) => (
									<TableRow key={product._id} hover>
										<TableCell>
											<Checkbox
												size="small"
												checked={selected.includes(product._id)}
												onChange={() => handleSelectOne(product._id)}
											/>
										</TableCell>

										{/* PRODUCT */}
										<TableCell>
											<div className="flex items-center gap-4">
												<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
													<Link to={`/product/${product._id}`}>
														<img
															src={
																product.images?.[0] ||
																"https://via.placeholder.com/65"
															}
															alt={product.name}
															className="w-full h-full object-cover group-hover:scale-105 transition-all"
														/>
													</Link>
												</div>
												<div>
													<h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa]">
														<Link to={`/product/${product._id}`}>
															{product.name}
														</Link>
													</h3>
													<p className="text-[12px]">{product.brand}</p>
												</div>
											</div>
										</TableCell>

										<TableCell>{product.catName || "—"}</TableCell>
										<TableCell>{product.subCat || "—"}</TableCell>

										<TableCell>
											<div className="flex flex-col gap-1">
												{product.oldPrice && (
													<span className="line-through text-green-500 text-[13px]">
														₹{product.oldPrice}
													</span>
												)}
												<span className="text-[#3872fa] font-[600] text-[13px]">
													₹{product.price}
												</span>
											</div>
										</TableCell>

										<TableCell>
											<div className="text-[14px] w-[100px]">
												{product.sale || 0}{" "}
												<span className="font-[600]">sale</span>
												<Progress value={product.sale} type="warning" />
											</div>
										</TableCell>

										<TableCell>
											<div className="flex items-center gap-2">
												<Tooltip title="Add BannerV1" placement="top">
													<Button
														className="!w-[35px] !h-[35px] !rounded-full bg-[#f1f1f1] border hover:bg-gray-100"
														onClick={() =>
															context.setIsOpenFullScreenPanel({
																open: true,
																model: "Add Home Slide",
																id: product._id,
															})
														}
													>
														<RiImageAddLine className="text-[18px]" />
													</Button>
												</Tooltip>
												<Tooltip title="Add BannerV2" placement="top">
													<Button
														className="!w-[35px] !h-[35px] !rounded-full bg-[#f1f1f1] border hover:bg-gray-100"
														onClick={() =>
															context.setIsOpenFullScreenPanel({
																open: true,
																model: "Add BannerV2",
																id: product._id,
															})
														}
													>
														<RiImageAddLine className="text-[18px]" />
													</Button>
												</Tooltip>
											</div>
										</TableCell>

										<TableCell>
											<div className="flex items-center gap-2">
												<Tooltip title="Edit Product" placement="top">
													<Button
														className="!w-[35px] !h-[35px] !rounded-full bg-[#f1f1f1] border hover:bg-gray-100"
														onClick={() =>
															context.setIsOpenFullScreenPanel({
																open: true,
																model: "Edit Product",
																id: product._id,
															})
														}
													>
														<AiOutlineEdit className="text-[18px]" />
													</Button>
												</Tooltip>

												<Link to={`/productDetails/${product._id}`}>
													<Tooltip title="View Product Detail" placement="top">
														<Button className="!w-[35px] !h-[35px] !rounded-full bg-[#f1f1f1] border hover:bg-gray-100">
															<FaRegEye className="text-[18px]" />
														</Button>
													</Tooltip>
												</Link>

												<Tooltip title="Remove Product" placement="top">
													<Button
														className="!w-[35px] !h-[35px] !rounded-full bg-[#f1f1f1] border hover:bg-gray-100"
														onClick={() => {
															if (
																window.confirm(
																	"Are you sure you want to delete this product?"
																)
															) {
																deleteProduct(product._id);
															}
														}}
													>
														<MdOutlineDelete className="text-[18px]" />
													</Button>
												</Tooltip>
											</div>
										</TableCell>
									</TableRow>
								))
						)}
					</TableBody>
				</Table>
			</TableContainer>

			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={products.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</div>
	);
}

export default ProductListCompo;
