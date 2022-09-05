import React, { useEffect, useState } from "react";

import { Button, DialogActions, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Loader from "react-js-loader";
import axios from "axios";

import DefaultedMessage from "../UI/DefaultedMessage";

const SubscribeStep1 = (props) => {
	const isDryDock = process.env.NODE_ENV && process.env.NODE_ENV === 'development'

	const [submitError, setSubmitError] = useState();
	const [userName, setUserName] = useState("");
	const [userNameError, setUserNameError] = useState();
	const [phoneNum, setPhoneNum] = useState("");
	const [phoneNumError, setPhoneNumError] = useState();
	const [showLoad, setShowLoad] = useState(false);
	const [isReSubmit, setIsReSubmit] = useState(false);

	useEffect(() => {
		setUserNameError("");
	}, [userName]);

	useEffect(() => {
		setPhoneNumError("");
	}, [phoneNum]);

	const validate = () => {
		let username = userName.trim();
		if (username === undefined || username === "" || username == null) {
			setUserNameError(
				<DefaultedMessage id="schedule.subscribe.nameError"/>
			);
			return false;
		}
		else if (phoneNum.toString().length !== 9) {
			setPhoneNumError(
				<DefaultedMessage id="schedule.subscribe.phoneError" />
			);
			return false;
		}
		cleanErrors()
		return true;
	}

	const cleanErrors = () => {
		setSubmitError("");
		setUserNameError("");
		setPhoneNumError("");
	}

	const handleSubscription = () => {
		if (validate()){
			cleanErrors()
			setShowLoad(true);
			const url = process.env.REACT_APP_API_URL + "/api/subscribe/"
			const data = {
				mobile_number: phoneNum,
				name: userName,
				group_name: props.groupName,
			}
			if (isDryDock){
				setTimeout(() => {
					console.log("Skipped POST to " + url + " with " + JSON.stringify(data));
					let fakeRes = { "data": { "secret_key": "0000" } };
					onSubscriptionSuccess(fakeRes);
				}, 2000);
				return
			}
			return axios
				.post(url, data, { headers: { Accept: "application/json" } })
				.then(onSubscriptionSuccess)
				.catch(onSubscriptionError);
		}
	};

	const handleReSubscription = () => {
		if (validate()){
			cleanErrors()
			setShowLoad(true);
			const url = process.env.REACT_APP_API_URL + "/api/change-group/"
			const data = {
				mobile_number: phoneNum,
				name: userName,
				group_name: props.groupName,
			}
			return axios
				.post(url, data, { headers: { Accept: "application/json" } })
				.then(onSubscriptionSuccess)
				.catch((errr) => {});
		}
	};

	const onSubscriptionSuccess = (res) => {
		setShowLoad(false);
		props.handleNext({
			name: userName, 
			phoneNum: phoneNum, 
			secretKey: res.data.secret_key 
		})
	}
	
	const onSubscriptionError = (errr) => {
		setShowLoad(false);
		setIsReSubmit(true)
		if (errr) {
			setSubmitError(errr.response.data.errors);
		}
	}

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
				<span className="text-error">{submitError}</span>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label={
						<DefaultedMessage id="schedule.subscribe.name"/>
					}
					type="text"
					value={userName}
					onChange={(event) => {
						const regex = /^[a-zA-Z\s]*$/g;
						if (event.target.value === "" || regex.test(event.target.value)) {
							setUserName(event.target.value);
						}
					}}
					fullWidth
					variant="standard"
					autoComplete="off"
					color="info"
					required
				/>
				<span className="text-error">{userNameError}</span>
				<TextField
					margin="dense"
					id="phone-number"
					label={
						<DefaultedMessage id="schedule.subscribe.phoneNumber"/>
					}
					type="tel"
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
					onKeyPress={(e) => e.key === "Enter" && handleSubscription()}
				/>
				<span className="text-error">{phoneNumError}</span>
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
                {!isReSubmit ? (
					<Button onClick={handleSubscription} color="info" disabled={showLoad}>
						<DefaultedMessage id="schedule.subscribe.subBtn"/>
					</Button>
				) : (
                    <Button onClick={handleReSubscription} color="info" disabled={showLoad}>
                        <DefaultedMessage id="schedule.subscribe.reSubBtn"/>
                    </Button>
                )}
			</DialogActions>
		</>
	);
};
export default SubscribeStep1;
