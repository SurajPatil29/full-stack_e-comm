import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import "../navigation/style.css";
import CategoryCollapse from "../../CategoryCollapse";

function CatagoryPanel({ toggleDrawer, open, data }) {
	// above both funcuction use to chane the state

	const DrawerList = (
		<Box sx={{ width: 300 }} role="presentation" className="catagoryPanel">
			{/* this box represent the drawer */}
			<div className="flex items-center justify-between p-3 gap-1">
				{/* this contain title and close button */}
				<h3 className="text-[16px] font-[500] ">Shop By Categories </h3>
				<Button
					onClick={toggleDrawer(false)}
					className="!text-[rgba(0,0,0,0.7)] cursor-pointer transition"
				>
					<IoMdClose className="text-[rgba(0,0,0,0.7)] " />
				</Button>
			</div>
			<Divider />
			{data?.length !== 0 && <CategoryCollapse data={data} />}
		</Box>
	);
	return (
		<div>
			<Drawer open={open} onClose={toggleDrawer(false)}>
				{DrawerList}
			</Drawer>
		</div>
	);
}

CatagoryPanel.propTypes = {
	toggleDrawer: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	// catData: PropTypes.array.isRequired,
};

export { CatagoryPanel };
