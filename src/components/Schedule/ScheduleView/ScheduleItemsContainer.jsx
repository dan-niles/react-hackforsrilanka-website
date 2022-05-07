import { format } from "date-fns";
import { enUS } from "date-fns/locale";

import Button from "@mui/material/Button";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ShareIcon from "@mui/icons-material/Share";

import { useTheme } from "@mui/material/styles";

const ScheduleItemsContainer = (props) => {
	const appTheme = useTheme();

	const dateText = props.date
		? format(props.date, "dd MMM yyyy", {
				locale: enUS,
		  })
		: "None Selected";

	const dayText = props.date
		? props.date.toLocaleString("en-US", {
				weekday: "long",
		  })
		: "";

	let getGroupScheduleBadge = (
		<span
			className={`badge ${
				appTheme.palette.mode === "dark"
					? "bg-warning text-dark"
					: "bg-danger text-light"
			}`}
		>
			{props.groupName}
		</span>
	);

	let getAreaSheduleSelectBadge = (
		<select
			style={{ border: 0 }}
			className={`badge ${
				appTheme.palette.mode === "dark"
					? "bg-warning text-dark"
					: "bg-danger text-light"
			}`}
			onChange={(event) => {
				props.setAreaGroup(event.target.value);
			}}
		>
			{props.groupList.map((item, index) => {
				return (
					<option key={index} value={item}>
						{item}
					</option>
				);
			})}
		</select>
	);

	const shareClickHandler = async () => {
		const title = `${document.title} - Power Cut Schedule for Group ${props.groupName}`;
		const text = "Subscribe to receive free text notifications!";
		const url = window.location.href;
		if (navigator.share !== undefined) {
			await navigator
				.share({
					title,
					text,
					url,
				})
				.then(() => {})
				.catch((err) => console.error(err));
		} else {
			window.location = `mailto:?subject=${title}&body=${text}%0A${url}`;
		}
	};

	return (
		<div className="col-lg-6 col-12 d-flex pa-md order-lg-2">
			<div className="card border-0 mt-0 flex-fill">
				<div className="card-header">
					<div className="row">
						<div className="col d-flex align-items-center">
							<div>
								<h4 className="schedule-date mb-0">{dateText}</h4>
								<span className="schedule-day text-muted">{dayText}</span>
							</div>
						</div>
						<div className="col">
							<div className="text-end">
								Group
								<h3 className="d-inlines">
									{props.district
										? getAreaSheduleSelectBadge
										: getGroupScheduleBadge}
								</h3>
							</div>
						</div>
					</div>
				</div>
				<div
					className="card-body px-3 py-3"
					style={{ height: "45vh", overflow: "auto" }}
				>
					{props.children.length > 0 ? (
						<ul className="schedule-list list-group my-3 px-0 px-md-5">
							{props.children}
						</ul>
					) : (
						<div className="row h-100">
							<div className="d-flex justify-content-center align-items-center flex-column">
								<p className="text-center">
									Schedule not published yet
									<br />
									<span className="text-muted">
										Come back later or subcribe to receive a notification
									</span>
								</p>
								<Button
									variant="outlined"
									startIcon={<NotificationsActiveIcon />}
									size="large"
									onClick={props.handleClickOpen}
									color="secondary"
								>
									Subscribe
								</Button>
							</div>
						</div>
					)}
				</div>
				<div className="card-footer ">
					<div className="row">
						<div className="col d-flex align-items-center">
							<div>
								<span className="text-muted"></span>
							</div>
						</div>
						<div className="col">
							<div className="text-end">
								<h5 className="d-inline">
									<Button
										variant="outlined"
										startIcon={<ShareIcon />}
										size="small"
										color="success"
										onClick={shareClickHandler}
									>
										Share
									</Button>
								</h5>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ScheduleItemsContainer;
