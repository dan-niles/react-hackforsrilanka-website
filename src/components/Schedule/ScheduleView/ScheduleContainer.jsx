import React, { useRef } from "react";
import Button from "@mui/material/Button";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useTheme } from "@mui/material/styles";

import { FormattedMessage } from "react-intl";

const ScheduleContainer = (props) => {
	const appTheme = useTheme();
	const myRef = useRef(null);
	if (myRef.current != null) {
		myRef.current.scrollIntoView();
	}

	return (
		<header
			className={`header-centers py-1 py-md-4 ${
				appTheme.palette.mode === "dark" ? "" : ""
			}`}
			ref={myRef}
		>
			<div className="container my-3">
				<div className="row mt-0 mb-3 px-1 px-md-0 align-items-center">
					<div className="col-12 col-md-6 text-center text-lg-start">
						<h2 className="fw-bolder mb-2 mb-lg-0">
							<FormattedMessage
								id="schedule.view.title"
								defaultMessage="Power-Cut Schedule"
							/>
						</h2>
					</div>
					<div className="col-12 col-md-6 text-center text-lg-end">
						{/* Desktop Button */}
						<Button
							variant="outlined"
							startIcon={<NotificationsActiveIcon />}
							size="large"
							onClick={props.handleClickOpen}
							color="info"
							className="fw-bold d-none d-lg-inline"
						>
							<FormattedMessage
								id="schedule.view.subButton"
								defaultMessage="Subscribe for Notifications"
							/>
						</Button>
						{/* Mobile button */}
						<Button
							variant="outlined"
							startIcon={<NotificationsActiveIcon />}
							size="large"
							onClick={props.handleClickOpen}
							color="info"
							className="fw-bold d-inline d-lg-none"
						>
							<FormattedMessage
								id="schedule.view.subButton"
								defaultMessage="Subscribe for Notifications"
							/>
						</Button>
					</div>
				</div>

				<div className="row mt-0 mt-md-4 align-items-center justify-content-center">
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
