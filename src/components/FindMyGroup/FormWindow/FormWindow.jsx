import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import MyLocationIcon from "@mui/icons-material/MyLocation";

import { FormattedMessage } from "react-intl";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const FormWindow = (props) => {
	const appTheme = useTheme();
	const matches = useMediaQuery(appTheme.breakpoints.up("md"));

	return (
		<div
			className="container my-3 my-lg-0"
			style={{
				display: "flex",
				position: matches ? "absolute" : "",
				zIndex: matches ? 99999 : "",
				alignSelf: "center",
				alignItems: "center",
				height: matches ? "100vh" : "",
				pointerEvents: "none",
			}}
		>
			<div className="mx-0 mx-lg-4 col-12 col-lg-3">
				<div
					className="card"
					style={{
						borderRadius: "1.5em",
						backgroundColor:
							appTheme.palette.mode === "dark"
								? "rgb(23 24 24 / 95%)"
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
					<div className="card-body mx-4 my-3 text-center">
						<p className="fw-light text-center">
							<FormattedMessage
								id="find-my-group.subTitle"
								defaultMessage="Click the button below to use your current location or click on the map and find your CEB group"
							/>
						</p>
						<p
							className="fw-light text-white-50 text-center lh-2"
							style={{ fontSize: "0.8em" }}
						>
							*The Identified group may not be accurate if using a PC/desktop
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
							{props.isLoading && <CircularProgress />}
							{!props.isLoading &&
								!props.hideText &&
								props.groupList.length === 1 && (
									<p className="font-light mt-1 mb-2">
										<FormattedMessage
											id="find-my-group.formText1"
											defaultMessage="Group:"
										/>
									</p>
								)}
							{!props.isLoading &&
								!props.hideText &&
								props.groupList.length > 1 && (
									<p className="font-light mt-1 mb-2">
										<FormattedMessage
											id="find-my-group.formText2"
											defaultMessage="Possible Groups:"
										/>
									</p>
								)}
							{!props.isLoading &&
								!props.hideText &&
								props.groupList.length === 0 && (
									<p className="font-light mt-1 mb-2 text-center">
										<FormattedMessage
											id="find-my-group.formText3"
											defaultMessage="Group data currently unavailable for this location."
										/>
									</p>
								)}
							<Stack spacing={1.5} direction="row">
								{!props.isLoading &&
									!props.hideText &&
									props.groupList?.map((grp, idx) => {
										return (
											<a
												href={`./schedule?group=${grp}`}
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
							{!props.isLoading &&
								!props.hideText &&
								props.groupList.length > 0 && (
									<p
										className="fw-light mt-2 text-white-50 text-center lh-2"
										style={{ fontSize: "0.8em" }}
									>
										Click on a group letter to view the power-cut schedule
									</p>
								)}
						</Stack>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FormWindow;
