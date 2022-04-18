const ContentSection = (props) => {
	return (
		<section className={`py-1 py-md-5 ${props.bg}`}>
			<div className="container px-4 px-md-5 my-0 my-md-5">
				<div className="row mb-4 gx-5 align-items-center">
					<div className={`col-lg-6 ${"order-md-2"}`}>
						<img
							className="img-fluid rounded-3 my-5"
							src={require("../../assets/img/" + props.img)}
							alt="..."
						/>
					</div>
					<div className={`col-lg-6 ${"order-md-1"}`}>
						<h2 className="fw-bolder text-white">{props.title}</h2>
						<p className="lead fw-normal text-white-50 mb-0">
							{props.children}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContentSection;
