import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";

import GroupsIcon from "@mui/icons-material/Groups";

import { baseURL } from "../../../BaseApi";
import axios from "axios";

const GroupForm = (props) => {
	const appTheme = useTheme();
	const [isLoading, setisLoading] = useState(true);

	let navigate = useNavigate();

	// Fetch Group Names
	const [groups, setGroups] = useState([]);
	const [getSchedule, setGetSchedule] = useState();

	const fetchGroupNames = () => {
		return axios
			.get(baseURL + "/api/all-group/")
			.then((res) => {
				setGroups(res.data.data.sort());
				if (props.groupName !== "") {
					setGroupSelect(props.groupName);
				}
				setisLoading(false);
			})
			.catch((errr) => {});
	};

	useEffect(() => {
		fetchGroupNames();
	}, []);

	const [groupSelect, setGroupSelect] = useState("");
	const handleGroupSelectChange = (event) => {
		setGroupSelect(event.target.value);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		const forLocalStorage = {
			groupName: groupSelect,
			suburb: "",
			district: "",
			area: "",
		};
		localStorage.setItem("form-parameters", JSON.stringify(forLocalStorage));
		navigate(
			{
				pathname: "/schedule",
				search: "?group=" + groupSelect,
			},
			{ state: { data: getSchedule } }
		);
	};

	return (
		<form action="" method="get" onSubmit={submitHandler}>
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
				<div className="form-group col-12">
					<h4
						className="fw-bolder mb-4"
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						Search by Group <GroupsIcon />
					</h4>
					<p className="text-white-50 fw-light mb-3">
						Pick the pre-assigned group letter for your area...
					</p>
					<FormControl fullWidth>
						<InputLabel id="group-select">Group Name</InputLabel>
						<Select
							labelId="group-select-label"
							id="group-select"
							label="Group Name"
							value={groupSelect}
							onChange={handleGroupSelectChange}
							name="group"
							required
						>
							{groups?.map((item, index) => {
								return (
									<MenuItem value={item} key={index}>
										{item}
									</MenuItem>
								);
							})}
							{/* <MenuItem value="A">A</MenuItem> */}
						</Select>
					</FormControl>
				</div>
				<div className="form-group col-12 mt-4 text-center">
					<button
						type="submit"
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

export default GroupForm;
