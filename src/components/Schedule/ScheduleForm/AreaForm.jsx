import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import axios from "axios";

import { FormattedMessage } from "react-intl";

// import Alert from "@mui/material/Alert";
// import AlertTitle from "@mui/material/AlertTitle";

import allGSS from "../../../data/all-gss.json";
import GSSAreas from "../../../data/gss-areas.json";
import GSSgroups from "../../../data/gss-groups.json";

const AreaForm = (props) => {
	const appTheme = useTheme();
	const [isLoading, setisLoading] = useState(true);

	let navigate = useNavigate();
	const [areaList, setAreaList] = useState();
	const [gssList, setGssList] = useState();

	const [gssError, setGSSError] = useState(false);
	const [gssSelect, setGssSelect] = useState("");
	const handleGssSelectChange = (event) => {
		if (event.target.value) {
			setGSSError(false);
		}
		setGssSelect(event.target.value);
	};

	const [areaError, setAreaError] = useState(false);
	const [areaSelect, setAreaSelect] = useState("");
	const handleAreaSelectChange = (event) => {
		if (event.target.value) {
			setAreaError(false);
		}
		setAreaSelect(event.target.value);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (!gssSelect) {
			setGSSError(true);
			return;
		}
		if (!areaSelect) {
			setAreaError(true);
			return;
		}
		const forLocalStorage = {
			groupName: "",
			district: "",
			gss: gssSelect,
			area: areaSelect,
		};
		localStorage.setItem("form-parameters", JSON.stringify(forLocalStorage));

		let obj = GSSgroups[gssSelect].find((i) => i.value === areaSelect);
		let group_temp = obj.Group;

		navigate({
			pathname: "/schedule",
			search: `?group=${group_temp}`,
		});

		// navigate({
		// 	pathname: "/schedule",
		// 	search: `?group=&gss=${gssSelect}&area=${areaSelect}`,
		// });
	};

	useEffect(() => {
		// axios
		// 	.get(process.env.REACT_APP_API_URL + "/api/all-gss/")
		// 	.then((res) => {
		// 		setGssList(res.data.data);
		// 		if (props.gss !== "") {
		// 			setGssSelect(props.gss);
		// 		}
		// 		setisLoading(false);
		// 	})
		// 	.catch((errr) => {});

		setGssList(allGSS.data);
		if (props.gss !== "") {
			setGssSelect(props.gss);
		}
		setisLoading(false);
	}, []);

	useEffect(() => {
		if (gssSelect) {
			setAreaSelect("");
			// axios
			// 	.get(process.env.REACT_APP_API_URL + `/api/all-area/?gss=${gssSelect}`)
			// 	.then((res) => {
			// 		setAreaList(res.data.data);
			// 		if (props.area !== "") {
			// 			setAreaSelect(props.area);
			// 		}
			// 	})
			// 	.catch((errr) => {});

			setAreaList(GSSAreas[gssSelect].sort());
			if (props.area !== "") {
				setAreaSelect(props.area);
			}
		}
	}, [gssSelect]);

	return (
		<form action="" method="post" onSubmit={submitHandler}>
			{isLoading && (
				<div className="row d-flex align-items-center justify-content-center">
					<div className="spinner-border text-center" role="status">
						<span className="visually-hidden" style={{ color: "transparent" }}>
							Loading...
						</span>
					</div>
				</div>
			)}
			<div className={`${isLoading ? "d-none" : ""} form-row my-3`}>
				<h4
					className="fw-bolder mb-4"
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<FormattedMessage
						id="schedule.form.toggle.location"
						defaultMessage="Search by Location"
					/>{" "}
					<LocationOnIcon />
				</h4>
				{/* <Alert severity="error" className="mb-3">
					<AlertTitle>Please use these filters with some caution</AlertTitle>
					We scraped and cleaned the PDF tables found on the CEB website
					[https://ceb.lk/] to make it easy for users to find their group.
					Unfortunately, the CEB data is sometimes unreliable. We are committed
					to delivering you the most accurate information & apologize for the
					inconvenience.
				</Alert> */}
				<p className="text-white-50 fw-light mb-3">
					<FormattedMessage
						id="schedule.form.location.subText"
						defaultMessage="Don't know your group? Try picking your gss and city here..."
					/>
				</p>

				<div className="form-group col-12">
					<FormControl fullWidth error={gssError}>
						<InputLabel id="gss-select">
							<FormattedMessage
								id="schedule.form.location.select1"
								defaultMessage="Grid Substation"
							/>
						</InputLabel>
						<Select
							labelId="gss-select-label"
							id="gss-select"
							label="Grid Substation"
							value={gssSelect}
							onChange={handleGssSelectChange}
							name="gss"
							sx={{ textTransform: "capitalize" }}
						>
							{gssList?.map((item, index) => {
								return (
									<MenuItem
										value={item}
										key={index}
										sx={{ textTransform: "capitalize" }}
									>
										{item}
									</MenuItem>
								);
							})}
							{/* <MenuItem value="Colombo">Colombo</MenuItem> */}
						</Select>
						<FormHelperText>
							{gssError ? (
								<FormattedMessage
									id="schedule.form.select-validation"
									defaultMessage="Please fill in this field"
								/>
							) : (
								""
							)}
						</FormHelperText>
					</FormControl>
				</div>
				<div className="form-group col-12 mt-3">
					<FormControl fullWidth error={areaError}>
						<InputLabel id="area-select">
							<FormattedMessage
								id="schedule.form.location.select2"
								defaultMessage="Area"
							/>
						</InputLabel>
						<Select
							labelId="area-select-label"
							id="area-select"
							label="Area"
							value={areaSelect}
							onChange={handleAreaSelectChange}
							name="area"
							sx={{ textTransform: "capitalize" }}
						>
							{areaList?.map((item, index) => {
								return (
									<MenuItem
										value={item}
										key={index}
										sx={{ textTransform: "capitalize" }}
									>
										{item}
									</MenuItem>
								);
							})}
							{/* <MenuItem value="Mount Lavinia">Mount Lavinia</MenuItem> */}
						</Select>
						<FormHelperText>
							{areaError ? (
								<FormattedMessage
									id="schedule.form.select-validation"
									defaultMessage="Please fill in this field"
								/>
							) : (
								""
							)}
						</FormHelperText>
					</FormControl>
				</div>
				<div className="form-group col-12 mt-4 text-center">
					<button
						className={`btn ${
							appTheme.palette.mode === "dark" ? "btn-warning" : "btn-danger"
						} px-4 fw-bold`}
					>
						<FormattedMessage
							id="schedule.form.search"
							defaultMessage="Search"
						/>
					</button>
				</div>
			</div>
		</form>
	);
};

export default AreaForm;
