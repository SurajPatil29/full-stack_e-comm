import { Button, Checkbox, Switch, Tooltip } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
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

function BlogDescription({ description }) {
	const [isExpanded, setIsExpanded] = useState(false);

	const shortText = description?.substr(0, 150) + "...";

	return (
		<div>
			<div
				className="description-content text-gray-700 leading-relaxed"
				dangerouslySetInnerHTML={{
					__html: isExpanded ? description : shortText,
				}}
			></div>

			{/* Toggle Button */}
			{description?.length > 150 && (
				<button
					className="text-blue-600 font-medium mt-2"
					onClick={() => setIsExpanded(!isExpanded)}
				>
					{isExpanded ? "See Less" : "See More"}
				</button>
			)}
		</div>
	);
}

// ✅ BLOG TABLE COLUMNS
const columns = [
	{ id: "image", label: "IMAGE", minWidth: 200 },
	{ id: "title", label: "TITLE", minWidth: 200 },
	{ id: "description", label: "DESCRIPTION", minWidth: 300 },
	{ id: "isActive", label: "ACTIVE STATUS", minWidth: 120 },
	{ id: "action", label: "ACTION", minWidth: 100 },
];

function Blog() {
	const context = useContext(MyContext);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [selected, setSelected] = useState([]);
	const [blogData, setBlogData] = useState([]);

	const handleChangePage = (event, newPage) => setPage(newPage);
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	// ✅ Fetch Blogs
	const getBlogs = async () => {
		const res = await fetchDataFromApi("/api/blog/all");
		if (res?.success) setBlogData(res.data);
	};

	useEffect(() => {
		getBlogs();
	}, [context.isOpenFullScreenPanel.open]);

	// ✅ Select single blog
	const handleSelect = (id) => {
		setSelected((prev) =>
			prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
		);
	};

	// ✅ Select all
	const handleSelectAll = (e) => {
		if (e.target.checked) setSelected(blogData.map((b) => b._id));
		else setSelected([]);
	};

	// ✅ Delete Single Blog
	const handleDeleteBlog = async (id) => {
		if (!window.confirm("Delete this blog?")) return;

		const res = await deleteData(`/api/blog/${id}`);

		if (res.success) {
			setBlogData((prev) => prev.filter((b) => b._id !== id));
			alert("Blog deleted successfully");
		}
	};

	// ✅ Delete Multiple Blogs
	const handleDeleteSelected = async () => {
		if (selected.length === 0) return;
		if (!window.confirm(`Delete ${selected.length} blogs?`)) return;

		const res = await deleteMultiple(`/api/blog/delete-multiple`, {
			ids: selected,
		});

		if (res.success) {
			setBlogData((prev) => prev.filter((b) => !selected.includes(b._id)));
			setSelected([]);
		}
	};

	// ✅ Toggle ACTIVE Status
	const handleToggleActive = async (id, currentStatus) => {
		const newStatus = !currentStatus;

		// Instant UI update
		setBlogData((prev) =>
			prev.map((b) => (b._id === id ? { ...b, isActive: newStatus } : b))
		);

		const res = await putData(`/api/blog/${id}`, {
			isActive: newStatus,
		});

		if (!res.success) {
			alert("Failed to update active status");
			getBlogs(); // rollback if failed
		}
	};

	return (
		<>
			<div className="flex items-center justify-between px-2 py-0">
				<h2 className="text-[18px] font-[600]">Blogs</h2>

				<div className="flex items-center gap-3">
					<Button
						className="btn-blue btn-sm !text-white gap-2"
						onClick={() =>
							context.setIsOpenFullScreenPanel({
								open: true,
								model: "Add Blog",
							})
						}
					>
						Add Blog
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
											selected.length === blogData.length && blogData.length > 0
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
							{blogData.length === 0 ? (
								<TableRow>
									<TableCell colSpan={6} align="center">
										No blogs found.
									</TableCell>
								</TableRow>
							) : (
								blogData
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((blog) => (
										<TableRow key={blog._id} hover>
											<TableCell>
												<Checkbox
													{...label}
													size="small"
													checked={selected.includes(blog._id)}
													onChange={() => handleSelect(blog._id)}
												/>
											</TableCell>

											{/* ✅ Image */}
											<TableCell>
												<img
													src={blog.images?.[0]}
													alt="blog"
													className="w-[200px] h-[120px] object-cover rounded-md"
												/>
											</TableCell>

											{/* ✅ Title + Description */}
											<TableCell>
												<p className="font-semibold text-[15px]">
													{blog.title}
												</p>
											</TableCell>

											<TableCell>
												<BlogDescription description={blog.description} />
											</TableCell>

											{/* ✅ Active Toggle */}
											<TableCell>
												<Switch
													checked={blog.isActive}
													onChange={() =>
														handleToggleActive(blog._id, blog.isActive)
													}
												/>
											</TableCell>

											{/* ✅ Actions */}
											<TableCell>
												<div className="flex items-center gap-2">
													<Tooltip title="Edit Blog" placement="top">
														<Button
															className="!w-[35px] !h-[35px] rounded-full bg-[#f1f1f1]"
															onClick={() =>
																context.setIsOpenFullScreenPanel({
																	open: true,
																	model: "Edit Blog",
																	id: blog._id,
																})
															}
														>
															<AiOutlineEdit className="text-[18px]" />
														</Button>
													</Tooltip>

													<Tooltip title="Delete Blog" placement="top">
														<Button
															className="!w-[35px] !h-[35px] rounded-full bg-[#f1f1f1]"
															onClick={() => handleDeleteBlog(blog._id)}
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
					count={blogData.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</div>
		</>
	);
}

export default Blog;
