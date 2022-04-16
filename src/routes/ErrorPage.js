import AnimatedPage from "../components/AnimatedPage/AnimatedPage";

const ErrorPage = () => {
	return (
		<AnimatedPage>
			<header className="py-5 h-100">
				<div className="container px-5">
					<div className="row justify-content-center">
						<div className="col-lg-8 col-xxl-6">
							<div className="text-center my-5">
								<h1 className="fw-bolder text-white text-white mb-3">
									Page not found
								</h1>
							</div>
						</div>
					</div>
				</div>
			</header>
		</AnimatedPage>
	);
};

export default ErrorPage;
