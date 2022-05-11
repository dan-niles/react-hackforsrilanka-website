import { useContext } from "react";
import LangContext from "../../contexts/lang-context";

import { useTheme } from "@mui/material/styles";

const FooterItem = (props) => {
	const langContext = useContext(LangContext);
	const appTheme = useTheme();

	const handleClick = (e) => {
		e.preventDefault();
		langContext.selectLanguage(props.locale);
	};

	return (
		<>
			<a
				className={`${
					appTheme.palette.mode === "dark" ? "link-light" : "link-dark"
				} small`}
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
