import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./componants/header";
import { Home } from "./pages/Home";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={"/"} exact={true} element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
