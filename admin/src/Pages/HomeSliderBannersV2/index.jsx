import { Button, Checkbox, Switch, Tooltip } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import MyContext from "../../context/MyContext";

import {
	fetchDataFromApi,
	deleteData,
	deleteMultiple,
	putData,
} from "../../utils/api";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

// ADD NEW COLUMNS HERE
const columns = [
	{ id: "image", label: "IMAGE", minWidth: 250 },
	{ id: "title", label: "TITLE", minWidth: 200 },
	{ id: "isActive", label: "ACTIVE STATUS", minWidth: 120 },
	{ id: "action", label: "ACTION", minWidth: 100 },
];

function HomeSliderBannersV2() {
	const context = useContext(MyContext);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [selected, setSelected] = useState([]);
	const [bannerData, setBannerData] = useState([]);

	const handleChangePage = (event, newPage) => setPage(newPage);
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	// Fetch banners
	const getBanners = async () => {
		const res = await fetchDataFromApi("/api/bannerv2/all");
		if (res?.success) setBannerData(res.data);
	};

	useEffect(() => {
		getBanners();
	}, [context.isOpenFullScreenPanel.open]);

	// Select Single
	const handleSelect = (id) => {
		setSelected((prev) =>
			prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
		);
	};

	// Select All
	const handleSelectAll = (e) => {
		if (e.target.checked) setSelected(bannerData.map((b) => b._id));
		else setSelected([]);
	};

	// Delete Single
	const handleDeleteBanner = async (id) => {
		if (!window.confirm("Delete this banner?")) return;

		const res = await deleteData(`/api/bannerv2/${id}`);

		if (res.success) {
			setBannerData((prev) => prev.filter((b) => b._id !== id));
			alert("Deleted Successfully");
		}
	};

	// Delete Multiple
	const handleDeleteSelected = async () => {
		if (selected.length === 0) return;
		if (!window.confirm(`Delete ${selected.length} banners?`)) return;

		const res = await deleteMultiple(`/api/bannerv2/delete-multiple`, {
			ids: selected,
		});

		if (res.success) {
			setBannerData((prev) => prev.filter((b) => !selected.includes(b._id)));
			setSelected([]);
		}
	};

	// 🔥 Toggle ACTIVE STATUS
	const handleToggleActive = async (id, currentStatus) => {
		const newStatus = !currentStatus;

		// immediate UI update
		setBannerData((prev) =>
			prev.map((b) => (b._id === id ? { ...b, isActive: newStatus } : b))
		);

		const res = await putData(`/api/bannerv2/${id}`, { isActive: newStatus });

		if (!res.success) {
			alert("Failed to update active status");
			getBanners(); // reload fallback
		}
	};

	return (
		<>
			<div className="flex items-center justify-between px-2 py-0">
				<h2 className="text-[18px] font-[600]">Home Slider BannersV2</h2>

				<div className="col w-[30%] ml-auto flex items-center justify-end gap-3 ">
					<Button
						className="btn-blue btn-sm !text-white gap-2 flex items-center"
						onClick={() =>
							context.setIsOpenFullScreenPanel({
								open: true,
								model: "Add BannerV2",
							})
						}
					>
						<TfiLayoutSliderAlt className="text-white text-[20px]" />
						Add Home SlideV2
					</Button>

					<Button
						className="!bg-red-600 !text-white btn-sm"
						onClick={handleDeleteSelected}
						disabled={selected.length === 0}
					>
						Delete Selected ({selected.length})
					</Button>
				</div>
			</div>

			<div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table stickyHeader>
						<TableHead>
							<TableRow>
								<TableCell width={60}>
									<Checkbox
										{...label}
										size="small"
										checked={
											selected.length === bannerData.length &&
											bannerData.length > 0
										}
										onChange={handleSelectAll}
									/>
								</TableCell>

								{columns.map((col) => (
									<TableCell key={col.id}>{col.label}</TableCell>
								))}
							</TableRow>
						</TableHead>

						<TableBody>
							{bannerData.length === 0 ? (
								<TableRow>
									<TableCell colSpan={6} align="center">
										No banners found.
									</TableCell>
								</TableRow>
							) : (
								bannerData
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((banner) => (
										<TableRow key={banner._id} hover>
											<TableCell>
												<Checkbox
													{...label}
													size="small"
													checked={selected.includes(banner._id)}
													onChange={() => handleSelect(banner._id)}
												/>
											</TableCell>

											{/* Image */}
											<TableCell>
												<img
													src={banner.images?.[0]}
													alt="banner"
													className="w-[200px] h-[120px] object-cover rounded-md"
												/>
											</TableCell>

											{/* Title */}
											<TableCell>
												<p className="font-medium">{banner.title}</p>
												<p className="text-sm text-gray-600">₹{banner.price}</p>
											</TableCell>

											{/* Active Toggle */}
											<TableCell>
												<Switch
													checked={banner.isActive}
													onChange={() =>
														handleToggleActive(banner._id, banner.isActive)
													}
												/>
											</TableCell>

											{/* Actions */}
											<TableCell>
												<div className="flex items-center gap-2">
													<Tooltip title="Edit Banner" placement="top">
														<Button
															className="!w-[35px] !h-[35px] !min-w-[35px] rounded-full bg-[#f1f1f1]"
															onClick={() =>
																context.setIsOpenFullScreenPanel({
																	open: true,
																	model: "Edit BannerV2",
																	id: banner._id,
																})
															}
														>
															<AiOutlineEdit className="text-[18px]" />
														</Button>
													</Tooltip>

													<Tooltip title="Delete Banner" placement="top">
														<Button
															className="!w-[35px] !h-[35px] !min-w-[35px] rounded-full bg-[#f1f1f1]"
															onClick={() => handleDeleteBanner(banner._id)}
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
					count={bannerData.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</div>
		</>
	);
}

export default HomeSliderBannersV2;
