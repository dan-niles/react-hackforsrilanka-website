import React, { useEffect, useState } from "react";

import { Step, StepLabel, Stepper, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import DefaultedMessage from "../UI/DefaultedMessage";
import LangRoutes from "../../lang/LangRoutes";
import SubscribeStepGroup from "./SubscribeStepGroup";
import SubscribeStepData from "./SubscribeStepData";
import SubscribeStepVerify from "./SubscribeStepVerify";
import SubscribeStepConfirm from "./SubscribeStepConfirm";

const SubscribeDialog = (props) => {
	
	const STEP_GROUP = 0;
	const STEP_DATA = 1;
	const STEP_VERIFY = 2;
	const STEP_CONFIRM = 3;

	const steps = [
		LangRoutes.getDefaultedMessage("schedule.subscribe.step0"),
		LangRoutes.getDefaultedMessage("schedule.subscribe.step1"),
		LangRoutes.getDefaultedMessage("schedule.subscribe.step2"),
		LangRoutes.getDefaultedMessage("schedule.subscribe.step3")
	];

	const [step, setStep] = useState(STEP_GROUP);
	const [stepGroupResult, setStepGroupResult] = useState("");
	const [stepDataResult, setStepDataResult] = useState("");

	useEffect(() => {
		if (!props.isStandalonePage) {
			setStepGroupResult(props.groupName)
			setStep(1)
		}
	}, []);

	//TODO: DELETE. Is areaName needed?
	const [areaName, setAreaName] = useState("");
	useEffect(() => {
		setAreaName(props.areaGroup);
	}, [props.areaGroup]);	

	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));	
	
	const handleNext = (result) => {
		switch (step) {
			case STEP_GROUP:
				setStepGroupResult(result);
				break
			case STEP_DATA:
				setStepDataResult(result);
				break
			default:
				break
		}
		setStep(step + 1);
	};

	const renderStep = (step) => {
		switch(step){
			case STEP_GROUP: 
				return <SubscribeStepGroup
							handleClose={props.handleClose}
							handleNext={handleNext}
						/>
			case STEP_DATA: 
				return <SubscribeStepData
							groupName={stepGroupResult}
							handleClose={props.handleClose}
							handleNext={handleNext}
						/>
			case STEP_VERIFY:
				return <SubscribeStepVerify
							groupName={stepGroupResult}
							stepDataResult={stepDataResult}
							handleClose={props.handleClose}
							handleNext={handleNext}
						/>
			case STEP_CONFIRM:
				return <SubscribeStepConfirm
							handleClose={props.handleClose}
						/>
			default:
				return
		}
	}

	const renderContent = () => {
		return (
			<>
			<DialogTitle>
				<DefaultedMessage
					id="schedule.subscribe.title"
					values={{ groupName: stepGroupResult }}
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
