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
import PageNames from "./routes/PageNames"

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
						<Route path="/" element={<Navigate to={`/${currentLangPath}/${PageNames.slug(PageNames.HOME)}`} />} />

						{/* Localized routes */}
						<Route path="english/*" element={<LocalizedRoutes lang="en" />} />
						<Route path="sinhala/*" element={<LocalizedRoutes lang="si-LK" />} />
						<Route path="tamil/*" element={<LocalizedRoutes lang="ta-LK" />} /> 

						{/* Old paths redirections */}
						<Route path={PageNames.HOME} element={<Navigate to={`/${currentLangPath}/${PageNames.slug(PageNames.HOME)}`} />} />
						<Route path={PageNames.SCHEDULE} element={<Navigate to={`/${currentLangPath}/${PageNames.slug(PageNames.SCHEDULE)}`} />} />
						<Route path={PageNames.FIND_MY_GROUP} element={<Navigate to={`/${currentLangPath}/${PageNames.slug(PageNames.FIND_MY_GROUP)}`} />} />
						<Route path={PageNames.UNSUBSCRIBE} element={<Navigate to={`/${currentLangPath}/${PageNames.slug(PageNames.UNSUBSCRIBE)}`} />} />
						<Route path={PageNames.ABOUT} element={<Navigate to={`/${currentLangPath}/${PageNames.slug(PageNames.ABOUT)}`} />} />
						<Route path={PageNames.SUGGESTIONS} element={<Navigate to={`/${currentLangPath}/${PageNames.slug(PageNames.SUGGESTIONS)}`} />} />
						
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
			<Route path="/" element={<Navigate to={PageNames.slug(PageNames.HOME)} />} />

			<Route path={PageNames.slug(PageNames.HOME)} element={<Home />} />
			<Route path={PageNames.slug(PageNames.SCHEDULE)} element={<Schedule />} />
			<Route path={PageNames.slug(PageNames.FIND_MY_GROUP)} element={<FindMyGroup />} />
			<Route path={PageNames.slug(PageNames.UNSUBSCRIBE)} element={<Unsubscribe />} />
			<Route path={PageNames.slug(PageNames.ABOUT)} element={<About />} />
			<Route path={PageNames.slug(PageNames.SUGGESTIONS)} element={<Contact />} />

			<Route path="*" element={<ErrorPage />} />
		</Routes>
	);
}

export default App;
