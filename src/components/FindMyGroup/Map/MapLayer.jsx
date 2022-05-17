import { map } from "leaflet";
import { useEffect, useState, useRef } from "react";
import {
	MapContainer,
	TileLayer,
	useMap,
	useMapEvents,
	Marker,
	Popup,
} from "react-leaflet";
import Button from "@mui/material/Button";

const MapLayer = (props) => {
	// const defaultPosition = [7.835406, 80.702906];
	const defaultPosition = [7.955877163205325, 79.37072753906251];
	// const defaultZoom = 7.5;
	const defaultZoom = 8;

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

	return (
		<div style={{ width: "100%", height: "100vh" }}>
			<MapContainer
				ref={setMap}
				center={defaultPosition}
				zoom={defaultZoom}
				scrollWheelZoom={true}
				style={{ height: "100%", width: "100%" }}
			>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{/* <MapComponent /> */}
				<Marker position={position}>
					{/* <Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup> */}
				</Marker>
			</MapContainer>
		</div>
	);
};

export default MapLayer;
