import { Button } from "@mui/material";
import React, { useContext } from "react";

import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { Tooltip } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

// use for category
import { PiExport } from "react-icons/pi";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import MyContext from "../../context/MyContext";
import { useState } from "react";
import { deleteData, deleteMultiple, fetchDataFromApi } from "../../utils/api";
import { useEffect } from "react";

const label = { inputProps: { "aria-label": "Checkbox demo" } }; // this is talwind css table variable and also in mui

// this is use for material ui table
const columns = [
	{ id: "image", label: "IMAGE", minWidth: 250 },
	{ id: "action", label: "ACTION", minWidth: 100 },
];

// this is use for material ui table

function HomeSliderBanners() {
	const context = useContext(MyContext);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [selected, setSelected] = useState([]);
	const [bannerData, setBannerData] = useState([]);

	// ✅ Pagination handlers
	const handleChangePage = (event, newPage) => setPage(newPage);
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	// ✅ Fetch Banners
	const getBanners = async () => {
		try {
			const res = await fetchDataFromApi("/api/banner/all");
			if (res?.success && Array.isArray(res.data)) {
				setBannerData(res.data);
			} else {
				console.warn("No banners found:", res);
			}
		} catch (err) {
			console.error("Failed to fetch banners:", err);
		}
	};

	useEffect(() => {
		getBanners();
	}, [context.isOpenFullScreenPanel.open]);

	// ✅ Select toggles
	const handleSelect = (id) => {
		setSelected((prev) =>
			prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
		);
	};

	const handleSelectAll = (event) => {
		if (event.target.checked) {
			setSelected(bannerData.map((b) => b._id));
		} else {
			setSelected([]);
		}
	};

	// ✅ Single Delete
	const handleDeleteBanner = async (id) => {
		if (!id) return;
		if (!window.confirm("Are you sure you want to delete this banner?")) return;

		const res = await deleteData(`/api/banner/${id}`);
		if (res.success) {
			setBannerData((prev) => prev.filter((b) => b._id !== id));
			setSelected((prev) => prev.filter((sid) => sid !== id));
			alert("Banner deleted successfully!");
		} else {
			alert(res.message || "Failed to delete banner");
		}
	};

	// ✅ Multi Delete
	const handleDeleteSelected = async () => {
		if (selected.length === 0) return;
		if (!window.confirm(`Delete ${selected.length} selected banners?`)) return;

		try {
			const res = await deleteMultiple(`/api/banner/delete-multiple`, {
				ids: selected,
			});

			if (res.success) {
				setBannerData((prev) => prev.filter((b) => !selected.includes(b._id)));
				setSelected([]);
				alert("Selected banners deleted successfully!");
			} else {
				alert(res.message || "Failed to delete selected banners");
			}
		} catch (err) {
			console.error("Error deleting banners:", err);
			alert("Error deleting banners");
		}
	};
	return (
		<>
			{/* Header */}
			<div className="flex items-center justify-between px-2 py-0 ">
				<h2 className="text-[18px] font-[600] ">Home Slider Banners</h2>

				<div className="col w-[30%] ml-auto flex items-center justify-end gap-3 ">
					<Button
						className="btn-blue btn-sm !text-white gap-2 flex items-center"
						onClick={() =>
							context.setIsOpenFullScreenPanel({
								open: true,
								model: "Add Home Slide",
							})
						}
					>
						<TfiLayoutSliderAlt className="text-white text-[20px]" />
						Add Home Slide
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

			{/* Table */}
			<div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead className="!bg-gray-50">
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
								{columns.map((column) => (
									<TableCell
										key={column.id}
										width={column.minWidth}
										align={column.align}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>

						<TableBody>
							{bannerData.length === 0 ? (
								<TableRow>
									<TableCell colSpan={3} align="center">
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
											<TableCell width={300}>
												<div className="w-[300px] flex items-center gap-4">
													<div className="img w-full rounded-md overflow-hidden group">
														<img
															src={banner.images?.[0] || "/no-image.png"}
															alt={banner.title}
															className="w-full h-[150px] object-cover group-hover:scale-105 transition-all rounded-md"
														/>
													</div>
												</div>
											</TableCell>

											{/* Action Buttons */}
											<TableCell width={100}>
												<div className="flex items-center gap-2">
													<Tooltip title="Edit Banner" placement="top">
														<Button
															className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.2)] hover:bg-[rgba(0,0,0,0.05)]"
															onClick={() =>
																context.setIsOpenFullScreenPanel({
																	open: true,
																	model: "Edit Banner",
																	id: banner._id,
																})
															}
														>
															<AiOutlineEdit className="text-[18px]" />
														</Button>
													</Tooltip>

													<Tooltip title="Remove Banner" placement="top">
														<Button
															className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.2)] hover:bg-[rgba(0,0,0,0.05)]"
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

export default HomeSliderBanners;
