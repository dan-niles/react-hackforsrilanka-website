import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AnimatedPage from "../components/AnimatedPage/AnimatedPage";
import { motion } from "framer-motion";

import Button from "@mui/material/Button";

const Home = () => {
	const [imageLoading, setImageLoading] = useState(true);

	const imageLoaded = () => {
		setImageLoading(false);
	};

	return (
		<AnimatedPage>
			<header
				className="pt-0 pb-2"
				style={{
					background: `url("${require("../assets/img/bulb-bg.webp")}")`,
				}}
			>
				<div className="container px-5">
					<div className="row gx-5 align-items-center justify-content-center">
						<div className="col-lg-8 col-xl-7 col-xxl-6">
							<div className="my-5 text-center text-xl-start">
								<h1 className="display-5 fw-bolder text-white mb-2">
									Find your power cut schedule!
								</h1>
								<div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
									{/* <Link
										className="btn btn-warning btn-lg px-4 fw-bold"
										to="schedule"
									>
										Get Started
									</Link> */}
									<Button
										className="btn-warning text-capitalize text-lowercase fw-bold fs-5"
										component={Link}
										variant="contained"
										size="large"
										to="schedule"
									>
										Get Started
									</Button>
								</div>
							</div>
						</div>
						<div className="col-xl-5 col-xxl-6 d-none1 d-xl-block text-center">
							{/* <img
								className="img-fluid rounded-3 my-3"
								src={require("../assets/img/lightbulb.jpeg")}
								alt="..."
							/> */}
							<motion.img
								initial={{ opacity: 0 }}
								// style={{ height: imageLoading ? "6rem" : "auto" }}
								animate={{
									opacity: imageLoading ? 0 : 1,
								}}
								transition={{ opacity: { duration: 0.4 } }}
								onLoad={imageLoaded}
								width="90%"
								src={require("../assets/img/lightbulb.jpeg")}
							/>
						</div>
					</div>
				</div>
			</header>
		</AnimatedPage>
	);
};

export default Home;
