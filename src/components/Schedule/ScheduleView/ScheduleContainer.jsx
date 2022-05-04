import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AlertDialog from "../../Alert/AlertDialog";

// let statusCode = ""

const ScheduleContainer = (props) => {
	const [subscribed, setSubscribed] = useState();
	const myRef = useRef(null);
    console.log("-----props-------",props);
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

 const subscribeBtn = 	<Button
							variant="outlined"
							startIcon={<NotificationsActiveIcon />}
							size="large"
							onClick={handleClickOpen}
							color="success"
						>
						Subscribe To This Group
						</Button>;

const subscribedBtn = 	<Button
							variant="outlined"
							startIcon={<NotificationsActiveIcon />}
							size="large"
							onClick={handleClickOpen}
							color="success"
						>
						Subscribed
						</Button> 



	return (
		<>
			<AlertDialog
				open={open}
				handleClose={handleClose}
				groupName={props.groupName}
				areaGroup={props.AreaGroup}
			/>
			<header className="header-center py-4 bg-dark" ref={myRef}>
				<div className="container my-2">
					<div className="row mt-0 mb-4">
						<div className="col-12 col-md-6 text-center text-md-start">
							<h2 className="fw-bolder">Power-Cut Schedule</h2>
						</div>
						<div className="col-12 col-md-6 text-center text-md-end">
							{/* {subscribeBtn} */}
							{localStorage.getItem("status")?subscribedBtn:subscribeBtn}
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
