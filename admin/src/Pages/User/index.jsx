import React from "react";

import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import { MdLocalPhone, MdOutlineMarkEmailRead } from "react-icons/md";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

// use for category

import SearchBox from "../../Components/SearchBox";

const label = { inputProps: { "aria-label": "Checkbox demo" } }; // this is talwind css table variable and also in mui

// this is use for material ui table
const columns = [
	{ id: "userImg", label: "USER IMAGE", minWidth: 80 },
	{ id: "userName", label: "USER NAME", minWidth: 100 },
	{
		id: "userEmail",
		label: "USER Email",
		minWidth: 150,
	},
	{
		id: "userPh",
		label: "USER PHONE NO",
		minWidth: 150,
	},
];

// this is use for material ui table

function User() {
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

	//
	return (
		<>
			{/* this is material ui table v2 */}

			<div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white ">
				<div className="flex items-center w-full px-5 justify-between ">
					<div className="col w-[20%] ">
						<h2 className="text-[18px] font-[600] ">Users List</h2>
					</div>
					<div className="col w-[40%] ml-auto ">
						<SearchBox />
					</div>
				</div>
				<br />
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead className="!bg-gray-50">
							<TableRow className="">
								<TableCell style={{ minWidth: columns.minWidth }}>
									<Checkbox {...label} size="small" />
								</TableCell>
								{columns.map((column) => (
									<TableCell
										key={column.id}
										align={column.align}
										style={{ minWidth: column.minWidth }}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="w-[70px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1746614266/userImg_pqx7zy.jpg"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Tom
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<span className="flex items-center gap-2">
										<MdOutlineMarkEmailRead /> tom@email.com
									</span>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<span className="flex items-center gap-2">
										<MdLocalPhone />
										91 90123456789
									</span>{" "}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="w-[70px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1746614266/userImg_pqx7zy.jpg"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Tom
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<span className="flex items-center gap-2">
										<MdOutlineMarkEmailRead /> tom@email.com
									</span>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<span className="flex items-center gap-2">
										<MdLocalPhone />
										91 90123456789
									</span>{" "}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="w-[70px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1746614266/userImg_pqx7zy.jpg"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Tom
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<span className="flex items-center gap-2">
										<MdOutlineMarkEmailRead /> tom@email.com
									</span>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<span className="flex items-center gap-2">
										<MdLocalPhone />
										91 90123456789
									</span>{" "}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="w-[70px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1746614266/userImg_pqx7zy.jpg"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Tom
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<span className="flex items-center gap-2">
										<MdOutlineMarkEmailRead /> tom@email.com
									</span>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<span className="flex items-center gap-2">
										<MdLocalPhone />
										91 90123456789
									</span>{" "}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="w-[70px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1746614266/userImg_pqx7zy.jpg"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Tom
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<span className="flex items-center gap-2">
										<MdOutlineMarkEmailRead /> tom@email.com
									</span>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<span className="flex items-center gap-2">
										<MdLocalPhone />
										91 90123456789
									</span>{" "}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="w-[70px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1746614266/userImg_pqx7zy.jpg"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Tom
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<span className="flex items-center gap-2">
										<MdOutlineMarkEmailRead /> tom@email.com
									</span>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<span className="flex items-center gap-2">
										<MdLocalPhone />
										91 90123456789
									</span>{" "}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="w-[70px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1746614266/userImg_pqx7zy.jpg"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Tom
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<span className="flex items-center gap-2">
										<MdOutlineMarkEmailRead /> tom@email.com
									</span>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<span className="flex items-center gap-2">
										<MdLocalPhone />
										91 90123456789
									</span>{" "}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<Checkbox {...label} size="small" />
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<div className="w-[70px] flex items-center gap-4">
										<div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
											<Link to="/product/474557">
												<img
													src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1746614266/userImg_pqx7zy.jpg"
													alt=""
													className="w-full group-hover:scale-105 transition-all "
												/>
											</Link>
										</div>
									</div>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									Tom
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<span className="flex items-center gap-2">
										<MdOutlineMarkEmailRead /> tom@email.com
									</span>
								</TableCell>
								<TableCell style={{ minWidth: columns.minWidth }}>
									<span className="flex items-center gap-2">
										<MdLocalPhone />
										91 90123456789
									</span>{" "}
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

export default User;
