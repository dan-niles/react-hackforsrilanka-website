import React, { useRef } from "react";
import Button from "@mui/material/Button";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const ScheduleContainer = (props) => {
	const myRef = useRef(null);

	if (myRef.current != null) {
		myRef.current.scrollIntoView();
	}

	return (
		<header className="py-4 bg-dark" ref={myRef}>
			<div className="container my-3">
				{/* <div className="text-center mt-0 mb-4">
					<h2 className="fw-bolder">Power-Cut Schedule</h2>
				</div> */}
				<div className="row align-items-center justify-content-center">
					<div className="col-lg-12 col-xl-12 col-xxl-12">
						<div className="card">
							<div className="container px-1">
								<div className="row">{props.children}</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row text-center  mt-3">
					<div className="col-12">
						<Button
							variant="outlined"
							startIcon={<NotificationsActiveIcon />}
							size="large"
							// href="#"
							color="error"
						>
							Subscribe To This Group
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default ScheduleContainer;
