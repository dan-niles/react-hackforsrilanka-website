import React, { useEffect, useState } from "react";
import Loader from "react-js-loader";
import axios from "axios";

import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Button, DialogActions } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";

import DefaultedMessage from "../UI/DefaultedMessage";

const SubscribeStep0 = (props) => {
	const [showLoad, setShowLoad] = useState(true);
	const [groups, setGroups] = useState([]);
	const [group, setGroup] = useState("");
	const [groupError, setGroupError] = useState("");

	const fetchGroupNames = () => {
		setShowLoad(true);
		return axios
			.get(process.env.REACT_APP_API_URL + "/api/all-group/")
			.then((res) => {
				setGroups(res.data.data.sort());
				setShowLoad(false);
			})
			.catch((errr) => {});
	};

	useEffect(() => {
		fetchGroupNames();
	}, []);

	const handleGroupSelectChange = (event) => {
		if (event.target.value) {
			setGroupError("");
		}
		setGroup(event.target.value);
	};

	const validate = () => {
		if (group === undefined || group === "" || group === null) {
			setGroupError(
				<DefaultedMessage id="schedule.form.select-validation"/>
			);
			return false
		}
		setGroupError("")
		return true
	}

	const handleNext = () => {
		if (validate()){
			props.handleNext(group)
		}
	}

	return (
		<>
			<DialogContent>
				<DialogContentText>
					<DefaultedMessage id="schedule.subscribe.step0.desc1"/>
				</DialogContentText>

				<FormControl fullWidth error={groupError!==""} className="mt-3">
					<InputLabel id="group-select-label">
						<DefaultedMessage id="schedule.form.group.select" />
					</InputLabel>
					<Select
						labelId="group-select-label"
						id="group-select"
						label="Group Name"
						value={group}
						onChange={handleGroupSelectChange}
						name="group"
						variant="standard"
						margin="dense"
					>
						{groups?.map((item, index) => {
							return (
								<MenuItem value={item} key={index}>
									{item}
								</MenuItem>
							);
						})}
					</Select>
					<FormHelperText>
						{groupError ? (
							<DefaultedMessage id="schedule.form.select-validation"/>
						) : (
							""
						)}
					</FormHelperText>
				</FormControl>

				<DialogContentText className="mt-4">
					<DefaultedMessage id="schedule.subscribe.step0.desc2"/>
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				{showLoad && (
					<Loader
						type="spinner-default"
						bgColor={"#29b6f6"}
						size={30}
					/>
				)}
				<Button onClick={props.handleClose} color="secondary">
					<DefaultedMessage id="schedule.subscribe.cancelBtn"/>
				</Button>
				<Button onClick={handleNext} color="info" disabled={showLoad}>
					<DefaultedMessage id="schedule.subscribe.nextBtn"/>
				</Button>
			</DialogActions>
		</>
	);
};
export default SubscribeStep0;
