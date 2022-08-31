import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { InputAdornment } from "@mui/material";

import DefaultedMessage from "../UI/DefaultedMessage";

const UnsubscribeStep1 = (props) => {
	return (
		<>
			<DialogContent>			
				<DialogContentText className="my-4">
					<DefaultedMessage id="schedule.unsubscribe.text"/>
				</DialogContentText>
				<span className="text-error"></span>
				<TextField
					autoFocus
					margin="dense"
					id="phone-number"
					label={
						<DefaultedMessage id="schedule.unsubscribe.phoneNumber"/>
					}
					type="tel"
					//   disabled={showOtpBox}
					value={props.mobileNum}
					onChange={props.handlePhoneInput}
					fullWidth
					required
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">+94</InputAdornment>
						),
					}}
					variant="standard"
					autoComplete="off"
					color="info"
				/>
				<span className="text-error">{props.error}</span>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.handleClose} color="secondary">
					<DefaultedMessage id="schedule.unsubscribe.cancelBtn"/>
				</Button>
				<Button onClick={props.handleSubmit} color="info">
					<DefaultedMessage id="schedule.unsubscribe.unSubBtn"/>
				</Button>
			</DialogActions>
		</>
	);
};
export default UnsubscribeStep1;
