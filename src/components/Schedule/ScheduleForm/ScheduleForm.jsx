import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import GroupForm from "./GroupForm";
import AreaForm from "./AreaForm";
import DistrictForm from "./DistrictForm";

import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FormattedMessage } from "react-intl";
import { Alert, Button } from "@mui/material";

import PageRoutes from "../../../routes/PageRoutes"
import DefaultedMessage from "../../UI/DefaultedMessage";

const ScheduleForm = (props) => {
	const appTheme = useTheme();
	const navigate = useNavigate();

	const [toggle, setToggle] = useState("groupToggle");
	const [showFormType, setShowFormType] = useState("group");

	const handleToggleChange = (event, newVal) => {
		if (newVal !== null) {
			setToggle(newVal);
		}
		if (newVal === "groupToggle") {
			setShowFormType("group");
		} else if (newVal === "districtToggle") {
			setShowFormType("district");
		} else if (newVal === "areaToggle") {
			setShowFormType("area");
		}
	};

	let formParameters = {
		groupName: "",
		district: "",
		gss: "",
		area: "",
	};
	if (localStorage.getItem("form-parameters") !== null) {
		formParameters = JSON.parse(localStorage.getItem("form-parameters"));
	}
	useEffect(() => {
		if (!props.groupName && !props.district && !props.gss) {
			if (formParameters.groupName) {
				setShowFormType("group");
				setToggle("groupToggle");
			} else if (formParameters.district) {
				setShowFormType("district");
				setToggle("districtToggle");
			} else if (formParameters.gss) {
				setShowFormType("area");
				setToggle("areaToggle");
			}
		} else {
			if (props.groupName) {
				setShowFormType("group");
				setToggle("groupToggle");
			} else if (props.district) {
				setShowFormType("district");
				setToggle("districtToggle");
			} else if (props.gss) {
				setShowFormType("area");
				setToggle("areaToggle");
			}
		}
	}, []);

	return (
		<div className="container px-3 px-md-5">
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
						{/* <ToggleButton value="districtToggle">
							<FormattedMessage
								id="schedule.form.toggle.district"
								defaultMessage="Search by District"
							/>
						</ToggleButton> */}
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
						{showFormType === "district" && (
							<DistrictForm
								district={props.district || formParameters.district}
								gss={props.gss || formParameters.gss}
								area={props.area || formParameters.area}
							/>
						)}
						{showFormType === "area" && (
							<AreaForm
								gss={props.gss || formParameters.gss}
								area={props.area || formParameters.area}
							/>
						)}
					</div>
				</div>
			</div>
			<div className="row mt-4 mt-md-4 align-items-center justify-content-center">
				<div className="col-12 col-lg-6">
					<Alert
						// variant="outlined"
						severity="info"
						action={
							<Button
								sx={{ lineHeight: "1.5em" }}
								size="small"
								variant="contained"
								onClick={() =>
									navigate({
										pathname: `../${PageRoutes.slug(PageRoutes.SUGGESTIONS)}`,
									})
								}
							>
								<DefaultedMessage id="suggestions.feature.title"/>
							</Button>
						}
						sx={{ alignItems: "center" }}
					>
						<DefaultedMessage id="suggestions.feature.desc1"/>
						<br />
						<DefaultedMessage id="suggestions.feature.desc2"/>
					</Alert>
				</div>
			</div>
		</div>
	);
};

export default ScheduleForm;
