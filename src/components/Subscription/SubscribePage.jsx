import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import SubscribeDialog from "./SubscribeDialog";

const SubscribePage = () => {
	const [mobileNum, setMobileNum] = useState();
	const [error, setError] = useState();
	const [open, setOpen] = useState(true);
	const navigate = useNavigate();

	const [unSub, setUnSub] = useState(false);

	const handleClose = () => {
		setOpen(false);
		navigate("/");
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
						<SubscribeDialog
							isStandalonePage={true}
							unSub={unSub}
							open={open}
							handleClose={handleClose}
						/>
						</div>
					</div>
				</div>
			</Container>
		</Grid>
	);
};

export default SubscribePage;
