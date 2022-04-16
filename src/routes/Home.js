import React, { useEffect, useState } from "react";
import AnimatedPage from "../components/AnimatedPage/AnimatedPage";

const Home = () => {
	const [groups, setGroups] = useState([]);

	const fetchGroupNames = () => {
		fetch("https://hackforsrilanka-api.herokuapp.com/api/illuminati/groups")
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setGroups(data);
			});
	};

	useEffect(() => {
		fetchGroupNames();
	}, []);

	return (
		<AnimatedPage>
			<header className="bg-dark pt-0 pb-2">
				<div className="container px-5">
					<div className="row gx-5 align-items-center justify-content-center">
						<div className="col-lg-8 col-xl-7 col-xxl-6">
							<div className="my-5 text-center text-xl-start">
								<h1 className="display-5 fw-bolder text-white mb-2">
									Find your power cut schedule!
								</h1>
								<div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
									<a
										className="btn btn-warning btn-lg px-4"
										href="#get-started"
									>
										Get Started
									</a>
								</div>
							</div>
						</div>
						<div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
							<img
								className="img-fluid rounded-3 my-3"
								src={require("../img/lightbulb.jpeg")}
								alt="..."
							/>
						</div>
					</div>
				</div>
			</header>
			<header className="bg-dark py-5" id="get-started">
				<div className="container px-5">
					<div className="text-center mb-5">
						<h1 className="fw-bolder">Select your group area below.</h1>
					</div>
					<div className="row gx-5 align-items-center justify-content-center">
						<div className="col-lg-6 col-xl-6 col-xxl-6">
							<div className="card p-5">
								<form action="schedule" method="get">
									<div className="form-row">
										<div className="form-group col-12">
											<h3 className="fw-bolder">Search by Group</h3>
											<label className="text-white-50" htmlFor="">
												Select Group:{" "}
											</label>
											<select
												className="form-control form-control-lg text-center"
												name="group"
												id="group"
											>
												{groups.map((group, index) => (
													<option value={group} key={index}>
														{group}
													</option>
												))}
											</select>
										</div>
										<div className="form-group col-12 mt-4 text-center">
											<button type="submit" className="btn btn-warning px-4">
												Search
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
						<div className="col-lg-6 col-xl-6 col-xxl-6">
							<div className="card mt-4 mt-lg-0 p-5">
								<form action="" method="post">
									<div className="form-row">
										<h3 className="fw-bolder">Search by Location</h3>
										<div className="form-group col-12">
											<label className="text-white-50" htmlFor="">
												Select your district :{" "}
											</label>
											<select
												className="form-control form-control-lg text-center"
												name=""
												id=""
											>
												<option value="A">Colombo</option>
											</select>
										</div>
										<div className="form-group col-12 mt-3">
											<label className="text-white-50" htmlFor="">
												Select your area :{" "}
											</label>
											<select
												className="form-control form-control-lg text-center"
												name=""
												id=""
											>
												<option value="A">Mount Lavinia</option>
											</select>
										</div>
										<div className="form-group col-12 mt-4 text-center">
											<button className="btn btn-warning px-4" href="#features">
												Search
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</header>
		</AnimatedPage>
	);
};

export default Home;
