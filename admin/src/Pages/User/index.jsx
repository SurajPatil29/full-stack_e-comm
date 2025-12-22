import React from "react";

import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import {
	MdDateRange,
	MdLocalPhone,
	MdOutlineMarkEmailRead,
} from "react-icons/md";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

// use for category

import SearchBox from "../../Components/SearchBox";
import { useEffect } from "react";
import { fetchDataFromApi } from "../../utils/api";
import { useState } from "react";

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
	{
		id: "createdDate",
		label: "CREATED",
		minWidth: 150,
	},
];

// this is use for material ui table

function User() {
	const [users, setUsers] = useState([]);
	const [totalUsers, setTotalUsers] = useState(0);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [loading, setLoading] = useState(false);

	const [searchQuery, setSearchQuery] = useState("");

	const fetchUsers = async () => {
		setLoading(true);
		try {
			const res = await fetchDataFromApi(`/api/user/userCount`);

			setUsers(res?.users || []);
			setTotalUsers(res?.totalUsers || 0);
		} catch (error) {
			console.error("User fetch error:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	useEffect(() => {
		setPage(0);
	}, [searchQuery]);

	const filterUsers = (users, query) => {
		if (!query) return users;

		const q = query.toLowerCase();

		return users.filter((user) => {
			return (
				user.name?.toLowerCase().includes(q) ||
				user.email?.toLowerCase().includes(q) ||
				String(user.mobile || "").includes(q)
			);
		});
	};

	// 🔹 LOCAL PAGINATION
	const filteredUsers = filterUsers(users, searchQuery);

	// local pagination
	const startIndex = page * rowsPerPage;
	const endIndex = startIndex + rowsPerPage;

	const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

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
						<SearchBox
							searchQuery={searchQuery}
							setSearchQuery={setSearchQuery}
							setPageOrder={setPage} // reset pagination on search
						/>
					</div>
				</div>
				<br />
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead className="!bg-gray-50">
							<TableRow className="">
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
							{!loading &&
								paginatedUsers.map((user) => (
									<TableRow hover key={user._id}>
										<TableCell>
											<img
												src={
													user.avatar ||
													"https://cdn-icons-png.flaticon.com/512/149/149071.png"
												}
												className="w-[45px] h-[45px] rounded-md object-cover"
											/>
										</TableCell>

										<TableCell>{user.name}</TableCell>

										<TableCell>
											<span className="flex items-center gap-2">
												<MdOutlineMarkEmailRead />
												{user.email}
											</span>
										</TableCell>

										<TableCell>
											<span className="flex items-center gap-2">
												<MdLocalPhone />
												{user.mobile || "N/A"}
											</span>
										</TableCell>

										<TableCell>
											<span className="flex items-center gap-2">
												<MdDateRange />
												{new Date(user.createdAt).toLocaleDateString()}
											</span>
										</TableCell>
									</TableRow>
								))}

							{!loading && users.length === 0 && (
								<TableRow>
									<TableCell colSpan={6} align="center">
										No users found
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={filteredUsers.length} // 🔥 important
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={(e, newPage) => setPage(newPage)}
					onRowsPerPageChange={(e) => {
						setRowsPerPage(parseInt(e.target.value, 10));
						setPage(0);
					}}
				/>
			</div>

			{/* this is material ui table v2 */}
		</>
	);
}

export default User;
