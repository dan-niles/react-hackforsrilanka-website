const FooterContainer = (props) => {
	return (
		<footer className="bg-dark py-4 mt-auto">
			<div className="container px-5">
				<div className="row align-items-center justify-content-between flex-column flex-sm-row">
					<div className="col-auto">
						<div className="small m-0 text-white">
							Copyright &copy; Hack For Sri Lanka 2022
						</div>
					</div>
					<div className="col-auto">{props.children}</div>
				</div>
			</div>
		</footer>
	);
};

export default FooterContainer;
