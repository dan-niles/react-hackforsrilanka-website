import { useEffect, useState } from "react";

import * as L from "leaflet";
import { GestureHandling } from "leaflet-gesture-handling";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const MapLayer = (props) => {
	const appTheme = useTheme();
	const matches = useMediaQuery(appTheme.breakpoints.up("md"));

	const defaultPosition = [7.955877163205325, 79.37072753906251];
	const defaultZoom = 8;
	const mobileDefaultPosition = [7.835406, 80.702906];
	const mobileDefaultZoom = 6.5;

	const [map, setMap] = useState(null);
	const [position, setPosition] = useState(defaultPosition);

	useEffect(() => {
		setPosition([props.latitude, props.longitude]);
		map?.flyTo([props.latitude, props.longitude]);
	}, [props.latitude, props.longitude]);

	map?.on("click", function (e) {
		const coord = e.latlng;
		const lat = coord.lat;
		const lng = coord.lng;
		setPosition([lat, lng]);
		props.locateGroup(lat, lng);
		props.setLattitude(lat);
		props.setLongitude(lng);
	});

	map?.gestureHandling.enable();

	return (
		<div
			className="px-3 px-lg-0 mb-3 mb-lg-0"
			style={{ width: "100%", height: matches ? "100vh" : "500px" }}
		>
			<MapContainer
				ref={setMap}
				center={matches ? defaultPosition : mobileDefaultPosition}
				zoom={matches ? defaultZoom : mobileDefaultZoom}
				scrollWheelZoom={true}
				style={{
					height: "100%",
					width: "100%",
					borderRadius: matches ? "" : "1.5em",
				}}
			>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={position}></Marker>
			</MapContainer>
		</div>
	);
};

export default MapLayer;
