import React from "react";
import DialogContent from "@mui/material/DialogContent";
import { Button, DialogActions, useMediaQuery } from "@mui/material";
import OtpInput from "react-otp-input";
import Loader from "react-js-loader";

import DefaultedMessage from "../UI/DefaultedMessage";

const SubscribeStep2 = (props) => {
	const matches = useMediaQuery("(min-width:768px)");

	return (
		<>
			<DialogContent>
				<div className="pt-3 d-flex flex-column align-items-center">
					<p>
						<DefaultedMessage id="schedule.subscribe.verifyText"/>
					</p>
					<OtpInput
						shouldAutoFocus={true}
						className="otp_value"
						name="otp"
						isInputNum={true}
						// numInputs={true}
						hasErrored={props.otpErr}
						value={props.otp}
						placeholder="______"
						onChange={(e) => props.setOtp(e)}
						numInputs={6}
						errorStyle={{
							width: matches ? "60px" : "40px",
							height: matches ? "60px" : "40px",
							margin: matches ? "5px" : "3px",
							fontSize: matches ? "2rem" : "1rem",
							borderRadius: matches ? 12 : 6,
							border: "2px solid red",
						}}
						inputStyle={{
							width: matches ? "60px" : "40px",
							height: matches ? "60px" : "40px",
							margin: matches ? "5px" : "3px",
							fontSize: matches ? "2rem" : "1rem",
							borderRadius: matches ? 12 : 6,
							border: "1px solid rgba(0,0,0,0.3)",
						}}
					/>
					<div className="pt-3">
						<span className="text-error">{props.otpErr}</span>
					</div>
				</div>
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
				<Button onClick={props.handleVerifyOtp} color="info" disabled={props.showLoad}>
					<DefaultedMessage id="schedule.subscribe.verifyBtn"/>
				</Button>
			</DialogActions>
		</>
	);
};
export default SubscribeStep2;
