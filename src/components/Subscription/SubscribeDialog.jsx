import React, { useEffect, useState } from "react";

import { Step, StepLabel, Stepper, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import DefaultedMessage from "../UI/DefaultedMessage";
import LangRoutes from "../../lang/LangRoutes";
import SubscribeStep0 from "./SubscribeStep0";
import SubscribeStep1 from "./SubscribeStep1";
import SubscribeStep2 from "./SubscribeStep2";
import SubscribeStep3 from "./SubscribeStep3";

const SubscribeDialog = (props) => {
	
	//TODO: DELETE. Is areaName needed?
	const [areaName, setAreaName] = useState("");
	useEffect(() => {
		setAreaName(props.areaGroup);
	}, [props.areaGroup]);	
	
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));	

	const [step, setStep] = useState(0);
	const [stepGroupResult, setStepGroupResult] = useState("");
	const [stepDataResult, setStepDataResult] = useState("");
	
	const steps = [
		LangRoutes.getDefaultedMessage("schedule.subscribe.step0"),
		LangRoutes.getDefaultedMessage("schedule.subscribe.step1"),
		LangRoutes.getDefaultedMessage("schedule.subscribe.step2"),
		LangRoutes.getDefaultedMessage("schedule.subscribe.step3")
	];

	useEffect(() => {
		if (!props.isStandalonePage) {
			setStepGroupResult(props.groupName)
			setStep(1)
		}
	}, []);

	const handleNext = (result) => {
		switch (step) {
			case 0:
				setStepGroupResult(result);
			case 1:
				setStepDataResult(result);
		}
		setStep(step + 1);
	};

	const renderStep = (step) => {
		//const realStep = props.isStandalonePage ? step : step + 1;
		switch(step){
			case 0: 
				return <SubscribeStep0
							handleClose={props.handleClose}
							handleNext={handleNext}
						/>
			case 1: 
				return <SubscribeStep1
							groupName={stepGroupResult}
							handleClose={props.handleClose}
							handleNext={handleNext}
						/>
			case 2:
				return <SubscribeStep2
							groupName={stepGroupResult}
							stepDataResult={stepDataResult}
							handleClose={props.handleClose}
							handleNext={handleNext}
						/>
			case 3:
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
