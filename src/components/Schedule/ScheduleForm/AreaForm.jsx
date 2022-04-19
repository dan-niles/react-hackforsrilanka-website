import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

const AreaForm = () => {
	let navigate = useNavigate();

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
			search: "?group=A",
		});
	};

	return (
		<form action="" method="post" onSubmit={submitHandler}>
			<div className="form-row">
				<h3 className="fw-bolder mb-4">Search by Location</h3>
				<div className="form-group col-12">
					<FormControl fullWidth>
						<InputLabel id="district-select">Select your district</InputLabel>
						<Select
							labelId="district-select-label"
							id="district-select"
							label="Select District"
							value={districtSelect}
							onChange={handleDistrictSelectChange}
							name="district"
							required
						>
							<MenuItem value="Colombo">Colombo</MenuItem>
						</Select>
					</FormControl>
				</div>
				<div className="form-group col-12 mt-3">
					<FormControl fullWidth>
						<InputLabel id="district-select">Select your area</InputLabel>
						<Select
							labelId="area-select-label"
							id="area-select"
							label="Select your area"
							value={areaSelect}
							onChange={handleAreaSelectChange}
							name="area"
							required
						>
							<MenuItem value="Mount Lavinia">Mount Lavinia</MenuItem>
						</Select>
					</FormControl>
				</div>
				<div className="form-group col-12 mt-4 text-center">
					<button className="btn btn-warning px-4" href="#features">
						Search
					</button>
				</div>
			</div>
		</form>
	);
};

export default AreaForm;
