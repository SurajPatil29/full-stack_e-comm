import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./componants/header";
import { Home } from "./pages/Home";
import Footer from "./componants/Footer";
import ProductListing from "./pages/ProductListing";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path={"/"} exact={true} element={<Home />} />
				<Route
					path={"/productListing"}
					exact={true}
					element={<ProductListing />}
				/>
			</Routes>
			<Footer />
		</>
	);
}

export default App;
