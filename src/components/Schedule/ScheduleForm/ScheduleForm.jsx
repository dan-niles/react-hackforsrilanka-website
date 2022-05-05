import { useState } from "react";

import GroupForm from "./GroupForm";
import AreaForm from "./AreaForm";
import SuburbForm from "./SuburbForm";

import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ScheduleForm = (props) => {
	const appTheme = useTheme();

	const [toggle, setToggle] = useState("groupToggle");
	const [showFormType, setShowFormType] = useState("group");

	const handleToggleChange = (event, newVal) => {
		if (newVal !== null) {
			setToggle(newVal);
		}
		if (newVal === "groupToggle") {
			setShowFormType("group");
		} else if (newVal === "suburbToggle") {
			setShowFormType("suburb");
		} else if (newVal === "areaToggle") {
			setShowFormType("area");
		}
	};

	return (
		<header className="header-center py-5">
			<div className="container px-3 px-md-5">
				<div className="text-center mb-5">
					<h1 className="fw-bolder">Select Your Group / Area</h1>
				</div>
				<div className="row align-items-center justify-content-center">
					<div className="col-12 col-md-6 text-center">
						<ToggleButtonGroup
							value={toggle}
							exclusive
							onChange={handleToggleChange}
							color={appTheme.palette.mode === "dark" ? "warning" : "error"}
						>
							<ToggleButton value="groupToggle">Search by Group</ToggleButton>
							<ToggleButton value="suburbToggle">Search by Suburb</ToggleButton>
							<ToggleButton value="areaToggle">Search by Location</ToggleButton>
						</ToggleButtonGroup>
					</div>
				</div>
				<div className="row align-items-center justify-content-center">
					<div className="col-12 col-lg-6">
						<div className="card p-lg-5 p-4">
							{showFormType === "group" && (
								<GroupForm groupName={props.groupName} />
							)}
							{showFormType === "suburb" && <SuburbForm />}
							{showFormType === "area" && <AreaForm />}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default ScheduleForm;
