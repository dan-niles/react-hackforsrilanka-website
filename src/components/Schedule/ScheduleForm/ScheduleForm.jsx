import { useEffect, useState } from "react";

import GroupForm from "./GroupForm";
import AreaForm from "./AreaForm";
import SuburbForm from "./SuburbForm";

import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { FormattedMessage } from "react-intl";

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

	let formParameters = {
		groupName: "",
		suburb: "",
		district: "",
		area: "",
	};
	if (localStorage.getItem("form-parameters") !== null) {
		formParameters = JSON.parse(localStorage.getItem("form-parameters"));
	}
	useEffect(() => {
		if (!props.groupName && !props.suburb && !props.district) {
			if (formParameters.groupName) {
				setShowFormType("group");
				setToggle("groupToggle");
			} else if (formParameters.suburb) {
				setShowFormType("suburb");
				setToggle("suburbToggle");
			} else if (formParameters.district) {
				setShowFormType("area");
				setToggle("areaToggle");
			}
		} else {
			if (props.groupName) {
				setShowFormType("group");
				setToggle("groupToggle");
			} else if (props.suburb) {
				setShowFormType("suburb");
				setToggle("suburbToggle");
			} else if (props.district) {
				setShowFormType("area");
				setToggle("areaToggle");
			}
		}
	}, []);

	return (
		<header className="header-centers py-5">
			<div className="container px-3 px-md-5">
				<div className="text-center mb-5">
					<h1 className="fw-bolder">
						<FormattedMessage
							id="schedule.form.title"
							defaultMessage="Select Your Group / Area"
						/>
					</h1>
				</div>
				<div className="row align-items-center justify-content-center">
					<div className="col-12 col-lg-6 text-center">
						<ToggleButtonGroup
							value={toggle}
							exclusive
							onChange={handleToggleChange}
							color={appTheme.palette.mode === "dark" ? "warning" : "error"}
						>
							<ToggleButton value="groupToggle">
								<FormattedMessage
									id="schedule.form.toggle.group"
									defaultMessage="Search by Group"
								/>
							</ToggleButton>
							<ToggleButton value="suburbToggle">
								<FormattedMessage
									id="schedule.form.toggle.suburb"
									defaultMessage="Search by Suburb"
								/>
							</ToggleButton>
							<ToggleButton value="areaToggle">
								<FormattedMessage
									id="schedule.form.toggle.location"
									defaultMessage="Search by Location"
								/>
							</ToggleButton>
						</ToggleButtonGroup>
					</div>
				</div>
				<div className="row align-items-center justify-content-center">
					<div className="col-12 col-lg-6">
						<div className="card p-lg-5 p-4">
							{showFormType === "group" && (
								<GroupForm
									groupName={props.groupName || formParameters.groupName}
								/>
							)}
							{showFormType === "suburb" && (
								<SuburbForm
									suburb={props.suburb || formParameters.suburb}
									district={props.district || formParameters.district}
									area={props.area || formParameters.area}
								/>
							)}
							{showFormType === "area" && (
								<AreaForm
									district={props.district || formParameters.district}
									area={props.area || formParameters.area}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default ScheduleForm;
