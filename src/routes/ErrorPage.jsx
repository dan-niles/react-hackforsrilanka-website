import AnimatedPage from "../components/AnimatedPage/AnimatedPage";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { FormattedMessage } from "react-intl";

const ErrorPage = () => {
	const appTheme = useTheme();
	const navigate = useNavigate();
	const handleGoHome = () => {
		navigate({
			pathname: "/",
		});
	};

	return (
		<AnimatedPage>
			<header className="py-5 h-100">
				<div className="container px-5">
					<div className="row justify-content-center">
						<div className="col-lg-8 col-xxl-6">
							<div className="text-center my-5">
								<h1 className="fw-bolder mb-3">
									Page not found
								</h1>
							</div>
						</div>
						<div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
									<Button
										className={`${
											appTheme.palette.mode === "dark" ? "btn-warning" : ""
										} text-capitalize text-lowercase fw-bold fs-5`}
										variant="contained"
										size="large"
										onClick={handleGoHome}
										color={
											appTheme.palette.mode === "dark" ? "warning" : "error"
										}
									>
										<FormattedMessage
											id="nav.home"
											defaultMessage="Home"
										/>
									</Button>
								</div>
					</div>
				</div>
			</header>
		</AnimatedPage>
	);
};

export default ErrorPage;
