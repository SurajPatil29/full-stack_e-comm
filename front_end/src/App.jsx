import { Link, Navigate, Route, Routes } from "react-router-dom";
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
import { fetchDataFromApi, postData, putData } from "./utils/api";
import MyContext from "./context/MyContext";
import Address from "./pages/Address";
import { IoCartOutline } from "react-icons/io5";
import AddressPage from "./pages/Address/AddressPage";
import OrderSuccess from "./pages/Checkout/OrderSuccess";
import SearchPage from "./pages/Search";

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
	const [cartData, setCartData] = useState([]);
	const [isLoadingAddToCart, setIsLoadingAddToCart] = useState(false);
	const [myListData, setMyListData] = useState([]);
	const [isLoadingAddToMyList, setIsLoadingAddToMyList] = useState(false);
	const [searchData, setSearchData] = useState([]);

	const [openAddressPanel, setOpenAddressPanel] = useState(false);

	const toggleAddressDrawer = (newOpen) => () => {
		setOpenAddressPanel(newOpen);
	};

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
		if (status === "info") {
			toast(msg); // ✅ neutral info toast
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

	const loadUserDetails = async () => {
		try {
			const res = await fetchDataFromApi("/api/user/user-details");

			if (res?.user) {
				setUserData(res.user);
				localStorage.setItem("userId", res.user._id);

				fetchCartData();
				fetchMyListData();
			} else {
				console.warn("User details not found in response", res);
			}
		} catch (error) {
			console.error("Failed to fetch user details", error);
		}
	};

	useEffect(() => {
		if (isLogin && !userData?.name) {
			loadUserDetails();
		} else {
			setUserData(null);
			setCartData([]);
			setMyListData([]);
		}
	}, [isLogin]);

	useEffect(() => {
		fetchDataFromApi("/api/category/categories").then((res) => {
			if (res?.error === false) {
				setCatData(res?.data);
			}
		});
		window.scrollTo(0, 0);
	}, []);

	const addToCart = async (
		product,
		userId,
		quantity = 1,
		ram,
		size,
		weight
	) => {
		try {
			setIsLoadingAddToCart(true);
			// ----------------------------------
			// 1. User Not Logged In
			// ----------------------------------
			if (!userId) {
				openAlertBox("error", "Please log in first.");
				setIsLoadingAddToCart(false);
				return false;
			}

			// ----------------------------------
			// 2. Missing Product
			// ----------------------------------
			if (!product || !product?._id) {
				openAlertBox("error", "Product not found.");
				setIsLoadingAddToCart(false);

				return false;
			}

			// ----------------------------------
			// 3. Invalid Quantity
			// ----------------------------------
			if (quantity <= 0 || typeof quantity !== "number") {
				openAlertBox("error", "Invalid quantity selected.");
				setIsLoadingAddToCart(false);

				return false;
			}

			// ----------------------------------
			// 4. Stock Validation
			// ----------------------------------
			if (product.countInStock === 0) {
				openAlertBox("error", "This product is out of stock.");
				setIsLoadingAddToCart(false);

				return false;
			}

			if (quantity > product.countInStock) {
				openAlertBox(
					"error",
					`Only ${product.countInStock} items available in stock.`
				);
				setIsLoadingAddToCart(false);

				return false;
			}

			// ----------------------------------
			// 5. Prepare Payload
			// ----------------------------------
			const data = {
				productTitle: product.name || "",
				image: product.images?.[0] || "",
				rating: product.avgRating || product.rating || 0,
				price: product.price || 0,
				oldPrice: product.oldPrice || 0,
				quantity,
				subTotal: Number(product.price * quantity) || 0,
				productId: product._id,
				countInStock: product.countInStock - quantity,
				userId,
				ram: ram || product.productRam[0],
				size: size || product.size[0],
				weight: weight || product.productWeight[0],
				ProductBrand: product.brand,
				ramRange: product.productRam,
				sizeRange: product.size,
				weightRange: product.productWeight,
			};

			// ----------------------------------
			// 6. Validate Payload
			// ----------------------------------
			if (!data.productTitle || !data.image || !data.price) {
				openAlertBox("error", "Product details missing.");
				setIsLoadingAddToCart(false);

				return false;
			}

			// ----------------------------------
			// 7. Add to Cart API Call
			// ----------------------------------
			const res = await postData("/api/cart/add", data);

			if (res?.error === false) {
				openAlertBox("success", res.message);

				// ----------------------------------
				// 8. 🔥 Update Product Stock in DB
				// ----------------------------------
				const newStock = product.countInStock - quantity;

				// ----------------------------------
				// 9. Refresh Cart + Product Details
				// ----------------------------------
				await fetchCartData();
				setTimeout(() => {
					setIsLoadingAddToCart(false);
				}, 1000);
			} else {
				openAlertBox("error", res?.message || "Unable to add item to cart.");
				setIsLoadingAddToCart(false);
			}
		} catch (error) {
			console.error("Add to cart error:", error);
			openAlertBox("error", "Server error, please try again.");
			setIsLoadingAddToCart(false);
		}
	};

	const fetchCartData = async () => {
		try {
			const res = await fetchDataFromApi("/api/cart/get");
			if (res?.data) {
				setCartData(res.data);
			} else {
				openAlertBox("error", "Unable to fetch cart data");
			}
		} catch (error) {
			console.error("Cart Fetch Error:", error);
			openAlertBox("error", "Something went wrong while fetching cart.");
		}
	};

	const addToMyList = async (product, userId) => {
		try {
			setIsLoadingAddToMyList(true);

			if (!userId) {
				openAlertBox("error", "Please Log in first.");
				setIsLoadingAddToMyList(false);
				return false;
			}

			if (!product || !product?._id) {
				openAlertBox("error", "Please not found.");
				setIsLoadingAddToMyList(false);
				return false;
			}

			const data = {
				productTitle: product.name || "",
				image: product.images?.[0] || "",
				rating: product.avgRating || product.rating || 0,
				price: product.price || 0,
				oldPrice: product.oldPrice || 0,
				productId: product._id,
				userId,
				ProductBrand: product.brand,
			};

			if (!data.productTitle || !data.image || !data.price) {
				openAlertBox("error", "Product details missing.");
				setIsLoadingAddToMyList(false);

				return false;
			}

			const res = await postData("/api/myList/mylist-add", data);

			if (res?.error === false) {
				openAlertBox("success", res.message);

				await fetchMyListData();
				setTimeout(() => {
					setIsLoadingAddToMyList(false);
				}, 1000);
			} else {
				openAlertBox("error", res?.message || "Unable to add item to MyList");
				setIsLoadingAddToMyList(false);
			}
		} catch (error) {
			console.error("Add to MyList error:", error);
			openAlertBox("error", "Server error, please try again.");
			setIsLoadingAddToMyList(false);
		}
	};

	const fetchMyListData = async () => {
		try {
			const res = await fetchDataFromApi("/api/myList/get-mylist");
			if (res?.data) {
				setMyListData(res.data);
			} else {
				openAlertBox("error", "Unable to fetch MyList data");
			}
		} catch (error) {
			console.error("MyList Fetch Error:", error);
			openAlertBox("error", "Something went wrong while fetching MyList.");
		}
	};

	const value = {
		setOpenProductDetailsModel: setOpenProductDetailsModel,
		setOpenCartPanel: setOpenCartPanel,
		openAlertBox: openAlertBox,
		isLogin: isLogin,
		setIsLogin: setIsLogin,
		userData: userData,
		setUserData: setUserData,
		loadUserDetails: loadUserDetails,
		setCatData: setCatData,
		catData: catData,
		addToCart: addToCart,
		cartData: cartData,
		fetchCartData: fetchCartData,
		isLoadingAddToCart: isLoadingAddToCart,
		setIsLoadingAddToCart: setIsLoadingAddToCart,
		addToMyList: addToMyList,
		myListData: myListData,
		fetchMyListData: fetchMyListData,
		isLoadingAddToMyList: isLoadingAddToMyList,
		setIsLoadingAddToMyList: setIsLoadingAddToMyList,
		openAddressPanel: openAddressPanel,
		setOpenAddressPanel: setOpenAddressPanel,
		searchData: searchData,
		setSearchData: setSearchData,
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
					<Route path={"/search-page"} exact={true} element={<SearchPage />} />
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
						path={"/order-success"}
						exact={true}
						element={
							<PrivateRoutes>
								<OrderSuccess />
							</PrivateRoutes>
						}
					/>
					<Route
						path={"/address"}
						exact={true}
						element={
							<PrivateRoutes>
								<AddressPage />
							</PrivateRoutes>
						}
					/>
				</Routes>

				<Footer />

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

				<Drawer
					open={openCartPanel}
					onClose={toggleDrawer(false)}
					anchor="right"
				>
					<div className="w-[400px] py-3 px-4 ">
						<div className="flex items-center justify-between  gap-3  border-b border-[rgba(0,0,0,0.1)] ">
							<h4>Shoping Cart {cartData?.length}</h4>
							<Button
								className=" !w-[30px] !min-w-[30px] !h-[30px] !bg-[#f1f1f1] !rounded-full !text-black right-0 top-0"
								onClick={toggleDrawer(false)}
							>
								<IoMdClose className="!text-[16px]  " />
							</Button>
						</div>
						{cartData?.length !== 0 ? (
							<CartPanel data={cartData} />
						) : (
							<div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
								{/* Icon Box */}
								<div
									className="w-20 h-20 flex items-center justify-center rounded-full"
									style={{ backgroundColor: "rgba(255, 82, 82, 0.1)" }}
								>
									<IoCartOutline
										className="text-4xl"
										style={{ color: "#ff5252" }}
									/>
								</div>

								<h3
									className="text-lg font-semibold"
									style={{ color: "#ff5252" }}
								>
									Your cart is empty
								</h3>

								<p className="text-sm text-gray-500">
									Add items to your cart to see them here.
								</p>

								<Link to="/">
									<Button
										className="!mt-3 !px-6 !py-2 !rounded-full !text-white"
										style={{ backgroundColor: "#ff5252" }}
										onClick={toggleDrawer(false)}
									>
										Start Shopping
									</Button>
								</Link>
							</div>
						)}
					</div>
				</Drawer>

				{/* ⭐ ADDRESS DRAWER (500px) */}
				<Drawer
					open={openAddressPanel}
					onClose={toggleAddressDrawer(false)}
					anchor="right"
					PaperProps={{
						sx: { width: "500px", padding: "20px" },
					}}
				>
					<div className="w-full py-3 px-4">
						{/* Drawer Header */}
						<div className="flex items-center justify-between border-b pb-2">
							<h4 className="text-lg font-semibold">Add Address</h4>

							<Button
								className="!w-[30px] !min-w-[30px] !h-[30px] !bg-[#f1f1f1] !rounded-full !text-black right-0 top-0"
								onClick={toggleAddressDrawer(false)}
							>
								<IoMdClose className="!text-[16px]" />
							</Button>
						</div>

						{/* ⭐ Address Form Component */}
						<Address closeDrawer={toggleAddressDrawer(false)} />
					</div>
				</Drawer>
			</MyContext.Provider>
		</>
	);
}

export { App };
