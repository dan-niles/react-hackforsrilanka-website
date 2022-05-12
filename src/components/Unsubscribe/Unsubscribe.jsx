import React, { useState } from "react";
import axios from "axios";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Container, Grid, InputAdornment } from "@mui/material";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const Unsubscribe = () => {
	const [mobileNum, setMobileNum] = useState();
	const [error, setError] = useState();
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const handleClose = () => {
		setOpen(true);
		navigate("/");
	};
	const getUnSubscribe = () => {
		if (mobileNum.toString().length !== 9) {
			setError(
				<FormattedMessage
					id="schedule.unsubscribe.phoneError"
					defaultMessage="Please enter a valid 9 digit number"
				/>
			);
		} else {
			axios
				.post(
					process.env.REACT_APP_API_URL + "/api/unsubscribe/",
					{
						mobile_number: mobileNum,
					},
					{
						headers: { Accept: "application/json" },
					}
				)
				.then((res) => {
					handleClose();
					Swal.fire({
						position: "top-center",
						icon: "success",
						title: "Unsubscribed Successfully",
						showConfirmButton: true,
					});
					setMobileNum("");
				})
				.catch((errr) => {
					setError(errr.response.data.errors);
				});
		}
	};

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
								<FormattedMessage
									id="schedule.unsubscribe.title"
									defaultMessage="Unsubscribe from Notifications"
								/>
							</DialogTitle>
							<DialogContent>
								<DialogContentText>
									<FormattedMessage
										id="schedule.unsubscribe.text"
										defaultMessage="To unsubscribe from notifications, please enter your phone
										number here"
									/>
								</DialogContentText>
								<span className="text-error"></span>
								<TextField
									autoFocus
									margin="dense"
									id="phone-number"
									label={
										<FormattedMessage
											id="schedule.unsubscribe.phoneNumber"
											defaultMessage="Phone Number"
										/>
									}
									type="tel"
									//   disabled={showOtpBox}
									value={mobileNum}
									onChange={(event) => {
										const regex = /^[0-9]*$/;
										if (
											event.target.value === "" ||
											regex.test(event.target.value)
										) {
											setMobileNum(event.target.value);
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
							</DialogContent>
							<DialogActions>
								<Button onClick={handleClose} color="secondary">
									<FormattedMessage
										id="schedule.unsubscribe.cancelBtn"
										defaultMessage="Cancel"
									/>
								</Button>
								<Button onClick={getUnSubscribe} color="info">
									{/* onClick={props.handleClose} */}
									<FormattedMessage
										id="schedule.unsubscribe.unSubBtn"
										defaultMessage="Unsubscribe"
									/>
								</Button>
							</DialogActions>
						</div>
					</div>
				</div>
			</Container>
		</Grid>
	);
};
export default Unsubscribe;
