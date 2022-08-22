import { useTheme } from "@mui/material/styles"
import { FormattedMessage } from "react-intl"
import { useLocation } from "react-router-dom"
import useMediaQuery from "@mui/material/useMediaQuery"

import PageNames from "../../routes/PageNames"

const FooterContainer = (props) => {
	const appTheme = useTheme();
	const matches = useMediaQuery(appTheme.breakpoints.up("md"));
	const location = useLocation();
	let currentPageName = location.pathname.split("/").pop()

	return (
		<footer
			className={`${
				appTheme.palette.mode === "dark" ? "bg-dark" : "bg-white"
			} py-3 mt-auto`}
			style={{
				position:
					currentPageName === PageNames.slug(PageNames.FIND_MY_GROUP) && matches
						? "absolute"
						: "static",
				zIndex: currentPageName === PageNames.slug(PageNames.FIND_MY_GROUP) && matches ? 9999 : "",
				bottom: 0,
				width: "100%",
			}}
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
