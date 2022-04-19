const TeamItem = (props) => {
	return (
		<div className="col mb-5 mb-5 mb-xl-0">
			<div className="text-center">
				<img
					className="img-fluid team-img rounded-circle mb-4 px-4"
					src={require("../../../assets/img/" + props.img)}
					alt="..."
				/>
				<h6 className="fw-bolder text-white">{props.teamName}</h6>
				<p className="fst-italic text-white-50">{props.teamLeader}</p>
				<p>
					{props.teamMembers.map((m, i) => (
						<span key={i} className="d-block">
							{m}
						</span>
					))}
				</p>
			</div>
		</div>
	);
};

export default TeamItem;
