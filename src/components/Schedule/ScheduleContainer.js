const ScheduleContainer = (props) => {
	return (
		<header className="py-4">
			<div className="container">
				<div className="text-center mt-0 mb-4">
					<h2 className="fw-bolder">Power-Cut Schedule</h2>
				</div>
				<div className="row align-items-center justify-content-center">
					<div className="col-lg-12 col-xl-12 col-xxl-12">
						<div className="card">
							<div className="container px-1">
								<div className="row">{props.children}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default ScheduleContainer;
