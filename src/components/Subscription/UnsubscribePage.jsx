import React, { useState } from "react";
import axios from "axios";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, Box, Container, Grid, InputAdornment } from "@mui/material";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import { useNavigate } from "react-router-dom";
import AnimatedResult from "./AnimatedResult";
import DefaultedMessage from "../UI/DefaultedMessage";
import PageRoutes from "../../routes/PageRoutes";
import LangRoutes from "../../lang/LangRoutes";

const UnsubscribePage = () => {
	const isDryDock = process.env.NODE_ENV && process.env.NODE_ENV === 'development'
	console.log(process.env.NODE_ENV)

	const [mobileNum, setMobileNum] = useState("");
	const [error, setError] = useState();
	const [open, setOpen] = useState(false);
	const [step, setStep] = useState(0);
	const navigate = useNavigate();
	
	const steps = [
		LangRoutes.getDefaultedMessage("schedule.unsubscribe.step1"),
		LangRoutes.getDefaultedMessage("schedule.unsubscribe.step2")
	  ];

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
		setStep(2)
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
								<>
								<DialogContent>			
									<DialogContentText className="my-4">
										<DefaultedMessage id="schedule.unsubscribe.text"/>
									</DialogContentText>
									<span className="text-error"></span>
									<TextField
										autoFocus
										margin="dense"
										id="phone-number"
										label={
											<DefaultedMessage id="schedule.unsubscribe.phoneNumber"/>
										}
										type="tel"
										//   disabled={showOtpBox}
										value={mobileNum}
										onChange={handlePhoneInput}
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
								</DialogContent>
								<DialogActions>
									<Button onClick={handleClose} color="secondary">
										<DefaultedMessage id="schedule.unsubscribe.cancelBtn"/>
									</Button>
									<Button onClick={handleSubmit} color="info">
										<DefaultedMessage id="schedule.unsubscribe.unSubBtn"/>
									</Button>
								</DialogActions>
								</>
							) : (
								<>
								<DialogContent>
									<Box
										sx={{
											flex: "1 1 auto",
											display: "flex",
											flexDirection: "column",
											alignItems: "center"
										}}
									>
											<AnimatedResult type="success"/>
											<Typography variant="h5" component="div" gutterBottom>
												<DefaultedMessage id={"schedule.unsubscribe.successText"}/>
											</Typography>
									</Box>
								</DialogContent>
								<DialogActions>
									<Button onClick={handleClose} color="info">
										<DefaultedMessage id="schedule.unsubscribe.successButton"/>
									</Button>
								</DialogActions>
								</>
							)}
						</div>
					</div>
				</div>
				<div className="row justify-content-center mt-3">
					<div className="col-12 col-md-8 col-lg-6">
						<Alert
							// variant="outlined"
							severity="info"
							action={
								<Button
									sx={{ lineHeight: "1.5em" }}
									size="small"
									variant="contained"
									onClick={() =>
										navigate({pathname: `../${PageRoutes.slug(PageRoutes.SUGGESTIONS)}`,})
									}
								>
									<DefaultedMessage id="suggestions.improvement.title"/>
								</Button>
							}
							sx={{ alignItems: "center" }}
						>
							<DefaultedMessage id="suggestions.improvement.desc1"/>
							<br />
							<DefaultedMessage id="suggestions.improvement.desc2"/>
						</Alert>
					</div>
				</div>
			</Container>
		</Grid>
	);
};
export default UnsubscribePage;
