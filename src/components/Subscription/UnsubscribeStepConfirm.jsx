import React from "react";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Box } from "@mui/material";

import AnimatedResultIcon from "../UI/AnimatedResultIcon";
import DefaultedMessage from "../UI/DefaultedMessage";

const UnsubscribeStepConfirm = (props) => {
	return (
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
						<AnimatedResultIcon type="success"/>
						<Typography variant="h5" component="div" gutterBottom>
							<DefaultedMessage id={"schedule.unsubscribe.successText"}/>
						</Typography>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.handleClose} color="info">
					<DefaultedMessage id="schedule.unsubscribe.successButton"/>
				</Button>
			</DialogActions>
		</>
	);
};
export default UnsubscribeStepConfirm;
