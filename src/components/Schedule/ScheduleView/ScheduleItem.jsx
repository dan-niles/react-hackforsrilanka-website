const ScheduleItem = (props) => {
	const startPeriod = new Date(props.starting_period);
	const endPeriod = new Date(props.ending_period);

	const [startTime1, startTime2] = startPeriod
		.toLocaleTimeString("en", {
			timeStyle: "short",
			hour12: true,
			timeZone: "UTC",
		})
		.split(" ");
	const [endTime1, endTime2] = endPeriod
		.toLocaleTimeString("en", {
			timeStyle: "short",
			hour12: true,
			timeZone: "UTC",
		})
		.split(" ");

	const hourDiff = Math.abs(startPeriod - endPeriod) / 36e5;

	return (
		<li className="bg-light text-light border-1 list-group-item d-flex justify-content-between align-items-center py-3 my-2">
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

			<span className="badge bg-secondary">{hourDiff} hrs</span>
		</li>
	);
};

export default ScheduleItem;
