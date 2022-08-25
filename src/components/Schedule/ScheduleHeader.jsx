import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import PageRoutes from "../../routes/PageRoutes"
import DefaultedMessage from "../UI/DefaultedMessage";

const ScheduleHeader = (props) => {
	const appTheme = useTheme();

	return (
		<header className="header-centers py-5">
			<div className="container px-3 px-md-5">
				<div className="text-center">
					<h1 className="fw-bolder py-10">
						<DefaultedMessage
							id="schedule.form.title"
						/>
					</h1>
					<p className="lead fw-normal text-white-50 mb-0 px-md-5">
						<DefaultedMessage
							id="schedule.form.subtitle"
						/>
						<Link to={`../${PageRoutes.slug(PageRoutes.FIND_MY_GROUP)}`} className={`${ 
								appTheme.palette.mode === "dark" ? "link-light" : "link-dark"
							} " text-decoration-underline" `}>
							<DefaultedMessage
								id="nav.find-my-group"
							/>
						</Link>
					</p>
				</div>
			</div>
		</header>
	)
};

export default ScheduleHeader;
