import AnimatedPage from "../components/AnimatedPage/AnimatedPage";

const About = () => {
	return (
		<AnimatedPage>
			<header className="py-5">
				<div className="container px-5">
					<div className="row justify-content-center">
						<div className="col-lg-8 col-xxl-6">
							<div className="text-center my-5">
								<h1 className="fw-bolder text-white text-white mb-3">
									Hack For The Globe
								</h1>
								<p className="lead fw-normal text-white-50 mb-4">
									We are a team of data scientists and computer programmers with
									a vision to democratize data. We have a deep passion for
									harnessing technology and data to help people.
								</p>
								<a
									className="btn btn-warning btn-lg"
									target="_blank"
									href="https://change-via-data.wixsite.com/hack-for-the-globe/team"
								>
									Read our story
								</a>
							</div>
						</div>
					</div>
				</div>
			</header>
			{/* <!-- About section one--> */}
			<section className="py-5 bg-light" id="scroll-target">
				<div className="container px-5 my-5">
					<div className="row gx-5 align-items-center">
						<div className="col-lg-6">
							<img
								className="img-fluid rounded-3 my-5"
								src={require("../img/protest.jpeg")}
								alt="..."
							/>
						</div>
						<div className="col-lg-6">
							<h2 className="fw-bolder text-white">
								What's happening in Sri Lanka?
							</h2>
							<p className="lead fw-normal text-white-50 mb-0">
								Sri Lanka is facing its worst economic crisis in more than 100
								years. Soaring inflation and a rapidly-depreciating local
								currency mean that the country can no longer afford basic goods.
								A lack of foreign money has led to power cuts that last 10 or
								more hours every day. Food shortages are causing hours-long
								lines at grocery stores as political unrest is mounting.
							</p>
						</div>
					</div>
				</div>
			</section>
			{/* <!-- About section two--> */}
			<section className="py-5">
				<div className="container px-5 my-5">
					<div className="row gx-5 align-items-center">
						<div className="col-lg-6">
							<h2 className="fw-bolder text-white ">Our Goal</h2>
							<p className="lead fw-normal text-white-50 mb-0">
								Sri Lankan citizens need access to important data that impacts
								their lives. Many of these data are publicly available but
								difficult to access. We want to ensure that those living in Sri
								Lanka have access to accurate and essential data, starting with
								real time power outage upates.
							</p>
						</div>
						<div className="col-lg-6">
							<img
								className="img-fluid rounded-3 my-5"
								src={require("../img/home.jpeg")}
								alt="..."
							/>
						</div>
					</div>
				</div>
			</section>
			{/* <!-- Team members section--> */}
			<section className="py-5">
				<div className="container px-5 my-5">
					<div className="text-center">
						<h2 className="fw-bolder text-white">The Teams</h2>
						<p className="lead fw-normal text-white-50 mb-5">
							of Hack For Sri Lanka
						</p>
					</div>
					<div className="row gx-5 row-cols-1 row-cols-sm-2 row-cols-xl-4 justify-content-center">
						<div className="col mb-5 mb-5 mb-xl-0">
							<div className="text-center">
								<img
									className="img-fluid rounded-circle mb-4 px-4"
									src={require("../img/teams/spider.png")}
									alt="..."
								/>
								<h5 className="fw-bolder text-white">
									Scrapers - The Creepy Spiders
								</h5>
								<p className="fst-italic text-white-50">Jinal Shah</p>
								<p>
									Kun Guo
									<br />
									Danny Sallis
									<br />
									Selena Sun
									<br />
									Amanbir Singh
								</p>
							</div>
						</div>
						<div className="col mb-5 mb-5 mb-xl-0">
							<div className="text-center">
								<img
									className="img-fluid rounded-circle mb-4 px-4"
									src={require("../img/teams/db.png")}
									alt="..."
								/>
								<h5 className="fw-bolder text-white">
									API & DB - The Dispatchers
								</h5>
								<p className="fst-italic text-white-50">Jude Cooray</p>
								<p>
									Sanjeew Kanagaraj
									<br />
									Edgar Roerdink
									<br />
									Arjun Balasingam
									<br />
									Akhilesh Balasingam
								</p>
							</div>
						</div>
						<div className="col mb-5 mb-5 mb-sm-0">
							<div className="text-center">
								<img
									className="img-fluid rounded-circle mb-4 px-4"
									src={require("../img/teams/web.png")}
									alt="..."
								/>
								<h5 className="fw-bolder text-white">Web - Team Facade</h5>
								<p className="fst-italic text-white-50">Tharuka Kannaruka</p>
								<p>
									Dan Niles
									<br />
									Elizabeth Feldman
								</p>
							</div>
						</div>
					</div>

					<div className="row gx-5 row-cols-1 row-cols-sm-2 row-cols-xl-4 justify-content-center mt-4">
						<div className="col mb-5">
							<div className="text-center">
								<img
									className="img-fluid rounded-circle mb-4 px-4"
									src={require("../img/teams/bulb-illuminati.png")}
									alt="..."
								/>
								<h5 className="fw-bolder text-white">
									Lights off - The Illuminati
								</h5>
								<p className="fst-italic text-white-50">Rashid Al-Abr</p>
								<p>
									Panel Mukhopadhyay
									<br />
									Afifa Zuhair
									<br />
									Deveen Harischandra
									<br />
									Amanda Bakerlee
									<br />
									Pratheepa Jeganathan
								</p>
							</div>
						</div>
						<div className="col mb-5">
							<div className="text-center">
								<img
									className="img-fluid rounded-circle mb-4 px-4"
									src={require("../img/teams/brainstorm.png")}
									alt="..."
								/>
								<h5 className="fw-bolder text-white">
									Brainstorm - Slam Dunkers
								</h5>
								<p className="fst-italic text-white-50">
									Vandhana Krishnan, Ankur Pandey
								</p>
								<p>
									Emmy Thamkaison
									<br />
									Alex Godwin
									<br />
									Rashmi Tippalagama
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</AnimatedPage>
	);
};

export default About;
