import { format } from "date-fns";
import { enUS } from "date-fns/locale";

const ScheduleItemsContainer = (props) => {
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

	let scheduleOutput = (
		<div className="my-auto">
			<img
				className="error-img mx-auto d-block"
				src={require("../../assets/img/no-data.png")}
			/>
			<p className="text-center">No Data Found</p>
		</div>
	);

	return (
		<div className="col-sm-6 col-12 d-flex pa-sm order-md-2">
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
								Group{" "}
								<h3 className="d-inlines">
									<span className="badge bg-warning text-dark">
										{props.groupName}
									</span>
								</h3>
							</div>
						</div>
					</div>
				</div>
				<div className="card-body px-3 py-3">
					{props.children.length > 0 ? (
						<ul className="schedule-list list-group my-3 px-0 px-md-5">
							{props.children}
						</ul>
					) : (
						<div className="row h-100">
							<div className="d-flex justify-content-center align-items-center">
								<div>
									<img
										className="error-img mx-auto d-block"
										src={require("../../assets/img/no-data.png")}
									/>
									<p className="text-center">No Data Found</p>
								</div>
							</div>
						</div>
					)}
				</div>
				<div className="card-footer">
					<div className="row">
						<div className="col d-flex align-items-center">
							<div>
								<span className="text-muted">
									{props.children.length > 0 && "Total"}
								</span>
							</div>
						</div>
						<div className="col">
							<div className="text-end">
								<h5 className="d-inline">
									{props.children.length > 0 && (
										<span className="badge bg-success">
											{props.totalHrs} hrs
										</span>
									)}
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
