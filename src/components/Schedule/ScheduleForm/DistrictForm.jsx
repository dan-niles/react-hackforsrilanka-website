import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import MapIcon from "@mui/icons-material/Map";

import axios from "axios";

import { FormattedMessage } from "react-intl";

// import Alert from "@mui/material/Alert";
// import AlertTitle from "@mui/material/AlertTitle";

// import allDistricts from "../../../data/all-district.json";
// import districtAreas from "../../../data/district-areas.json";
// import GSSgroups from "../../../data/gss-groups.json";

const DistrictForm = (props) => {
	const appTheme = useTheme();
	const [isLoading, setisLoading] = useState(true);

	const location = useLocation();
	const navigate = useNavigate();
	const [districtList, setDistrictList] = useState();
	const [gssList, setGssList] = useState();
	const [areaList, setAreaList] = useState();

	const [districtError, setDistrictError] = useState(false);
	const [districtSelect, setDistrictSelect] = useState("");
	const handleDistrictSelectChange = (event) => {
		if (event.target.value) {
			setDistrictError(false);
		}
		setDistrictSelect(event.target.value);
	};

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
		if (!districtSelect) {
			setDistrictError(true);
			return;
		}
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
			district: districtSelect,
			gss: gssSelect,
			area: areaSelect,
		};
		localStorage.setItem("form-parameters", JSON.stringify(forLocalStorage));

		// let obj = GSSgroups[gssSelect].find((i) => i.value === areaSelect);
		// let group_temp = obj.Group;

		// navigate({
		// 	pathname: "/schedule",
		// 	search: `?group=${group_temp}`,
		// });

		navigate({
			pathname: location.pathname,
			search: `?group=&district=${districtSelect}&gss=${gssSelect}&area=${areaSelect}`,
		});
	};

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_API_URL + "/api/all-district/")
			.then((res) => {
				let districtData = res.data.data;
				districtData.splice(districtData.indexOf("Batticoloa"), 1);
				setDistrictList(districtData);
				if (props.district !== "") {
					setDistrictSelect(props.district);
				}
				setisLoading(false);
			})
			.catch((errr) => {});

		// setDistrictList(allDistricts.data);
		// if (props.district !== "") {
		// 	setDistrictSelect(props.district);
		// }
		// setisLoading(false);
	}, []);

	useEffect(() => {
		if (districtSelect) {
			setAreaList([]);
			setGssSelect("");
			setAreaSelect("");
			axios
				.get(
					process.env.REACT_APP_API_URL +
						`/api/search-by-district/?district=${districtSelect}`
				)
				.then((res) => {
					setGssList(res.data.data);
					if (props.gss !== "") {
						setGssSelect(props.gss);
					}
				})
				.catch((errr) => {});

			// setGssList(
			// 	districtAreas.data.filter((i) => i.district === districtSelect)
			// );
			// if (props.gss !== "") {
			// 	setGssSelect(props.gss);
			// }
		}
	}, [districtSelect]);

	let gssNameList = null;
	if (gssList) {
		gssNameList = [
			...new Map(gssList.map((item) => [item["gss"], item])).values(),
		].sort((a, b) => (a.gss > b.gss ? 1 : b.gss > a.gss ? -1 : 0));
		console.log("----gssNameList", gssNameList);
	}

	useEffect(() => {
		if (gssSelect) {
			setAreaSelect("");
			setAreaList(
				gssList
					.filter((item) => {
						return item.gss === gssSelect;
					})
					.sort((a, b) => (a.area > b.area ? 1 : b.area > a.area ? -1 : 0))
			);
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
						id="schedule.form.toggle.district"
						defaultMessage="Search by District"
					/>{" "}
					<MapIcon />
				</h4>
				{/* <Alert severity="error" className="mb-3">
					<AlertTitle>Please use these filters with some caution</AlertTitle>
					We scraped and cleaned the PDF tables found on the CEB website
					[https://ceb.lk/] to make it easy for users to find their group.
					Unfortunately, the CEB data is sometimes unreliable. We are committed
					to delivering you the most accurate information & apologize for the
					inconvenience.
				</Alert> */}
				<p
					className="text-white-50 fw-light mb-3"
					style={{ fontSize: "0.9em" }}
				>
					<FormattedMessage
						id="schedule.form.district.subText"
						defaultMessage="Do you live in Anuradhapura, Batticaloa,  Colombo, Galle, Gampaha, Jaffna or Kandy? If so, search for schedule below..."
					/>
				</p>
				<div className="form-group col-12">
					<FormControl fullWidth error={districtError}>
						<TextField
							error={districtError}
							size="small"
							label={
								<FormattedMessage
									id="schedule.form.district.select1"
									defaultMessage="District"
								/>
							}
							select
							value={districtSelect}
							onChange={handleDistrictSelectChange}
							name="district"
							fullWidth
							sx={{ textTransform: "capitalize" }}
						>
							{districtList?.map((item, index) => {
								return (
									<MenuItem
										key={index}
										value={item}
										sx={{ textTransform: "capitalize" }}
									>
										{item}
									</MenuItem>
								);
							})}
							{/* <MenuItem value="Colombo">Jaffna</MenuItem> */}
						</TextField>
						<FormHelperText>
							{districtError ? (
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
					<FormControl fullWidth error={gssError}>
						<TextField
							error={gssError}
							select
							size="small"
							label={
								<FormattedMessage
									id="schedule.form.district.select2"
									defaultMessage="Grid Substation"
								/>
							}
							value={gssSelect}
							onChange={handleGssSelectChange}
							name="gss"
							fullWidth
							sx={{ textTransform: "capitalize" }}
						>
							{gssNameList?.map((item, index) => {
								return (
									<MenuItem
										value={item.gss}
										key={index}
										sx={{ textTransform: "capitalize" }}
									>
										{item.gss}
									</MenuItem>
								);
							})}
							{/* <MenuItem value="Colombo">Chunnakam</MenuItem> */}
						</TextField>
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
						<TextField
							error={areaError}
							select
							size="small"
							label={
								<FormattedMessage
									id="schedule.form.district.select3"
									defaultMessage="Area"
								/>
							}
							value={areaSelect}
							onChange={handleAreaSelectChange}
							name="area"
							fullWidth
							sx={{ textTransform: "capitalize" }}
						>
							{areaList?.map((item, index) => {
								return (
									<MenuItem
										value={item.area}
										key={index}
										sx={{ textTransform: "capitalize" }}
									>
										{item.area}
									</MenuItem>
								);
							})}
							{/* <MenuItem value="Colombo">Manipay</MenuItem> */}
						</TextField>
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

export default DistrictForm;
