import Header from "../components/UI/Header";
import ContentSection from "../components/UI/ContentSection";

import TeamContainer from "../components/UI/Team/TeamContainer";
import TeamRow from "../components/UI/Team/TeamRow";
import TeamItem from "../components/UI/Team/TeamItem";

import AnimatedPage from "../components/AnimatedPage/AnimatedPage";

const About = () => {
	return (
		<AnimatedPage>
			<Header
				title="Hack For The Globe"
				bgImg="globe-bg.png"
				btn={{
					btnText: "Read Our Story",
					target: "_blank",
					href: "https://change-via-data.wixsite.com/hack-for-the-globe/team",
				}}
			>
				We are a team of data scientists and computer programmers with a vision
				to democratize data. We have a deep passion for harnessing technology
				and data to help people.
			</Header>
			{/* <!-- About section one--> */}
			<ContentSection
				title="What's happening in Sri Lanka?"
				img="protest.jpeg"
				bg="bg-light"
			>
				Sri Lanka is facing its worst economic crisis in more than 100 years.
				Soaring inflation and a rapidly-depreciating local currency mean that
				the country can no longer afford basic goods. A lack of foreign money
				has led to power cuts that last 10 or more hours every day. Food
				shortages are causing hours-long lines at grocery stores as political
				unrest is mounting.
			</ContentSection>
			{/* <!-- About section two--> */}
			<ContentSection title="Our Goal" img="home.jpeg" bg="">
				Sri Lankan citizens need access to important data that impacts their
				lives. Many of these data are publicly available but difficult to
				access. We want to ensure that those living in Sri Lanka have access to
				accurate and essential data, starting with real time power outage
				upates.
			</ContentSection>
			{/* <!-- Team members section--> */}
			<TeamContainer title="The Teams" subTitle="Hack For Sri Lanka">
				<TeamRow>
					<TeamItem
						teamName="Scrapers - The Creepy Spiders"
						teamLeader="Jinal Shah"
						teamMembers={[
							"Kun Guo",
							"Danny Sallis",
							"Selena Sun",
							"Amanbir Singh",
						]}
						img="teams/spider.png"
					/>
					<TeamItem
						teamName="API & DB - The Dispatchers"
						teamLeader="Jude Cooray"
						teamMembers={[
							"Sanjeew Kanagaraj",
							"Edgar Roerdink",
							"Arjun Balasingam",
							"Akhilesh Balasingam",
						]}
						img="teams/db.png"
					/>

					<TeamItem
						teamName="Web - Team Facade"
						teamLeader="Tharuka Kannaruka"
						teamMembers={["Dan Niles", "Elizabeth Feldman"]}
						img="teams/web.png"
					/>
				</TeamRow>
				<TeamRow>
					<TeamItem
						teamName="Lights off - The Illuminati"
						teamLeader="Rashid Al-Abr"
						teamMembers={[
							"Payel Mukhopadhyay",
							"Afifa Zuhair",
							"Deveen Harischandra",
							"Amanda Bakerlee",
							"Pratheepa Jeganathan",
						]}
						img="teams/bulb-illuminati.png"
					/>
					<TeamItem
						teamName="Brainstorm - Slam Dunkers"
						teamLeader="Vandhana Krishnan, Ankur Pandey"
						teamMembers={[
							"Emmy Thamkaison",
							"Alex Godwin",
							"Rashmi Tippalagama",
						]}
						img="teams/brainstorm.png"
					/>
				</TeamRow>
			</TeamContainer>
		</AnimatedPage>
	);
};

export default About;
