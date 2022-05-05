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
import { FormControl, InputAdornment, switchClasses } from "@mui/material";
import Swal from "sweetalert2";
import Loader from "react-js-loader";

import { baseURL } from "../../BaseApi";

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
			setNameErr("Please enter a name");
		} else if (phoneNum.toString().length !== 9) {
			setError("Please Enter a 9 digit valid number");
		} else {
			setShowLoad(true);
			return axios
				.post(
					baseURL + "/api/subscribe/",
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
					setShowSubBtn(true)
					setShowLoad(false);
					setAllRegErr(errr.response.data.errors);
					setReSubBtn(true)
					setShowOtpBox(false);
				});
		}
	};

	const getReSubscription = ()=>{
		setShowLoad(true);
		setShowOtpBox(false);
		return axios.post(baseURL + "/api/change-group/",
		{
			mobile_number: phoneNum,
			name: name,
			group_name: groupName,
		},
		{
			headers: { Accept: "application/json" },
		}
		).then((res)=>{
			setSecretKey(res.data.secret_key);
			setReSubBtn(false);
			setShowLoad(false);
            setShowOtpBox(true)
		}).catch((errr)=>{
		})
	}

	const verifyOtp = () => {
		const data = { otp, name, areaName, groupName, phoneNum, secretKey };
		const number = data.phoneNum.toString().slice(0, 4);
		return axios
			.post(
				baseURL + "/api/verify-otp/",
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
					title: `Cell phone number ${number}xxxxx has been successfully subscribed to group ${data.groupName}`,
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
		<Dialog open={props.open} onClose={props.handleClose}>
			<FormControl>
				<DialogTitle>Subscribe to Group {props.groupName}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To subscribe to this group, please enter your phone number here. We
						will send updates occasionally.
					</DialogContentText>
					<span className="text-danger">{allRegErr}</span>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Name"
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
					<span className="text-danger">{nameErr}</span>
					<TextField
						margin="dense"
						id="phone-number"
						label="Phone Number"
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
					<span className="text-danger">{error}</span>
					{showOtpBox&& (
						<div className="py-3">
							<h5>Enter Otp</h5>
							<OtpInput
								// hasErrored="true"
								className="otp_value"
								name="otp"
								isInputNum={true}
								numInputs={true}
								hasErrored={otpErr}
								value={otp}
								placeholder="______"
								onChange={(e) => setOtp(e)}
								numInputs={6}
								errorStyle={{
									width: "60px",
									height: "60px",
									margin: "0 1rem",
									fontSize: "2rem",
									borderRadius: 12,
									border: "2px solid red",
								}}
								inputStyle={{
									width: "60px",
									height: "60px",
									margin: "0 1rem",
									fontSize: "2rem",
									borderRadius: 12,
									border: "1px solid rgba(0,0,0,0.3)",
								}}
							/>
							<div className="pt-3">
								<span className="text-danger">{otpErr}</span>
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
							size={50}
						/>
					)}
					{showOtpBox && (
						<Button onClick={verifyOtp} color="secondary">
							Verify Otp
						</Button>
					)}
					<Button onClick={props.handleClose} color="secondary">
						Cancel
					</Button>
					{!showSubBtn &&(
						<Button onClick={getSubscription} color="info" disabled={showLoad}>
							{/* onClick={props.handleClose} */}
							subscribe
						</Button>
					)}
					{reSubBtn &&
						(
							<Button onClick={getReSubscription} color="info" disabled={showLoad}>
								{/* onClick={props.handleClose} */}
							 Resubscribe
							</Button>
						)
					}
				</DialogActions>
			</FormControl>
		</Dialog>
	);
};

export default AlertDialog;
