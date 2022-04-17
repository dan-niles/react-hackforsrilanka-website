const NavbarContainer = (props) => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark py-lg-4">
			<div className="container px-5">
				<a className="navbar-brand">
					{/* Websit Logo */}
					<img
						className="nav-logo"
						src={require("../../assets/img/logo.png")}
						alt="site logo"
					/>
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav ms-auto mb-2 mb-lg-0">{props.children}</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavbarContainer;
