import { useTheme } from "@mui/material/styles";

const Header = (props) => {
	const appTheme = useTheme();

	return (
		<header
			className="py-5"
			style={{
				background: `url("${require("../../assets/img/" +
					props.bgImg)}")  50% 50% no-repeat`,
				backgroundPositionX: "center",
				backgroundPositionY: "center",
				backgroundRepeat: "no-repeat",
			}}
		>
			<div className="container px-5">
				<div className="row justify-content-center">
					<div className="col-lg-8 col-xxl-6">
						<div className="text-center my-5">
							<h1 className="fw-bolder mb-3">{props.title}</h1>
							<p className="lead fw-normal text-white-50 mb-4">
								{props.children}
							</p>
							<a
								className={`btn ${
									appTheme.palette.mode === "dark"
										? "btn-warning"
										: "btn-danger"
								} btn-lg fw-bold`}
								target={props.btn.target ? props.btn.target : ""}
								href={props.btn.href}
							>
								{props.btn.btnText}
							</a>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
