import React from "react";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Button, DialogActions, InputAdornment } from "@mui/material";
import Loader from "react-js-loader";

import DefaultedMessage from "../UI/DefaultedMessage";

const SubscribeStep1 = (props) => {
	return (
		<>
			<DialogContent>
				<DialogContentText>
					<DefaultedMessage id="schedule.subscribe.text"/>
					{/* <p
						className="fw-light text-white-50 mt-2 lh-2"
						style={{ fontSize: "0.8em" }}
					>
						*Dialog is having technical difficulties, but we're working to fix
						the situation asap. If you enter your number, we'll message you as
						soon as we're up and running again.
					</p> */}
				</DialogContentText>
				<span className="text-error">{props.allRegErr}</span>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label={
						<DefaultedMessage id="schedule.subscribe.name"/>
					}
					type="text"
					value={props.name}
					onChange={(event) => {
						const regex = /^[a-zA-Z\s]*$/g;
						if (event.target.value === "" || regex.test(event.target.value)) {
							props.setName(event.target.value);
						}
					}}
					fullWidth
					variant="standard"
					autoComplete="off"
					color="info"
					required
				/>
				<span className="text-error">{props.nameErr}</span>
				<TextField
					margin="dense"
					id="phone-number"
					label={
						<DefaultedMessage id="schedule.subscribe.phoneNumber"/>
					}
					type="tel"
					value={props.phoneNum}
					onChange={(event) => {
						const regex = /^[0-9]*$/;
						if (event.target.value === "" || regex.test(event.target.value)) {
							props.setPhoneNum(event.target.value);
						}
					}}
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
					onKeyPress={(e) => e.key === "Enter" && props.handleSubscription()}
				/>
				<span className="text-error">{props.phoneNumError}</span>
			</DialogContent>
			<DialogActions>
				{props.showLoad && (
					<Loader
						type="spinner-default"
						bgColor={"#29b6f6"}
						size={30}
					/>
				)}
				<Button onClick={props.handleClose} color="secondary">
					<DefaultedMessage id="schedule.subscribe.cancelBtn"/>
				</Button>
				{!props.showSubBtn && (
                    <Button onClick={props.handleSubscription} color="info" disabled={props.showLoad}>
                        <DefaultedMessage id="schedule.subscribe.subBtn"/>
                    </Button>
                )}
                {props.reSubBtn && (
                    <Button onClick={props.handleReSubscription} color="info" disabled={props.showLoad}>
                        <DefaultedMessage id="schedule.subscribe.reSubBtn"/>
                    </Button>
                )}
			</DialogActions>
		</>
	);
};
export default SubscribeStep1;
