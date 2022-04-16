import React from "react";
import { NavLink } from "react-router-dom";

const Navbaritem = (props) => {
	return (
		<li className="nav-item">
			<NavLink className="nav-link" to={props.href}>
				{props.label}
			</NavLink>
		</li>
	);
};

export default Navbaritem;
