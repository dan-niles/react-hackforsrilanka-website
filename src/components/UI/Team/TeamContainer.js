const TeamContainer = (props) => {
	return (
		<section className="pb-0 pb-md-5 pt-5 bg-light">
			<div className="container px-4 px-md-5 my-0 my-md-5">
				<div className="text-center">
					<h2 className="fw-bolder text-white mb-0">{props.title}</h2>
					<p className="lead fw-normal text-white-50 mb-5">{props.subTitle}</p>
				</div>
				{props.children}
			</div>
		</section>
	);
};

export default TeamContainer;
