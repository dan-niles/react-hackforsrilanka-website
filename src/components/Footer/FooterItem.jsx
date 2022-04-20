import { Link } from "react-router-dom";

const FooterItem = (props) => {
	return (
		<>
			<Link className="link-light small" to={props.href}>
				{props.label}
			</Link>
			{props.lastItem == true ? (
				""
			) : (
				<span className="text-white mx-1">&middot;</span>
			)}
		</>
	);
};

export default FooterItem;
