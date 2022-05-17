import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import MyLocationIcon from "@mui/icons-material/MyLocation";

import { FormattedMessage } from "react-intl";
import { useTheme } from "@mui/material/styles";

const FormWindow = (props) => {
	const appTheme = useTheme();

	return (
		<div
			className="container"
			style={{
				display: "flex",
				position: "absolute",
				zIndex: 99999,
				alignSelf: "center",
				alignItems: "center",
				height: "100vh",
				pointerEvents: "none",
			}}
		>
			<div
				className="mx-0 mx-lg-4 col-12 col-lg-3"
				style={{
					position: "absolute",
					zIndex: 99999,
				}}
			>
				<div
					className="card"
					style={{
						borderRadius: "1.5em",
						backgroundColor:
							appTheme.palette.mode === "dark"
								? "rgb(0 0 0 / 90%)"
								: "rgb(255 255 255 / 90%)",
						pointerEvents: "all",
					}}
				>
					<div
						className="card-header py-3"
						style={{ borderBottom: "1px solid #57575761" }}
					>
						<h2 className="fw-bolder text-center mb-0">
							<FormattedMessage
								id="find-my-group.title"
								defaultMessage="Find My Group"
							/>
						</h2>
					</div>
					<div className="card-body mx-4 my-3">
						<p className="fw-light text-white-50 text-center">
							<FormattedMessage
								id="find-my-group.subTitle"
								defaultMessage="Click the button below to use your current location and find your CEB group"
							/>
						</p>
						<Stack
							direction="column"
							justifyContent="center"
							alignItems="center"
						>
							<Button
								className="mb-4"
								onClick={props.getLocation}
								variant="outlined"
								color={appTheme.palette.mode === "dark" ? "warning" : "error"}
								startIcon={<MyLocationIcon />}
								size="large"
							>
								<FormattedMessage
									id="find-my-group.locateBtn"
									defaultMessage="Use My Location"
								/>
							</Button>
							{/* <Stack
								spacing={2}
								sx={{
									mx: 2,
									my: 3,
								}}
								direction="row"
							>
								<TextField
									label="Latitude"
									variant="outlined"
									value={props.latitude}
									InputProps={{
										readOnly: true,
									}}
								/>
								<TextField
									label="Longitude"
									variant="outlined"
									value={props.longitude}
									InputProps={{
										readOnly: true,
									}}
								/>
							</Stack> */}
							{props.isLoading && <CircularProgress />}
							{!props.isLoading && props.groupList.length === 1 && (
								<p className="font-light mt-1 mb-2">
									<FormattedMessage
										id="find-my-group.formText1"
										defaultMessage="Group:"
									/>
								</p>
							)}
							{!props.isLoading && props.groupList.length > 1 && (
								<p className="font-light mt-1 mb-2">
									<FormattedMessage
										id="find-my-group.formText2"
										defaultMessage="Possible Groups:"
									/>
								</p>
							)}
							<Stack spacing={1.5} direction="row">
								{!props.isLoading &&
									props.groupList?.map((grp, idx) => {
										return (
											<a
												href={`https://www.ekata.lk/schedule?group=${grp}`}
												target="_blank"
												key={idx}
												rel="noreferrer"
											>
												<Avatar
													sx={{
														backgroundColor:
															appTheme.palette.mode === "dark"
																? "#ffffff"
																: "#000000",
													}}
												>
													{grp}
												</Avatar>
											</a>
										);
									})}
							</Stack>
						</Stack>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FormWindow;
