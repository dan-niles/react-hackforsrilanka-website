import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const GroupForm = (props) => {
	let navigate = useNavigate();

	// Fetch Group Names
	const [groups, setGroups] = useState([]);

	const fetchGroupNames = () => {
		fetch("https://hackforsrilanka-api.herokuapp.com/api/illuminati/groups")
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setGroups(data);
			});
	};

	useEffect(() => {
		fetchGroupNames();
	}, []);

	const [groupSelect, setGroupSelect] = useState(props.groupName);
	const handleGroupSelectChange = (event) => {
		setGroupSelect(event.target.value);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		localStorage.setItem("pc-group", groupSelect);
		navigate({
			pathname: "/schedule",
			search: "?group=" + groupSelect,
		});
	};

	return (
		<form action="" method="get" onSubmit={submitHandler}>
			<div className="form-row">
				<div className="form-group col-12">
					<h3 className="fw-bolder mb-4">Search by Group</h3>
					<FormControl fullWidth>
						<InputLabel id="group-select">Select your group</InputLabel>
						<Select
							labelId="group-select-label"
							id="group-select"
							label="Select your group"
							value={groupSelect}
							onChange={handleGroupSelectChange}
							name="group"
							required
						>
							{groups
								.filter((i) => i.length === 1)
								.map((group, index) => (
									<MenuItem value={group} key={index}>
										{group}
									</MenuItem>
								))}
						</Select>
					</FormControl>
				</div>
				<div className="form-group col-12 mt-4 text-center">
					{/* <Button color="warning" variant="contained">
        Search
    </Button> */}
					<button type="submit" className="btn btn-warning px-4 fw-bold">
						Search
					</button>
				</div>
			</div>
		</form>
	);
};

export default GroupForm;
