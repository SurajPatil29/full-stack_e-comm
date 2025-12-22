import React from "react";

import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import {
	MdDateRange,
	MdLocalPhone,
	MdOutlineMarkEmailRead,
	MdOutlineDelete,
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
	const [selected, setSelected] = useState([]);

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
	/* ================= CHECKBOX LOGIC ================= */

	const handleSelectAll = (e) => {
		if (e.target.checked) {
			setSelected(paginatedUsers.map((u) => u._id));
		} else {
			setSelected([]);
		}
	};

	const handleSelectOne = (id) => {
		setSelected((prev) =>
			prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
		);
	};

	const isAllSelected =
		paginatedUsers.length > 0 &&
		paginatedUsers.every((u) => selected.includes(u._id));

	/* ================= DELETE MULTIPLE USERS ================= */

	const deleteMultipleUsers = async () => {
		try {
			setLoading(true);

			const res = await deleteMultiple(`/api/user/multiUserDelete`, {
				ids: selected,
			});

			if (res?.success) {
				setUsers((prev) => prev.filter((u) => !selected.includes(u._id)));
				setSelected([]);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};
	return (
		<>
			{/* this is material ui table v2 */}

			<div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white ">
				<div className="flex items-center w-full px-5 justify-between ">
					<div className="col w-[20%] ">
						<h2 className="text-[18px] font-[600] ">Users List</h2>
					</div>
					<div className="ml-auto flex items-center gap-3 w-[50%] ">
						{selected.length > 0 && (
							<Button
								onClick={deleteMultipleUsers}
								className="!bg-red-600 !text-white gap-2"
								size="small"
							>
								<MdOutlineDelete />
								Delete ({selected.length})
							</Button>
						)}
						<div className="w-[80%]">
							<SearchBox
								searchQuery={searchQuery}
								setSearchQuery={setSearchQuery}
								setPageOrder={setPage} // reset pagination on search
							/>
						</div>
					</div>
				</div>
				<br />
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead className="!bg-gray-50">
							<TableRow className="">
								<TableCell padding="checkbox">
									<Checkbox
										size="small"
										checked={isAllSelected}
										onChange={handleSelectAll}
									/>
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
							{!loading &&
								paginatedUsers.map((user) => (
									<TableRow hover key={user._id}>
										<TableCell padding="checkbox">
											<Checkbox
												size="small"
												checked={selected.includes(user._id)}
												onChange={() => handleSelectOne(user._id)}
											/>
										</TableCell>
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
