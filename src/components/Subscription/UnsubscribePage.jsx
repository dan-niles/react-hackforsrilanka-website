import React, { useState } from "react";
import axios from "axios";

import DialogTitle from "@mui/material/DialogTitle";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import { useNavigate } from "react-router-dom";
import DefaultedMessage from "../UI/DefaultedMessage";
import PageRoutes from "../../routes/PageRoutes";
import LangRoutes from "../../lang/LangRoutes";
import UnsubscribeStepData from "./UnsubscribeStepData";
import UnsubscribeStepConfirm from "./UnsubscribeStepConfirm";
import InfoAlert from "../UI/InfoAlert";
import { Container, Grid } from "@mui/material";

const UnsubscribePage = () => {
	const isDryDock = process.env.NODE_ENV && process.env.NODE_ENV === 'development'
	
	const STEP_DATA = 0;
	const STEP_CONFIRM = 1;

	const steps = [
		LangRoutes.getDefaultedMessage("schedule.unsubscribe.step0"),
		LangRoutes.getDefaultedMessage("schedule.unsubscribe.step1")
	];

	const [mobileNum, setMobileNum] = useState("");
	const [error, setError] = useState();
	const [open, setOpen] = useState(false);
	const [step, setStep] = useState(STEP_DATA);
	const navigate = useNavigate();

	const handlePhoneInput = (event) => {
		const regex = /^[0-9]*$/;
		if (
			event.target.value === "" ||
			regex.test(event.target.value)
		) {
			setMobileNum(event.target.value);
		}
	}

	const handleClose = () => {
		setOpen(false);
		navigate("/");
	};

	const handleSubmit = () => {
		if (!mobileNum || mobileNum.toString().length !== 9) {
			setError(
				<DefaultedMessage id="schedule.unsubscribe.phoneError"/>
			);
		} else {
			if (isDryDock){
				onSuccess()
				return
			}
			axios.post(
				process.env.REACT_APP_API_URL + "/api/unsubscribe/",
				{
					mobile_number: mobileNum,
				},
				{
					headers: { Accept: "application/json" },
				}
			)
			.then((res) => {
				onSuccess(res)
			})
			.catch((errr) => {
				setError(errr.response.data.errors);
			});
		}
	};

	const onSuccess = (res) => {
		setStep(STEP_CONFIRM + 1)
		setMobileNum("");
	}

	return (
		<Grid>
			<Container
				sx={{
					padding: { md: 10 },
					paddingTop: { xs: 10 },
				}}
			>
				<div className="row justify-content-center">
					<div className="col-12 col-md-8 col-lg-6">
						<div className="card">

							<DialogTitle>
								<DefaultedMessage id="schedule.unsubscribe.title"/>
							</DialogTitle>

							<Stepper activeStep={step} alternativeLabel>
								{steps.map((label) => (
									<Step key={label}>
										<StepLabel>{label}</StepLabel>
									</Step>
								))}
							</Stepper>
							
							{step === 0 ? (	
								<UnsubscribeStepData
									mobileNumber={mobileNum}
									error={error}
									handlePhoneInput={handlePhoneInput}
									handleClose={handleClose}
									handleSubmit={handleSubmit}
								/>
							) : (
								<UnsubscribeStepConfirm
									handleClose={handleClose}
								/>
							)}
						</div>
					</div>
				</div>
				<div className="row justify-content-center mt-3">
					<div className="col-12 col-md-8 col-lg-6">
						<InfoAlert
							desc1TextId="suggestions.improvement.desc1"
							desc2TextId="suggestions.improvement.desc2"
							buttonTextId="suggestions.improvement.title"
							navigationPath={`../${PageRoutes.slug(PageRoutes.SUGGESTIONS)}`}
						/>
					</div>
				</div>
			</Container>
		</Grid>
	);
};
export default UnsubscribePage;
