import { useTheme } from "@mui/material/styles";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

import AnimatedPage from "../components/AnimatedPage/AnimatedPage";
import HomeSecondaryPanel from "../components/Home/HomeSecondaryPanel";
import HomeSecondaryItem from "../components/Home/HomeSecondaryItem";
import PageRoutes from "./PageRoutes"
import HomePrimaryPanel from "../components/Home/HomePrimaryPanel";

const Home = () => {
	const appTheme = useTheme();

	return (
		<AnimatedPage>
			<div
				style={{  
					display: 'flex',
					flexDirection: 'column',
					flex: "1 1 auto",
					backgroundImage: `url("${
						appTheme.palette.mode === "dark"
							? require("../assets/img/bulbBg.png")
							: require("../assets/img/bulbBg-light.png")
					}")`,
				}}>

				<HomePrimaryPanel/>

				<HomeSecondaryPanel>
					<HomeSecondaryItem
						title="home.secondary.subscribe.title"
						subtitle="home.secondary.subscribe.subtitle"
						buttonText="home.secondary.subscribe.button"
						destination={`../${PageRoutes.slug(PageRoutes.SUBSCRIBE)}`}
						image={require("../assets/img/sampleSMS.jpg")}
						icon={NotificationsActiveIcon}
					/>
					<HomeSecondaryItem
						title="home.secondary.find-my-group.title"
						subtitle="home.secondary.find-my-group.subtitle"
						buttonText="home.secondary.find-my-group.button"
						destination={`../${PageRoutes.slug(PageRoutes.FIND_MY_GROUP)}`}
						image={require("../assets/img/sampleMap.jpg")}
						icon={NotificationsActiveIcon}
					/>
					<HomeSecondaryItem
						title="home.secondary.about.title"
						subtitle="home.secondary.about.subtitle"
						buttonText="home.secondary.about.button"
						destination={`../${PageRoutes.slug(PageRoutes.ABOUT)}`}
						image={require("../assets/img/protest.jpeg")}
						icon={NotificationsActiveIcon}
					/>
					<HomeSecondaryItem
						title="home.secondary.suggestions.title"
						subtitle="home.secondary.suggestions.subtitle"
						buttonText="home.secondary.suggestions.button"
						destination={`../${PageRoutes.slug(PageRoutes.SUGGESTIONS)}`}
						image={require("../assets/img/home.jpeg")}
						icon={NotificationsActiveIcon}
					/>
				</HomeSecondaryPanel>
			</div>
		</AnimatedPage>
	);
};

export default Home;
