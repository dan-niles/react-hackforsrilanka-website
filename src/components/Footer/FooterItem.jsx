import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const FooterItem = (props) => {
	const appTheme = useTheme();

	return (
		<>
			<Link
				className={`${
					appTheme.palette.mode === "dark" ? "link-light" : "link-dark"
				} small`}
				to={props.href}
			>
				{props.label}
			</Link>
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
