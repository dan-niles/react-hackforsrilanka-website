import { useEffect, useState } from "react";
import FormWindow from "./../components/FindMyGroup/FormWindow/FormWindow";
import MapLayer from "../components/FindMyGroup/Map/MapLayer";

import { Grid } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import coordinates from "../data/coordinates.json";

const FindMyGroup = () => {
	const classifyPoint = require("robust-point-in-polygon");

	const [latitude, setLattitude] = useState("");
	const [longitude, setLongitude] = useState("");
	const [groupList, setGroupList] = useState([]);
	const [hideText, setHideText] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	const getLocation = () => {
		setIsLoading(true);
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(function (position) {
				setLattitude(parseFloat(position.coords.latitude));
				setLongitude(parseFloat(position.coords.longitude));
				locateGroup(position.coords.latitude, position.coords.longitude);
				setIsLoading(false);
			}, showError);
		} else {
			setAlertMessage("Geolocation is not supported by this browser.");
			setIsLoading(false);
			setOpenAlert(true);
		}
	};

	function showError(error) {
		switch (error.code) {
			case error.PERMISSION_DENIED:
				setAlertMessage("User denied the request for Geolocation.");
				setIsLoading(false);
				setOpenAlert(true);
				break;
			case error.POSITION_UNAVAILABLE:
				setAlertMessage("Location information is unavailable.");
				setIsLoading(false);
				setOpenAlert(true);
				break;
			case error.TIMEOUT:
				setAlertMessage("The request to get user location timed out.");
				setIsLoading(false);
				setOpenAlert(true);
				break;
			case error.UNKNOWN_ERROR:
				setAlertMessage("An unknown error occurred.");
				setIsLoading(false);
				setOpenAlert(true);
				break;
		}
	}

	const locateGroup = (lat, lon) => {
		setHideText(true);
		setGroupList([]);
		coordinates.forEach((group) => {
			let group_name = group.group_name;
			group.zones.forEach((zone) => {
				let result = classifyPoint(zone, [lat, lon]);
				if (result == -1) {
					setGroupList((prev) => [...prev, group_name]);
					return;
				}
			});
		});
		setHideText(false);
	};

	const [openAlert, setOpenAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenAlert(false);
	};

	return (
		<>
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				open={openAlert}
				onClose={handleClose}
				autoHideDuration={6000}
				sx={{ zIndex: 9999 }}
			>
				<Alert
					elevation={6}
					onClose={handleClose}
					severity="error"
					sx={{ width: "100%" }}
				>
					{alertMessage}
				</Alert>
			</Snackbar>
			<Grid
				container
				spacing={0}
				sx={{ alignItems: "center", justifyContent: "center" }}
			>
				<FormWindow
					getLocation={getLocation}
					latitude={latitude}
					longitude={longitude}
					isLoading={isLoading}
					groupList={groupList}
					hideText={hideText}
				/>
				<Grid item xs={12} md={12}>
					<MapLayer
						latitude={latitude}
						longitude={longitude}
						locateGroup={locateGroup}
						setLattitude={setLattitude}
						setLongitude={setLongitude}
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default FindMyGroup;
