import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import ApartmentIcon from "@mui/icons-material/Apartment";

import axios from "axios";
import { baseURL } from "../../../BaseApi";

const SuburbForm = () => {
	const appTheme = useTheme();
	const [isLoading, setisLoading] = useState(false);

	let navigate = useNavigate();
	const [areaList, setAreaList] = useState();
	const [districtList, setDistrictList] = useState();

	const [suburbSelect, setSuburbSelect] = useState("");
	const handleSuburbSelectChange = (event) => {
		setSuburbSelect(event.target.value);
	};

	const [districtSelect, setDistrictSelect] = useState("");
	const handleDistrictSelectChange = (event) => {
		setDistrictSelect(event.target.value);
	};

	const [areaSelect, setAreaSelect] = useState("");
	const handleAreaSelectChange = (event) => {
		setAreaSelect(event.target.value);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		navigate({
			pathname: "/schedule",
			search: `?group=&district=${districtSelect}&area=${areaSelect}`,
		});
	};

	useEffect(() => {
		axios
			.get(baseURL + "/api/all-gcc/?gcc=")
			.then((res) => {
				setDistrictList(res.data.data);
				setisLoading(false);
			})
			.catch((errr) => {});
	}, []);

	useEffect(() => {
		if (districtSelect) {
			axios
				.get(baseURL + `/api/all-area/?gcc=${districtSelect}`)
				.then((res) => {
					setAreaList(res.data.data);
				})
				.catch((errr) => {});
		}
	}, [districtSelect]);

	return (
		<form action="" method="post" onSubmit={submitHandler}>
			{isLoading && (
				<div className="row d-flex align-items-center justify-content-center">
					<div className="spinner-border text-center" role="status">
						<span className="visually-hidden">Loading...</span>
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
					Search by Suburb <ApartmentIcon />
				</h4>
				<p
					className="text-white-50 fw-light mb-2"
					style={{ fontSize: "0.9em" }}
				>
					Do you live in any of the following suburbs?
					<br /> Batticaloa, Colombo, Dehiwala-Mount Lavinia, Jaffna, Negombo,
					Kotte or Moratuwa. If so, search for schedule below...
				</p>
				<div className="form-group col-12">
					<TextField
						size="small"
						label="Suburb"
						select
						value={suburbSelect}
						onChange={handleSuburbSelectChange}
						required
						fullWidth
					>
						<MenuItem value="Colombo">Colombo</MenuItem>
					</TextField>
				</div>
				<div className="form-group col-12 mt-2">
					<TextField
						select
						size="small"
						label="GSS"
						value={districtSelect}
						onChange={handleDistrictSelectChange}
						name="district"
						required
						fullWidth
					>
						{districtList?.map((item, index) => {
							return (
								<MenuItem value={item} key={index}>
									{item}
								</MenuItem>
							);
						})}
					</TextField>
				</div>
				<div className="form-group col-12 mt-2">
					<TextField
						select
						size="small"
						label="Area"
						value={areaSelect}
						onChange={handleAreaSelectChange}
						name="area"
						required
						fullWidth
					>
						{areaList?.map((item, index) => {
							return (
								<MenuItem value={item} key={index}>
									{item}
								</MenuItem>
							);
						})}
					</TextField>
				</div>
				<div className="form-group col-12 mt-4 text-center">
					<button
						className={`btn ${
							appTheme.palette.mode === "dark" ? "btn-warning" : "btn-danger"
						} px-4 fw-bold`}
					>
						Search
					</button>
				</div>
			</div>
		</form>
	);
};

export default SuburbForm;
