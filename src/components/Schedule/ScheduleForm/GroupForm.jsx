import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";

import GroupsIcon from "@mui/icons-material/Groups";

import axios from "axios";

import { FormattedMessage } from "react-intl";

const GroupForm = (props) => {
	const appTheme = useTheme();
	const [isLoading, setisLoading] = useState(true);

	let navigate = useNavigate();

	// Fetch Group Names
	const [groups, setGroups] = useState([]);
	const [getSchedule, setGetSchedule] = useState();

	const fetchGroupNames = () => {
		return axios
			.get(process.env.REACT_APP_API_URL + "/api/all-group/")
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
		if (event.target.value) {
			setGroupError(false);
		}
		setGroupSelect(event.target.value);
	};

	const [groupError, setGroupError] = useState(false);

	const submitHandler = (e) => {
		e.preventDefault();
		if (!groupSelect) {
			setGroupError(true);
			return;
		}
		const forLocalStorage = {
			groupName: groupSelect,
			district: "",
			gss: "",
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

	let temp_groups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
	let new_groups = groups?.filter((i) => {
		return temp_groups.includes(i);
	});

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
						<FormattedMessage
							id="schedule.form.toggle.group"
							defaultMessage="Search by Group"
						/>{" "}
						<GroupsIcon />
					</h4>
					<p className="text-white-50 fw-light mb-3">
						<FormattedMessage
							id="schedule.form.group.subText"
							defaultMessage="Pick the pre-assigned group letter for your area..."
						/>
					</p>
					<FormControl fullWidth error={groupError}>
						<InputLabel id="group-select">
							<FormattedMessage
								id="schedule.form.group.select"
								defaultMessage="Group Name"
							/>
						</InputLabel>
						<Select
							labelId="group-select-label"
							id="group-select"
							label="Group Name"
							value={groupSelect}
							onChange={handleGroupSelectChange}
							name="group"
						>
							{new_groups?.map((item, index) => {
								return (
									<MenuItem value={item} key={index}>
										{item}
									</MenuItem>
								);
							})}
							{/* <MenuItem value="A">A</MenuItem> */}
						</Select>
						<FormHelperText>
							{groupError ? "Please fill in this field" : ""}
						</FormHelperText>
					</FormControl>
				</div>
				<div className="form-group col-12 mt-4 text-center">
					<button
						type="submit"
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

export default GroupForm;
