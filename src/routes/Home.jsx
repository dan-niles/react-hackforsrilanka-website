import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import AnimatedPage from "../components/AnimatedPage/AnimatedPage";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";

import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";

// import HelpSlider from "../components/HelpSlider/HelpSlider";
// import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

const Home = () => {
	const appTheme = useTheme();
	const intl = useIntl();
	const [imageLoading, setImageLoading] = useState(true); // for animating light bulb img
	// const [openGuide, setOpenGuide] = useState(false); // for help guide modal
	const location = useLocation();
	const navigate = useNavigate();

	const imageLoaded = () => {
		setImageLoading(false);
	};

	// handling the help guide modal
	// const handleOpenGuide = () => {
	// 	setOpenGuide(true);
	// };

	// const handleCloseGuide = () => {
	// 	setOpenGuide(false);
	// };

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
			pathname: "../schedule",
		});
	};

	return (
		<AnimatedPage>
			{/* <HelpSlider openGuide={openGuide} closeGuide={handleCloseGuide} /> */}
			<header
				className="header-center"
				style={{
					background: `url("${
						appTheme.palette.mode === "dark"
							? require("../assets/img/bulbBg.png")
							: require("../assets/img/bulbBg-light.png")
					}")`,
				}}
			>
				<div className="container px-5">
					<div className="row gx-5 align-items-center justify-content-center">
						<div className="col-lg-8 col-xl-7 col-xxl-6">
							<div className="mt-4 mb-3 my-md-5 text-center text-xl-start">
								<h1
									className={`${
										intl.locale === "ta-LK" ? "display-6" : "display-5"
									} fw-bolder mb-2`}
								>
									<FormattedMessage
										id="home.header"
										defaultMessage="Find Your Power Cut Schedule!"
									/>
								</h1>
								<p className="lead fw-normal text-white-50 mb-4 lh-sm">
									<FormattedMessage
										id="home.headerSubText"
										defaultMessage="Keep track of power-cuts and subscribe to receive free text notifications"
									/>
								</p>
								<div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
									<Button
										className={`${
											appTheme.palette.mode === "dark" ? "btn-warning" : ""
										} text-capitalize text-lowercase fw-bold fs-5`}
										variant="contained"
										size="large"
										onClick={handleCTA}
										color={
											appTheme.palette.mode === "dark" ? "warning" : "error"
										}
									>
										<FormattedMessage
											id="home.mainButton"
											defaultMessage="Get Started"
										/>
									</Button>
									{/* <Button
										className="text-capitalize text-lowercase fw-bold fs-6"
										color="info"
										variant="outlined"
										startIcon={<HelpOutlineOutlinedIcon />}
										onClick={handleOpenGuide}
									>
										Get Help
									</Button> */}
								</div>
							</div>
						</div>
						<div className="col-xl-5 col-xxl-6 d-xl-block text-center mt-3 mt-lg-0">
							<motion.img
								initial={{ opacity: 0 }}
								animate={{
									opacity: imageLoading ? 0 : 1,
								}}
								transition={{ opacity: { duration: 0.4 } }}
								onLoad={imageLoaded}
								width="90%"
								src={
									appTheme.palette.mode === "dark"
										? require("../assets/img/lightbulb.png")
										: require("../assets/img/lightbulb-light.png")
								}
							/>
						</div>
					</div>
				</div>
			</header>
		</AnimatedPage>
	);
};

export default Home;
