import React, { useEffect, useState } from "react";
import axios from "axios";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Step, StepLabel, Stepper, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import DefaultedMessage from "../UI/DefaultedMessage";
import SubscribeStep1 from "./SubscribeStep1";
import SubscribeStep2 from "./SubscribeStep2";
import LangRoutes from "../../lang/LangRoutes";
import SubscribeStep3 from "./SubscribeStep3";

const SubscribeDialog = (props) => {
	const isDryDock = process.env.NODE_ENV && process.env.NODE_ENV === 'development'
	
	const [step, setStep] = useState(0);
	const [name, setName] = useState("");
	const [areaName, setAreaName] = useState("");
	const [phoneNum, setPhoneNum] = useState("");
	const [groupName, setGroupName] = useState(props.groupName);
	const [otp, setOtp] = useState();
	const [otpErr, setOtpErr] = useState();
	const [secretKey, setSecretKey] = useState();
	const [allRegErr, setAllRegErr] = useState();
	const [nameErr, setNameErr] = useState();
	const [phoneNumError, setPhoneNumError] = useState();
	const [showLoad, setShowLoad] = useState(false);
	const [reSubBtn, setReSubBtn] = useState(false);
	const [showSubBtn, setShowSubBtn] = useState(false);

	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
	

	useEffect(() => {
		setGroupName(props.areaGroup);
	}, [props.areaGroup]);

	useEffect(() => {
		setGroupName(props.groupName);
	}, [props.groupName]);

	useEffect(() => {
		setNameErr("");
	}, [name]);

	const cleanErrors = () => {
		setAllRegErr("");
		setNameErr("");
		setPhoneNumError("");
		setOtpErr("");
	}

	const handleSubscription = () => {
		let username = name.trim();
		if (username === undefined || username === "" || username == null) {
			setNameErr(
				<DefaultedMessage id="schedule.subscribe.nameError"/>
			);
		} else if (phoneNum.toString().length !== 9) {
			setPhoneNumError(
				<DefaultedMessage id="schedule.subscribe.phoneError" />
			);
		} else {
			cleanErrors()
			setShowLoad(true);
			if (isDryDock){
				setTimeout(function () { 
					let fakeRes = {"data": {"secret_key": "0000"}}
					onSubscriptionSuccess(fakeRes)
				}, 3000);
				return
			}
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
				.then(onSubscriptionSuccess)
				.catch(onSubscriptionError);
		}
	};
	
	const onSubscriptionSuccess = (res) => {
		setStep(1);
		setShowLoad(false);
		setShowSubBtn(true);
		cleanErrors()
		setSecretKey(res.data.secret_key);
	}
	
	const onSubscriptionError = (errr) => {
		setShowLoad(false);
		setShowSubBtn(true);
		if (errr) {
			setAllRegErr(errr.response.data.errors);
		}
		setReSubBtn(true);
	}

	const handleReSubscription = () => {
		setShowLoad(true);
		setPhoneNumError("");
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
			.then(onReSubscriptionSuccess)
			.catch((errr) => {});
	};

	const onReSubscriptionSuccess = (res) => {
		setSecretKey(res.data.secret_key);
		setReSubBtn(false);
		setShowLoad(false);
	}

	const handleVerifyOtp = () => {
		cleanErrors()
		setShowLoad(true);
		const data = { otp, name, areaName, groupName, phoneNum, secretKey };
		const number = data.phoneNum.toString().slice(0, 4);
		if (isDryDock){
			setTimeout(function () { 
				onVerifyOtpSuccess()
			}, 3000);
			return
		}
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
			.then(onVerifyOtpSuccess)
			.catch(onVerifyOtpError);
	};
	
	const onVerifyOtpSuccess = (res) => {
		setShowLoad(false);
		setStep(2)
	}

	const onVerifyOtpError = (errr) => {
		setOtpErr(errr.response.data.message);
	}

	const steps = [
		LangRoutes.getDefaultedMessage("schedule.subscribe.step1"),
		LangRoutes.getDefaultedMessage("schedule.subscribe.step2"),
		LangRoutes.getDefaultedMessage("schedule.subscribe.step3")
	];

	const renderStep = (step) => {
		switch(step){
			case 0: 
				return <SubscribeStep1
							allRegErr={allRegErr}
							name={name}
							setName={setName}
							nameErr={nameErr}
							phoneNum={phoneNum}
							setPhoneNum={setPhoneNum}
							phoneNumError={phoneNumError}
							showLoad={showLoad}
							showSubBtn={showSubBtn}
							reSubBtn={reSubBtn}
							handleClose={props.handleClose}
							handleSubscription={handleSubscription}
							handleReSubscription={handleReSubscription}
						/>
			case 1:
				return <SubscribeStep2
							otp={otp}
							setOtp={setOtp}
							otpErr={otpErr}
							showLoad={showLoad}
							handleClose={props.handleClose}
							handleVerifyOtp={handleVerifyOtp}
						/>
			case 2:
				return <SubscribeStep3
							handleClose={props.handleClose}
						/>
		}
	}

	const renderContent = () => {
		return (
			<>
			<DialogTitle>
				<DefaultedMessage
					id="schedule.subscribe.title"
					values={{ groupName: props.groupName }}
				/>
			</DialogTitle>

			<Stepper activeStep={step} alternativeLabel className="mb-3">
				{steps.map((label) => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>

			{renderStep(step)}
			</>
		)
	}

	return (
		<>
			{!props.isStandalonePage ? (
				<Dialog
					sx={{ margin: 0 }}
					open={props.open}
					onClose={props.handleClose}
					fullScreen={fullScreen}
				>
				{renderContent()}
				</Dialog>
			) : (
				renderContent()
			)}
		</>
	);
};

export default SubscribeDialog;
