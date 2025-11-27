import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./componants/header";
import { Home } from "./pages/Home";
import Footer from "./componants/Footer";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import { createContext, useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ProductZoom from "./componants/ProductZoom";
import { IoMdClose } from "react-icons/io";
import ProductDetailsComponant from "./componants/ProductDetailsComponant";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { CircularProgress, Drawer } from "@mui/material";
import CartPanel from "./componants/CartPanel";
import CartPage from "./pages/Cart";
import Verify from "./pages/Verify";
import toast, { Toaster } from "react-hot-toast";
import ForgotPassword from "./pages/ForgotPassword";
import Checkout from "./pages/Checkout";
import MyAccount from "./pages/MyAccount";
import MyList from "./pages/MyList";
import Orders from "./pages/Orders";
import { fetchDataFromApi } from "./utils/api";
import MyContext from "./context/MyContext";
import Address from "./pages/Address";

function App() {
	const [openProductDetailsModel, setOpenProductDetailsModel] = useState({
		open: false,
		item: {},
	});
	const [openCartPanel, setOpenCartPanel] = useState(false);
	const [isLogin, setIsLogin] = useState(false);
	const [userData, setUserData] = useState(null);
	const [authChecked, setAuthChecked] = useState(false);
	const [catData, setCatData] = useState([]);

	const toggleDrawer = (newOpen) => () => {
		setOpenCartPanel(newOpen);
	};

	const handleCloseProductDetailsModel = () => {
		setOpenProductDetailsModel({
			open: false,
			item: {},
		});
	};

	const openAlertBox = (status, msg) => {
		if (status === "success") {
			toast.success(msg);
		}
		if (status === "error") {
			toast.error(msg);
		}
	};

	useEffect(() => {
		const token = localStorage.getItem("accessToken");

		if (token !== undefined && token !== null && token !== "") {
			setIsLogin(true);
		} else {
			setIsLogin(false);
		}
		setAuthChecked(true);
	}, []);
	// console.log(authChecked, isLogin);

	useEffect(() => {
		if (isLogin && !userData?.name) {
			fetchDataFromApi("/api/user/user-details")
				.then((res) => {
					if (res?.user) {
						setUserData(res.user);
						localStorage.setItem("userId", res.user._id);
					} else {
						console.warn("User details not found in response", res);
					}
				})
				.catch((err) => {
					console.error("Failed to fetch user details", err);
				});
		}
	}, [isLogin]);

	useEffect(() => {
		fetchDataFromApi("/api/category/categories").then((res) => {
			if (res?.error === false) {
				setCatData(res?.data);
			}
		});
	}, []);

	const value = {
		setOpenProductDetailsModel: setOpenProductDetailsModel,
		setOpenCartPanel: setOpenCartPanel,
		openAlertBox: openAlertBox,
		isLogin: isLogin,
		setIsLogin: setIsLogin,
		userData: userData,
		setUserData: setUserData,
		setCatData: setCatData,
		catData: catData,
	};

	function PrivateRoutes({ children }) {
		// privet route when login then only open route
		// console.log(isLogin)
		if (!authChecked) {
			console.log(authChecked);

			return (
				<div>
					{" "}
					<CircularProgress color="inherit" />
				</div>
			); // or a spinner
		}
		if (!isLogin) {
			return <Navigate to="/login" />;
		}

		return children;
	}
	return (
		<>
			<MyContext.Provider value={value}>
				<Header />
				<Routes>
					<Route path={"/"} exact={true} element={<Home />} />
					<Route
						path={"/productListing/:id"}
						exact={true}
						element={<ProductListing />}
					/>
					<Route
						path={"/productDetails/:id"}
						exact={true}
						element={<ProductDetails />}
					/>
					<Route path={"/login"} exact={true} element={<Login />} />
					<Route path={"/register"} exact={true} element={<Register />} />
					<Route
						path={"/cart"}
						exact={true}
						element={
							<PrivateRoutes>
								<CartPage />
							</PrivateRoutes>
						}
					/>
					<Route path={"/verify"} exact={true} element={<Verify />} />
					<Route
						path={"/forgot-password"}
						exact={true}
						element={<ForgotPassword />}
					/>
					<Route path={"/checkout"} exact={true} element={<Checkout />} />
					<Route
						path={"/my-account"}
						exact={true}
						element={
							<PrivateRoutes>
								<MyAccount />
							</PrivateRoutes>
						}
					/>
					<Route
						path={"/my-list"}
						exact={true}
						element={
							<PrivateRoutes>
								<MyList />
							</PrivateRoutes>
						}
					/>
					<Route
						path={"/my-orders"}
						exact={true}
						element={
							<PrivateRoutes>
								<Orders />
							</PrivateRoutes>
						}
					/>
					<Route
						path={"/address"}
						exact={true}
						element={
							<PrivateRoutes>
								<Address />
							</PrivateRoutes>
						}
					/>
				</Routes>

				<Footer />
			</MyContext.Provider>
			{/* toast from hot tost npm */}
			<Toaster />
			<Dialog
				open={openProductDetailsModel.open}
				onClose={handleCloseProductDetailsModel}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				fullWidth={true}
				maxWidth="lg"
				className="productDetailsModel "
			>
				<DialogContent>
					<div className="productDetailsModelContainer flex item-center w-full relative">
						<Button
							className="!absolute !w-[40px] !min-w-[40px] !h-[40px] !bg-[#f1f1f1] !rounded-full !text-black right-0 top-0"
							onClick={handleCloseProductDetailsModel}
						>
							<IoMdClose className="!text-[18px]  " />
						</Button>
						<div className="col1 w-[43%] ">
							<ProductZoom images={openProductDetailsModel.item.images} />
						</div>
						<div className="col2 productContent w-[57%] px-5 ">
							<ProductDetailsComponant item={openProductDetailsModel.item} />
						</div>
					</div>
				</DialogContent>
			</Dialog>

			{/* cart panel . */}

			<Drawer open={openCartPanel} onClose={toggleDrawer(false)} anchor="right">
				<div className="w-[400px] py-3 px-4 ">
					<div className="flex items-center justify-between  gap-3  border-b border-[rgba(0,0,0,0.1)] ">
						<h4>Shoping Cart (1)</h4>
						<Button
							className=" !w-[30px] !min-w-[30px] !h-[30px] !bg-[#f1f1f1] !rounded-full !text-black right-0 top-0"
							onClick={toggleDrawer(false)}
						>
							<IoMdClose className="!text-[16px]  " />
						</Button>
					</div>
					<CartPanel />
				</div>
			</Drawer>
		</>
	);
}

export { App };
