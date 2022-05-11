import React, { useEffect, useState } from "react";
import axios from "axios";
import OtpInput from "react-otp-input";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { InputAdornment, useMediaQuery } from "@mui/material";
import Swal from "sweetalert2";
import Loader from "react-js-loader";

import { FormattedMessage } from "react-intl";

const AlertDialog = (props) => {
	const [name, setName] = useState("");
	const [areaName, setAreaName] = useState("");
	const [phoneNum, setPhoneNum] = useState("");
	const [groupName, setGroupName] = useState(props.groupName);
	const [otp, setOtp] = useState();
	const [otpErr, setOtpErr] = useState();
	const [showOtpBox, setShowOtpBox] = useState(false);
	const [secretKey, setSecretKey] = useState();
	const [error, setError] = useState();
	const [nameErr, setNameErr] = useState();
	const [showLoad, setShowLoad] = useState(false);
	const [allRegErr, setAllRegErr] = useState();
	const [reSubBtn, setReSubBtn] = useState(false);
	const [showSubBtn, setShowSubBtn] = useState(false);

	const matches = useMediaQuery("(min-width:768px)");
	useEffect(() => {
		setGroupName(props.areaGroup);
	}, [props.areaGroup]);

	useEffect(() => {
		setGroupName(props.groupName);
	}, [props.groupName]);

	useEffect(() => {
		setNameErr("");
	}, [name]);

	const getSubscription = () => {
		let username = name.trim();
		if (username === undefined || username === "" || username == null) {
			setNameErr(
				<FormattedMessage
					id="schedule.subscribe.nameError"
					defaultMessage="Please enter a name"
				/>
			);
		} else if (phoneNum.toString().length !== 9) {
			setError(
				<FormattedMessage
					id="schedule.subscribe.phoneError"
					defaultMessage="Please enter a valid 9 digit number"
				/>
			);
		} else {
			setShowLoad(true);
			return axios
				.post(
					process.env.REACT_APP_API_URL + "/api/subscribe/",
					{
						mobile_number: phoneNum,
						name: name,
						group_name: groupName,
					},
					{
						headers: { Accept: "application/json" },
					}
				)
				.then((res) => {
					setShowLoad(false);
					setShowSubBtn(true);
					setError("");
					setShowOtpBox(true);
					setSecretKey(res.data.secret_key);
				})
				.catch((errr) => {
					setShowSubBtn(true);
					setShowLoad(false);
					if (errr) {
						setAllRegErr(errr.response.data.errors);
					}
					setReSubBtn(true);
					setShowOtpBox(false);
				});
		}
	};

	const getReSubscription = () => {
		setShowLoad(true);
		setShowOtpBox(false);
		setError("");
		return axios
			.post(
				process.env.REACT_APP_API_URL + "/api/change-group/",
				{
					mobile_number: phoneNum,
					name: name,
					group_name: groupName,
				},
				{
					headers: { Accept: "application/json" },
				}
			)
			.then((res) => {
				setSecretKey(res.data.secret_key);
				setReSubBtn(false);
				setShowLoad(false);
				setShowOtpBox(true);
			})
			.catch((errr) => {});
	};

	const verifyOtp = () => {
		const data = { otp, name, areaName, groupName, phoneNum, secretKey };
		const number = data.phoneNum.toString().slice(0, 4);
		return axios
			.post(
				process.env.REACT_APP_API_URL + "/api/verify-otp/",
				{
					otp: data.otp,
					secret_key: data.secretKey,
					mobile_number: data.phoneNum,
					name: data.name,
					group_name: data.groupName,
				},
				{
					headers: { Accept: "application/json" },
				}
			)
			.then((res) => {
				props.handleClose();
				Swal.fire({
					position: "top-center",
					icon: "info",
					title: `Cell phone number ${number}xxxxx has been successfully subscribed to group 
                  ${data.groupName}`,
					showConfirmButton: true,
				});
				setName("");
				setPhoneNum("");
				setShowLoad(false);
				setAllRegErr("");
			})
			.catch((errr) => {
				setOtpErr(errr.response.data.message);
			});
	};

	return (
		<Dialog sx={{ margin: 0 }} open={props.open} onClose={props.handleClose}>
			<DialogTitle>
				<FormattedMessage
					id="schedule.subscribe.title"
					defaultMessage="Subscribe to Group {groupName}"
					values={{ groupName: props.groupName }}
				/>
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					<FormattedMessage
						id="schedule.subscribe.text"
						defaultMessage="To subscribe to this group, please enter your name and phone number
						here. We will send updates occasionally."
					/>
				</DialogContentText>
				<span className="text-error">{allRegErr}</span>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label={
						<FormattedMessage
							id="schedule.subscribe.name"
							defaultMessage="Name"
						/>
					}
					type="text"
					disabled={showOtpBox}
					value={name}
					onChange={(event) => {
						const regex = /^[a-zA-Z]*$/;
						if (event.target.value === "" || regex.test(event.target.value)) {
							setName(event.target.value);
						}
					}}
					fullWidth
					variant="standard"
					autoComplete="off"
					color="info"
					required
				/>
				<span className="text-error">{nameErr}</span>
				<TextField
					margin="dense"
					id="phone-number"
					label={
						<FormattedMessage
							id="schedule.subscribe.phoneNumber"
							defaultMessage="Phone Number"
						/>
					}
					type="tel"
					disabled={showOtpBox}
					value={phoneNum}
					onChange={(event) => {
						const regex = /^[0-9]*$/;
						if (event.target.value === "" || regex.test(event.target.value)) {
							setPhoneNum(event.target.value);
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
				/>
				<span className="text-error">{error}</span>
				{showOtpBox && (
					<div className="pt-3 d-flex flex-column align-items-center">
						<p>
							<FormattedMessage
								id="schedule.subscribe.verifyText"
								defaultMessage="Please enter the verification code sent to your phone"
							/>
						</p>
						<OtpInput
							className="otp_value"
							name="otp"
							isInputNum={true}
							// numInputs={true}
							hasErrored={otpErr}
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
							<span className="text-error">{otpErr}</span>
						</div>
					</div>
				)}
			</DialogContent>
			<DialogActions>
				{showLoad && (
					<Loader
						type="spinner-default"
						bgColor={"#FFFFFF"}
						color={"SlateBlue"}
						size={30}
					/>
				)}
				<Button onClick={props.handleClose} color="secondary">
					<FormattedMessage
						id="schedule.subscribe.cancelBtn"
						defaultMessage="Cancel"
					/>
				</Button>
				{showOtpBox && (
					<Button onClick={verifyOtp} color="success">
						<FormattedMessage
							id="schedule.subscribe.verifyBtn"
							defaultMessage="Verify Code"
						/>
					</Button>
				)}
				{!showSubBtn && (
					<Button onClick={getSubscription} color="info" disabled={showLoad}>
						{/* onClick={props.handleClose} */}
						<FormattedMessage
							id="schedule.subscribe.subBtn"
							defaultMessage="Subscribe"
						/>
					</Button>
				)}
				{reSubBtn && (
					<Button onClick={getReSubscription} color="info" disabled={showLoad}>
						{/* onClick={props.handleClose} */}
						<FormattedMessage
							id="schedule.subscribe.reSubBtn"
							defaultMessage="Resubscribe"
						/>
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
};

export default AlertDialog;
