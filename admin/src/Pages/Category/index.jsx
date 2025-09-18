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

const label = { inputProps: { "aria-label": "Checkbox demo" } }; // this is talwind css table variable and also in mui

// this is use for material ui table
const columns = [
	{ id: "image", label: "IMAGE", minWidth: 150 },
	{ id: "catName", label: "CATEGORY NAME", minWidth: 150 },
	{ id: "action", label: "ACTION", minWidth: 100 },
];

// this is use for material ui table

function CategoryList() {
	const context = useContext(MyContext); //use globle context here

	// this for mui table functions
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	// this for mui table functions

	return (
		<>
			<div className="flex items-center justify-between px-2 py-0 ">
				<h2 className="text-[18px] font-[600] ">Category List</h2>

				<div className="col w-[30%] ml-auto flex items-center justify-end gap-3 ">
					<Button className="btn-sm !bg-green-600 !text-white gap-2 flex items-center">
						{" "}
						<PiExport className="text-white text-[20px] " />
						Export
					</Button>
					<Button
						className="btn-blue btn-sm !text-white gap-2 flex items-center"
						onClick={() =>
							context.setIsOpenFullScreenPanel({
								open: true,
								model: "Add New Category",
							})
						}
					>
						<TfiLayoutSliderAlt className="text-white text-[20px]   " />
						Add New Category
					</Button>
				</div>
			</div>

			{/* this is material ui table v2 */}

			<div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white ">
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead className="!bg-gray-50">
							<TableRow className="">
								<TableCell width={60}>
									<Checkbox {...label} size="small" />
								</TableCell>
								{columns.map((column) => (
									<TableCell
										width={column.minWidth}
										key={column.id}
										align={column.align}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell width={100}>
									<div className="w-[80px] flex items-center gap-4">
										<div className="img w-full rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734685760/catimg4_hthaeb.png"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
									</div>
								</TableCell>
								<TableCell width={100}>Fashion</TableCell>
								<TableCell width={100}>
									{" "}
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell width={100}>
									<div className="w-[80px] flex items-center gap-4">
										<div className="img w-full rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734685760/catimg4_hthaeb.png"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
									</div>
								</TableCell>
								<TableCell width={100}>Fashion</TableCell>
								<TableCell width={100}>
									{" "}
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell width={100}>
									<div className="w-[80px] flex items-center gap-4">
										<div className="img w-full rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734685760/catimg4_hthaeb.png"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
									</div>
								</TableCell>
								<TableCell width={100}>Fashion</TableCell>
								<TableCell width={100}>
									{" "}
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell width={100}>
									<div className="w-[80px] flex items-center gap-4">
										<div className="img w-full rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734685760/catimg4_hthaeb.png"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
									</div>
								</TableCell>
								<TableCell width={100}>Fashion</TableCell>
								<TableCell width={100}>
									{" "}
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell width={100}>
									<div className="w-[80px] flex items-center gap-4">
										<div className="img w-full rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734685760/catimg4_hthaeb.png"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
									</div>
								</TableCell>
								<TableCell width={100}>Fashion</TableCell>
								<TableCell width={100}>
									{" "}
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell width={100}>
									<div className="w-[80px] flex items-center gap-4">
										<div className="img w-full rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734685760/catimg4_hthaeb.png"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
									</div>
								</TableCell>
								<TableCell width={100}>Fashion</TableCell>
								<TableCell width={100}>
									{" "}
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell width={100}>
									<div className="w-[80px] flex items-center gap-4">
										<div className="img w-full rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734685760/catimg4_hthaeb.png"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
									</div>
								</TableCell>
								<TableCell width={100}>Fashion</TableCell>
								<TableCell width={100}>
									{" "}
									<div className="flex items-center gap-2">
										<Tooltip title="Edit Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="View Product Detail" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>

										<Tooltip title="Remove Product" placement="top">
											<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)] active:!bg-[rgba(0,0,0,0.1)] focus:bg-[rgba(0,0,0,0.1)]">
												<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
											</Button>
										</Tooltip>
									</div>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={10}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</div>

			{/* this is material ui table v2 */}
		</>
	);
}

export default CategoryList;
