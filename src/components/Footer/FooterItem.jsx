import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LangContext from "../../contexts/lang-context";
import LangRoutes from "../../lang/LangRoutes";

import { useTheme } from "@mui/material/styles";

const FooterItem = (props) => {
	const langContext = useContext(LangContext);
	const appTheme = useTheme();
	const location = useLocation();
	const navigate = useNavigate();

	const splittedPath = location.pathname.split("/");
	splittedPath[1] = props.langRoute
	const itemPath = splittedPath.join("/")
	const itemLocale = LangRoutes.getLocale(props.langRoute)

	const handleClick = (e) => {
		e.preventDefault()
		navigate({
			pathname: itemPath,
		})
	}

	return (
		<>
			<a
				className={`${
					appTheme.palette.mode === "dark" ? "link-light" : "link-dark"
				} small ${
					langContext.locale !== itemLocale ? "text-decoration-underline" : ""
				}`}
				href={itemPath}
				onClick={handleClick}
			>
				{LangRoutes.getTranslatedName(props.langRoute)}
			</a>
			{props.lastItem === true ? (
				""
			) : (
				<span
					className={`${
						appTheme.palette.mode === "dark" ? "text-white" : "text-dark"
					} mx-3`}
				>
					&middot;
				</span>
			)}
		</>
	);
};

export default FooterItem;
