const getTimeDiff = (start, end) => {
	let diffMs = end - start; // milliseconds between now & Christmas
	let diffDays = Math.floor(diffMs / 86400000); // days
	let diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
	let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
	let hrStr = "hrs";
	if (diffHrs == 1) hrStr = "hr";
	if (diffMins == 0) return `${diffHrs} ${hrStr}`;
	else return `${diffHrs} ${hrStr} ${diffMins} mins`;
};

const ScheduleItem = (props) => {
	const startPeriod = new Date(props.starting_period);
	const endPeriod = new Date(props.ending_period);

	const [startTime1, startTime2] = startPeriod
		.toLocaleTimeString("en", {
			timeStyle: "short",
			hour12: true,
			timeZone: "Asia/Colombo",
		})
		.split(" ");
	const [endTime1, endTime2] = endPeriod
		.toLocaleTimeString("en", {
			timeStyle: "short",
			hour12: true,
			timeZone: "Asia/Colombo",
		})
		.split(" ");

	const minDiff = getTimeDiff(startPeriod, endPeriod);

	return (
		<li className="border-1 list-group-item d-flex justify-content-between align-items-center py-3 my-2">
			<div>
				<div className="d-inline">
					<span className="fs-5">{startTime1}</span>
					<span className="fs-6 text-lowercase fw-light"> {startTime2}</span>
				</div>
				<span>{" - "}</span>
				<div className="d-inline">
					<span className="fs-5">{endTime1}</span>
					<span className="fs-6 text-lowercase fw-light"> {endTime2}</span>
				</div>
			</div>

			<span className="badge bg-secondary">{minDiff}</span>
		</li>
	);
};

export default ScheduleItem;
