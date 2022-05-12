import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import MapIcon from "@mui/icons-material/Map";

import axios from "axios";

import { FormattedMessage } from "react-intl";

const DistrictForm = (props) => {
	const appTheme = useTheme();
	const [isLoading, setisLoading] = useState(true);

	let navigate = useNavigate();
	const [districtList, setDistrictList] = useState();
	const [gssList, setGssList] = useState();
	const [areaList, setAreaList] = useState();

	const [districtSelect, setDistrictSelect] = useState("");
	const handleDistrictSelectChange = (event) => {
		setDistrictSelect(event.target.value);
	};

	const [gssSelect, setGssSelect] = useState("");
	const handleGssSelectChange = (event) => {
		setGssSelect(event.target.value);
	};

	const [areaSelect, setAreaSelect] = useState("");
	const handleAreaSelectChange = (event) => {
		setAreaSelect(event.target.value);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		const forLocalStorage = {
			groupName: "",
			district: districtSelect,
			gss: gssSelect,
			area: areaSelect,
		};
		localStorage.setItem("form-parameters", JSON.stringify(forLocalStorage));
		navigate({
			pathname: "/schedule",
			search: `?group=&district=${districtSelect}&gss=${gssSelect}&area=${areaSelect}`,
		});
	};

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_API_URL + "/api/all-district/")
			.then((res) => {
				setDistrictList(res.data.data);
				if (props.district !== "") {
					setDistrictSelect(props.district);
				}
				setisLoading(false);
			})
			.catch((errr) => {});
	}, []);

	useEffect(() => {
		if (districtSelect) {
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
		}
	}, [districtSelect]);

	let gssNameList = null;
	if (gssList) {
		gssNameList = [
			...new Map(gssList.map((item) => [item["gss"], item])).values(),
		];
	}

	useEffect(() => {
		if (gssSelect) {
			setAreaList(
				gssList.filter((item) => {
					return item.gss === gssSelect;
				})
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
					<TextField
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
						required
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
				</div>
				<div className="form-group col-12 mt-3">
					<TextField
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
						required
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
				</div>
				<div className="form-group col-12 mt-3">
					<TextField
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
						required
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
