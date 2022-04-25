import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AnimatedPage from "../components/AnimatedPage/AnimatedPage";
import HelpSlider from "../components/HelpSlider/HelpSlider";
import { motion } from "framer-motion";

import Button from "@mui/material/Button";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

const Home = () => {
	const [imageLoading, setImageLoading] = useState(true); // for animating light bulb img
	const [openGuide, setOpenGuide] = useState(false); // for help guide modal
	const navigate = useNavigate();

	const imageLoaded = () => {
		setImageLoading(false);
	};

	// handling the help guide modal
	const handleOpenGuide = () => {
		setOpenGuide(true);
	};

	const handleCloseGuide = () => {
		setOpenGuide(false);
	};

	// pre-selects group if user has previously selected a group
	// const handleCTA = () => {
	// 	let savedGroup = localStorage.getItem("pc-group")
	// 		? localStorage.getItem("pc-group")
	// 		: "";
	// 	if (savedGroup !== "") {
	// 		navigate({
	// 			pathname: "/schedule",
	// 			search: "?group=" + savedGroup,
	// 		});
	// 	} else {
	// 		navigate({
	// 			pathname: "/schedule",
	// 		});
	// 	}
	// };

	const handleCTA = () => {
		navigate({
			pathname: "/schedule",
		});
	};

	return (
		<AnimatedPage>
			<HelpSlider openGuide={openGuide} closeGuide={handleCloseGuide} />
			<header
				className="header-center"
				style={{
					background: `url("${require("../assets/img/bulbBg.png")}")`,
				}}
			>
				<div className="container px-5">
					<div className="row gx-5 align-items-center justify-content-center">
						<div className="col-lg-8 col-xl-7 col-xxl-6">
							<div className="mt-4 mb-3 my-md-5 text-center text-xl-start">
								<h1 className="display-5 fw-bolder text-white mb-2">
									Find Your Power Cut Schedule!
								</h1>
								<p className="lead fw-normal text-white-50 mb-4 lh-sm">
									Keep track of power-cuts and subscribe to receive
									notifications.
								</p>
								<div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
									<Button
										className="btn-warning text-capitalize text-lowercase fw-bold fs-5"
										variant="contained"
										size="large"
										onClick={handleCTA}
									>
										Get Started
									</Button>
									<Button
										className="text-capitalize text-lowercase fw-bold fs-6"
										color="secondary"
										variant="outlined"
										startIcon={<HelpOutlineOutlinedIcon />}
										onClick={handleOpenGuide}
									>
										Get Help
									</Button>
								</div>
							</div>
						</div>
						<div className="col-xl-5 col-xxl-6 d-none1 d-xl-block text-center">
							<motion.img
								initial={{ opacity: 0 }}
								animate={{
									opacity: imageLoading ? 0 : 1,
								}}
								transition={{ opacity: { duration: 0.4 } }}
								onLoad={imageLoaded}
								width="90%"
								src={require("../assets/img/lightbulb.jpeg")}
							/>
						</div>
					</div>
				</div>
			</header>
		</AnimatedPage>
	);
};

export default Home;
