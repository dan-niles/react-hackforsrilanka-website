import React, { useState } from "react";

import { Button, DialogActions, useMediaQuery } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import OtpInput from "react-otp-input";
import Loader from "react-js-loader";
import axios from "axios";

import DefaultedMessage from "../UI/DefaultedMessage";

const SubscribeStep2 = (props) => {
	const isDryDock = process.env.NODE_ENV && process.env.NODE_ENV === 'development'
	const matches = useMediaQuery("(min-width:768px)");

	const [otp, setOtp] = useState();
	const [otpError, setOtpError] = useState("");
	const [showLoad, setShowLoad] = useState(false);

	const handleVerifyOtp = () => {
		cleanErrors()
		setShowLoad(true);
		const url = process.env.REACT_APP_API_URL + "/api/verify-otp/" 
		const data = { 
			otp: otp,
			secretKey: props.stepDataResult.secretKey,
			mobile_number: props.stepDataResult.phoneNum, 
			name: props.stepDataResult.userName, 
			group_name: props.groupName
			
		};
		if (isDryDock){
			setTimeout(() => {
				console.log("Skipped POST to " + url + " with " + JSON.stringify(data));
				onVerifyOtpSuccess();
			}, 2000);
			return
		}
		return axios
			.post(url, data, { headers: { Accept: "application/json" }})
			.then(onVerifyOtpSuccess)
			.catch(onVerifyOtpError);
	};
	
	const onVerifyOtpSuccess = (res) => {
		setShowLoad(false);
		props.handleNext()
	}

	const onVerifyOtpError = (errr) => {
		setOtpError(errr.response.data.message);
	}

	const cleanErrors = () => {
		setOtpError("");
	}

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
						hasErrored={otpError!==""}
						value={otp}
						placeholder="______"
						onChange={(e) => setOtp(e)}
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
						<span className="text-error">{otpError}</span>
					</div>
				</div>
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
				<Button onClick={handleVerifyOtp} color="info" disabled={showLoad}>
					<DefaultedMessage id="schedule.subscribe.verifyBtn"/>
				</Button>
			</DialogActions>
		</>
	);
};
export default SubscribeStep2;
