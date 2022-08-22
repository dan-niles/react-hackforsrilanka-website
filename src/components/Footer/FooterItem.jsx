import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LangContext from "../../contexts/lang-context";

import { useTheme } from "@mui/material/styles";

const FooterItem = (props) => {
	const langContext = useContext(LangContext);
	const appTheme = useTheme();
	const location = useLocation();
	const navigate = useNavigate();

	const splittedPath = location.pathname.split("/");
	splittedPath[1] = langContext.getLocalePath(props.locale)
	const newPath = splittedPath.join("/")

	const handleClick = (e) => {
		e.preventDefault()
		navigate({
			pathname: newPath,
		})
		langContext.selectLanguage(props.locale);
	}

	return (
		<>
			<a
				className={`${
					appTheme.palette.mode === "dark" ? "link-light" : "link-dark"
				} small ${
					langContext.locale !== props.locale ? "text-decoration-underline" : ""
				}`}
				href={newPath}
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
					} mx-3`}
				>
					&middot;
				</span>
			)}
		</>
	);
};

export default FooterItem;
