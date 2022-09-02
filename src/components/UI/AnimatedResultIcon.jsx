import React from "react";

const AnimatedResultIcon = (props) => {

	return (
		<div className="svg-box">
			{props.type === "error" ? (
				<>
					<svg className="circular red-stroke">
						<circle className="path" cx="75" cy="75" r="50" fill="none" strokeWidth="5" strokeMiterlimit="10" />
					</svg>
					<svg className="cross red-stroke">
						<g transform="matrix(0.79961,8.65821e-32,8.39584e-32,0.79961,-502.652,-204.518)">
							<path className="first-line" d="M634.087,300.805L673.361,261.53" fill="none" />
						</g>
						<g transform="matrix(-1.28587e-16,-0.79961,0.79961,-1.28587e-16,-204.752,543.031)">
							<path className="second-line" d="M634.087,300.805L673.361,261.53" />
						</g>
					</svg>
				</>
			) : props.type === "warning" ? (
				<>
					<svg className="circular yellow-stroke">
						<circle className="path" cx="75" cy="75" r="50" fill="none" strokeWidth="5" strokeMiterlimit="10" />
					</svg>
					<svg className="alert-sign yellow-stroke">
						<g transform="matrix(1,0,0,1,-615.516,-257.346)">
							<g transform="matrix(0.56541,-0.56541,0.56541,0.56541,93.7153,495.69)">
								<path className="line" d="M634.087,300.805L673.361,261.53" fill="none" />
							</g>
							<g transform="matrix(2.27612,-2.46519e-32,0,2.27612,-792.339,-404.147)">
								<circle className="dot" cx="621.52" cy="316.126" r="1.318" />
							</g>
						</g>
					</svg>
				</>
			) : (
				<>
					<svg className="circular green-stroke">
						<circle className="path" cx="75" cy="75" r="50" fill="none" strokeWidth="5" strokeMiterlimit="10" />
					</svg>
					<svg className="checkmark green-stroke">
						<g transform="matrix(0.79961,8.65821e-32,8.39584e-32,0.79961,-489.57,-205.679)">
							<path className="checkmark__check" fill="none" d="M616.306,283.025L634.087,300.805L673.361,261.53" />
						</g>
					</svg>
				</>
			)}
		</div>
	);
};

export default AnimatedResultIcon;
