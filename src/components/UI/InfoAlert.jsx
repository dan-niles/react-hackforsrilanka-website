import React from "react";
import Button from "@mui/material/Button";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

import DefaultedMessage from "../UI/DefaultedMessage";

const InfoAlert = (props) => {
	const navigate = useNavigate();
	return (
		<Alert
			// variant="outlined"
			severity="info"
			action={
				<Button
					sx={{ lineHeight: "1.5em" }}
					size="small"
					variant="contained"
					onClick={() =>
						navigate({pathname: `${props.navigationPath}`})
					}
				>
					<DefaultedMessage id={props.buttonTextId}/>
				</Button>
			}
			sx={{ alignItems: "center" }}
		>
			<DefaultedMessage id={props.desc1TextId}/>
			<br />
			<DefaultedMessage id={props.desc2TextId}/>
		</Alert>
	);
};
export default InfoAlert;
