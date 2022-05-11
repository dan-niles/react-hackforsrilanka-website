import { useTheme } from "@mui/material/styles";
import { FormattedMessage } from "react-intl";

const FooterContainer = (props) => {
	const appTheme = useTheme();

	return (
		<footer
			className={`${
				appTheme.palette.mode === "dark" ? "bg-dark" : ""
			} py-3 mt-auto`}
		>
			<div className="container px-5">
				<div className="row align-items-center justify-content-between flex-column flex-lg-row">
					<div className="col-auto">
						<div className="small m-0">
							<FormattedMessage
								id="footer.copyright"
								defaultMessage="Copyright"
							/>{" "}
							&copy;{" "}
							<a
								className={`${
									appTheme.palette.mode === "dark" ? "text-white" : "text-dark"
								} text-decoration-none`}
								target="_blank"
								href="https://codefortheglobe.org"
							>
								Code for the Globe
							</a>{" "}
							2022
						</div>
					</div>
					<div className="col-auto">{props.children}</div>
				</div>
			</div>
		</footer>
	);
};

export default FooterContainer;
