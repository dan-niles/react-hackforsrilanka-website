import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useIntl } from "react-intl";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import GroupsIcon from "@mui/icons-material/Groups";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MyLocationIcon from "@mui/icons-material/MyLocation";
import PageRoutes from "./../../routes/PageRoutes"
import LangRoutes from "./../../lang/LangRoutes"
import DefaultedMessage from "../UI/DefaultedMessage";

// import { useNavigate, Link } from "react-router-dom";
// import HelpSlider from "../components/HelpSlider/HelpSlider";
// import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

const HomePrimaryPanel = () => {
	const appTheme = useTheme();
	const intl = useIntl();
	const [imageLoading, setImageLoading] = useState(true); // for animating light bulb img
	// const [openGuide, setOpenGuide] = useState(false); // for help guide modal
	//const navigate = useNavigate();

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

	return (
		<header className="header-center">
			{/* <HelpSlider openGuide={openGuide} closeGuide={handleCloseGuide} /> */}
			<div className="container px-5">
				<div className="row gx-5 align-items-center justify-content-center">
					<div className="col-lg-8 col-xl-7 col-xxl-6">
						<div className="mt-4 mb-3 my-md-5 text-center text-xl-start">
							<h1
								className={`${
									intl.locale === "ta-LK" ? "display-6" : "display-5"
								} fw-bolder mb-2`}
							>
								<DefaultedMessage id="home.primary.header"/>
							</h1>
							<p className="lead fw-normal text-white-50 mb-4 lh-sm">
								<DefaultedMessage id="home.primary.headerSubText"/>
							</p>
							<div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
								<Button
									component={Link} 
									to={`../${PageRoutes.slug(PageRoutes.SCHEDULE)}`}
									alt={LangRoutes.getDefaultedMessage("home.primary.bygroup.alt")}
									className={`${
										appTheme.palette.mode === "dark" ? "btn-warning" : ""
									} text-capitalize text-lowercase fw-bold fs-5`}
									variant="contained"
									startIcon={<GroupsIcon />}
									size="large"
									color={
										appTheme.palette.mode === "dark" ? "warning" : "error"
									}
								>
									<DefaultedMessage id={"home.primary.bygroup.title"}/>
								</Button>
								<Button
									component={Link} 
									to={`../${PageRoutes.slug(PageRoutes.SCHEDULE)}`}
									alt={LangRoutes.getDefaultedMessage("home.primary.byarea.alt")}
									className={`${
										appTheme.palette.mode === "dark" ? "btn-warning" : ""
									} text-capitalize text-lowercase fw-bold fs-5`}
									variant="contained"
									startIcon={<LocationCityIcon />}
									size="large"
									color={
										appTheme.palette.mode === "dark" ? "warning" : "error"
									}
								>
									<DefaultedMessage id={"home.primary.byarea.title"}/>
								</Button>
								<Button
									component={Link} 
									to={`../${PageRoutes.slug(PageRoutes.FIND_MY_GROUP)}`}
									alt={LangRoutes.getDefaultedMessage("home.primary.bylocation.alt")}
									className={`${
										appTheme.palette.mode === "dark" ? "btn-warning" : ""
									} text-capitalize text-lowercase fw-bold fs-5`}
									variant="contained"
									startIcon={<MyLocationIcon />}
									size="large"
									color={
										appTheme.palette.mode === "dark" ? "warning" : "error"
									}
								>
									<DefaultedMessage id={"home.primary.bylocation.title"}/>
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
					<div className="col-lg-8 col-xl-7 col-xxl-6 text-center">
						<motion.img
							initial={{ opacity: 0 }}
							animate={{
								opacity: imageLoading ? 0 : 1,
							}}
							transition={{ opacity: { duration: 2 } }}
							onLoad={imageLoaded}
							width="75%"
							src={
								appTheme.palette.mode === "dark"
									? require("../../assets/img/lightbulb.png")
									: require("../../assets/img/lightbulb-light.png")
							}
							className='outlinedShadow'
						/>
					</div>
				</div>
			</div>
		</header>
	);
};

export default HomePrimaryPanel;
