import React, { useRef } from "react";
import Button from "@mui/material/Button";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AlertDialog from "../../Alert/AlertDialog";

const ScheduleContainer = (props) => {
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
		<>
			<AlertDialog
				open={open}
				handleClose={handleClose}
				groupName={props.groupName}
			/>
			<header className="header-center py-4 bg-dark" ref={myRef}>
				<div className="container my-2">
					<div className="row mt-0 mb-4">
						<div className="col-12 col-md-6 text-center text-md-start">
							<h2 className="fw-bolder">Power-Cut Schedule</h2>
						</div>
						<div className="col-12 col-md-6 text-center text-md-end">
							<Button
								variant="outlined"
								startIcon={<NotificationsActiveIcon />}
								size="large"
								onClick={handleClickOpen}
								color="success"
							>
								Subscribe To This Group
							</Button>
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
		</>
	);
};

export default ScheduleContainer;
