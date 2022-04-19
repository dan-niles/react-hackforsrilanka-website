import React, { useEffect, useState } from "react";
import AnimatedPage from "../components/AnimatedPage/AnimatedPage";

import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

const Home = () => {
	// Fetch Group Names
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

	// Form inputs
	const [groupSelect, setGroupSelect] = useState("");
	const handleGroupSelectChange = (event) => {
		setGroupSelect(event.target.value);
	};

	const [districtSelect, setDistrictSelect] = useState("");
	const handleDistrictSelectChange = (event) => {
		setDistrictSelect(event.target.value);
	};

	const [areaSelect, setAreaSelect] = useState("");
	const handleAreaSelectChange = (event) => {
		setAreaSelect(event.target.value);
	};

	return (
		<AnimatedPage>
			<header className="pt-0 pb-2">
				<div className="container px-5">
					<div className="row gx-5 align-items-center justify-content-center">
						<div className="col-lg-8 col-xl-7 col-xxl-6">
							<div className="my-5 text-center text-xl-start">
								<h1 className="display-5 fw-bolder text-white mb-2">
									Find your power cut schedule!
								</h1>
								<div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
									<a
										className="btn btn-warning btn-lg px-4 fw-bold"
										href="#get-started"
									>
										Get Started
									</a>
								</div>
							</div>
						</div>
						<div className="col-xl-5 col-xxl-6 d-none1 d-xl-block text-center">
							<img
								className="img-fluid rounded-3 my-3"
								src={require("../assets/img/lightbulb.jpeg")}
								alt="..."
							/>
						</div>
					</div>
				</div>
			</header>

			<header className="bg-dark py-5" id="get-started">
				<div className="container px-3 px-md-5">
					<div className="text-center mb-5">
						<h1 className="fw-bolder">Select your group or area below.</h1>
					</div>
					<ToggleButtonGroup color="warning" exclusive>
						<ToggleButton value="web" selected={true}>
							Search by Group
						</ToggleButton>
						<ToggleButton value="android">Search by Location</ToggleButton>
					</ToggleButtonGroup>
					<div className="row gx-5 align-items-center justify-content-center">
						<div className="col-lg-6 col-xl-6 col-xxl-6">
							<div className="card p-md-5 p-4">
								<form action="schedule" method="get">
									<div className="form-row">
										<div className="form-group col-12">
											<h3 className="fw-bolder mb-4">Search by Group</h3>
											<FormControl fullWidth>
												<InputLabel id="group-select">Select Group</InputLabel>
												<Select
													labelId="group-select-label"
													id="group-select"
													label="Select Group"
													value={groupSelect}
													onChange={handleGroupSelectChange}
													name="group"
												>
													{groups
														.filter((i) => i.length == 1)
														.map((group, index) => (
															<MenuItem value={group} key={index}>
																{group}
															</MenuItem>
														))}
												</Select>
											</FormControl>
										</div>
										<div className="form-group col-12 mt-4 text-center">
											{/* <Button color="warning" variant="contained">
												Search
											</Button> */}
											<button type="submit" className="btn btn-warning px-4">
												Search
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
						<div className="col-lg-6 col-xl-6 col-xxl-6">
							<div className="card mt-4 mt-lg-0 p-md-5 p-4">
								<form action="" method="post">
									<div className="form-row">
										<h3 className="fw-bolder mb-4">Search by Location</h3>
										<div className="form-group col-12">
											<FormControl fullWidth>
												<InputLabel id="district-select">
													Select your district
												</InputLabel>
												<Select
													labelId="district-select-label"
													id="district-select"
													label="Select District"
													value={districtSelect}
													onChange={handleDistrictSelectChange}
													name="district"
												>
													<MenuItem value="Colombo">Colombo</MenuItem>
												</Select>
											</FormControl>
										</div>
										<div className="form-group col-12 mt-3">
											<FormControl fullWidth>
												<InputLabel id="district-select">
													Select your area
												</InputLabel>
												<Select
													labelId="area-select-label"
													id="area-select"
													label="Select your area"
													value={areaSelect}
													onChange={handleAreaSelectChange}
													name="area"
												>
													<MenuItem value="Mount Lavinia">
														Mount Lavinia
													</MenuItem>
												</Select>
											</FormControl>
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
