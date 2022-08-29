const HomeSecondaryPanel = (props) => {
	return (
		<section>
			<div className="container px-5 px-md-5 my-0">
				<div className="row gx-5 row-cols-1 row-cols-sm-2 row-cols-xl-4 justify-content-center">
					{props.children}
				</div>
			</div>
		</section>
	);
};

export default HomeSecondaryPanel;
