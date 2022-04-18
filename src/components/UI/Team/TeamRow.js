const TeamRow = (props) => {
	return (
		<div className="row gx-5 row-cols-1 row-cols-sm-2 row-cols-xl-4 justify-content-center">
			{props.children}
		</div>
	);
};

export default TeamRow;
