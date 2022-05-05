import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useTheme } from "@mui/material/styles";

// let statusCode = ""

const ScheduleContainer = (props) => {
	const [subscribed, setSubscribed] = useState();
	const appTheme = useTheme();
	const myRef = useRef(null);
	if (myRef.current != null) {
		myRef.current.scrollIntoView();
	}

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<header
			className={`header-center py-1 py-md-4 ${
				appTheme.palette.mode === "dark" ? "" : ""
			}`}
			ref={myRef}
		>
			<div className="container my-2">
				<div className="row mt-0 mb-2 px-1 px-md-0 align-items-center">
					<div className="col-9 col-md-6 text-start">
						<h2 className="fw-bolder mb-0">Power-Cut Schedule</h2>
					</div>
					<div className="col-3 col-md-6 text-end">
						{/* Desktop Button */}
						<Button
							variant="outlined"
							startIcon={<NotificationsActiveIcon />}
							size="large"
							onClick={props.handleClickOpen}
							color="info"
							className="fw-bold d-none d-md-inline"
						>
							Subscribe for Notifications
						</Button>
						{/* Mobile button */}
						<Button
							variant="outlined"
							startIcon={<NotificationsActiveIcon />}
							size="large"
							onClick={props.handleClickOpen}
							color="info"
							className="subsribe-button fw-bold d-inline d-md-none"
						></Button>
					</div>
				</div>

				<div className="row align-items-center justify-content-center">
					<div className="col-lg-12 col-xl-12 col-xxl-12">
						<div className="card">
							<div className="container px-1">
								<div className="row">{props.children}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default ScheduleContainer;
