import { useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ReactGA from "react-ga";

import Home from "./routes/Home";
import Schedule from "./routes/Schedule";
import About from "./routes/About";
import Contact from "./routes/Contact";
import ErrorPage from "./routes/ErrorPage";
import Unsubscribe from "./components/Unsubscribe/Unsubscribe";
import FindMyGroup from "./routes/FindMyGroup";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import LangContext from "./contexts/lang-context";
import { ColorModeContextProvider } from "./contexts/color-mode";
import "./assets/css/styles.css";
import ScrollToTop from "./components/UI/ScrollToTop";

const TRACKING_ID = "UA-225410687-1";
ReactGA.initialize(TRACKING_ID);

function App() {
	useEffect(() => {
		ReactGA.pageview(window.location.pathname + window.location.search);
	}, []);

	const langContext = useContext(LangContext)
	const currentLangPath = langContext.localePath

	return (
		<ColorModeContextProvider>
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				{/* <ScrollToTop> */}
				<main className="d-flex flex-column flex-shrink-0 min-vh-100 h-100">
					<Navbar />
					<Routes>
						{/* Root redirection */}
						<Route path="/" element={<Navigate to={"/" + currentLangPath + "/home"} />} />

						{/* Localized routes */}
						<Route path="english/*" element={<LocalizedRoutes lang="en" />} />
						<Route path="sinhala/*" element={<LocalizedRoutes lang="si-LK" />} />
						<Route path="tamil/*" element={<LocalizedRoutes lang="ta-LK" />} /> 

						{/* Old paths redirections */}
						<Route path="home" element={<Navigate to={"/" + currentLangPath + "/home"} />} />
						<Route path="schedule" element={<Navigate to={"/" + currentLangPath + "/schedule"} />} />
						<Route path="about" element={<Navigate to={"/" + currentLangPath + "/about"} />} />
						<Route path="suggestions" element={<Navigate to={"/" + currentLangPath + "/suggestions"} />} />
						<Route path="unsubscribe" element={<Navigate to={"/" + currentLangPath + "/unsubscribe"} />} />
						<Route path="find-my-group" element={<Navigate to={"/" + currentLangPath + "/find-my-group"} />} />
						
						{/* Wildcard for path not found */}
						<Route path="*" element={<ErrorPage />} />
						{/* <Route path="*" element={<Navigate to={"/"} />} /> */}
					</Routes>
					<Footer />
				</main>
				{/* </ScrollToTop> */}
			</BrowserRouter>
		</ColorModeContextProvider>
	);
}

function LocalizedRoutes({ lang }) {
	// Set the lang from the url to our lang provider
	const langContext = useContext(LangContext)
	useEffect(() => {
		langContext.selectLanguage(lang)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []) 
	
	return (
		<Routes>
			<Route path="/" element={<Navigate to="home" />} />

			<Route path="home" element={<Home />} />
			<Route path="schedule" element={<Schedule />} />
			<Route path="about" element={<About />} />
			<Route path="suggestions" element={<Contact />} />
			<Route path="unsubscribe" element={<Unsubscribe />} />
			<Route path="find-my-group" element={<FindMyGroup />} />
			
			<Route path="*" element={<ErrorPage />} />
		</Routes>
	);
}

export default App;
