import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import axios from "axios";
import { baseURL } from "../../../BaseApi";

const AreaForm = () => {
	const appTheme = useTheme();

	let navigate = useNavigate();
	const [areaList, setAreaList] = useState();
	const [districtList, setDistrictList] = useState();
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
			})
			.catch((errr) => {
				
			});
	}, []);

	useEffect(() => {
		if(districtSelect){
			axios
				.get(baseURL + `/api/all-area/?gcc=${districtSelect}`)
				.then((res) => {
					
					setAreaList(res.data.data);
				})
				.catch((errr) => {
					
				});
		}
	}, [districtSelect]);

	return (
		<form action="" method="post" onSubmit={submitHandler}>
			<div className="form-row my-3">
				<h4
					className="fw-bolder mb-4"
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					Search by Location <LocationOnIcon />
				</h4>
				<p className="text-white-50 fw-light mb-2">
					Don't know your group? Try picking your district and city here...
				</p>
				<div className="form-group col-12">
					<FormControl fullWidth>
						<InputLabel id="district-select">District</InputLabel>
						<Select
							labelId="district-select-label"
							id="district-select"
							label="District"
							value={districtSelect}
							onChange={handleDistrictSelectChange}
							name="district"
							required
						>
							{districtList?.map((item, index) => {
								// 
								return (
									<MenuItem value={item} key={index}>
										{item}
									</MenuItem>
								);
							})}
							{/* <MenuItem value="Colombo">Colombo</MenuItem> */}
						</Select>
					</FormControl>
				</div>
				<div className="form-group col-12 mt-3">
					<FormControl fullWidth>
						<InputLabel id="district-select">Area</InputLabel>
						<Select
							labelId="area-select-label"
							id="area-select"
							label="Area"
							value={areaSelect}
							onChange={handleAreaSelectChange}
							name="area"
							required
						>
							{areaList?.map((item, index) => {
								return (
									<MenuItem value={item} key={index}>
										{item}
									</MenuItem>
								);
							})}
							{/* <MenuItem value="Mount Lavinia">Mount Lavinia</MenuItem> */}
						</Select>
					</FormControl>
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

export default AreaForm;
