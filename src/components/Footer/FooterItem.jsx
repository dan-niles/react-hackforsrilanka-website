import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LangContext from "../../contexts/lang-context";

import { useTheme } from "@mui/material/styles";

const FooterItem = (props) => {
	const langContext = useContext(LangContext);
	const appTheme = useTheme();
	const location = useLocation();
	const navigate = useNavigate();

	const handleClick = (e) => {
		e.preventDefault()
		const splittedPath = location.pathname.split("/");
		splittedPath[1] = langContext.getLocalePath(props.locale)
		const newPath = splittedPath.join("/")
		navigate({
			pathname: newPath,
		})
		// TODO: Research why the following line is needed? 
		// newPath contains language and should be set from there by the route
		langContext.selectLanguage(props.locale);
	};

	return (
		<>
			<a
				className={`${
					appTheme.palette.mode === "dark" ? "link-light" : "link-dark"
				} small ${
					langContext.locale === props.locale ? "fw-bolder" : "text-decoration-underline"
				}`}
				href={props.href}
				onClick={handleClick}
			>
				{props.label}
			</a>
			{props.lastItem === true ? (
				""
			) : (
				<span
					className={`${
						appTheme.palette.mode === "dark" ? "text-white" : "text-dark"
					} mx-1`}
				>
					&middot;
				</span>
			)}
		</>
	);
};

export default FooterItem;
