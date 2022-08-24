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

import PageRoutes from "./routes/PageRoutes"
import LangRoutes from "./lang/LangRoutes"

const TRACKING_ID = "UA-225410687-1";
ReactGA.initialize(TRACKING_ID);

function App() {
	useEffect(() => {
		ReactGA.pageview(window.location.pathname + window.location.search);
	}, []);

	const langContext = useContext(LangContext)
	const currentLangRoute = langContext.langRoute

	return (
		<ColorModeContextProvider>
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				{/* <ScrollToTop> */}
				<main className="d-flex flex-column flex-shrink-0 min-vh-100 h-100">
					<Navbar />
					<Routes>
						<Route path="/" element={<Navigate to={`/${currentLangRoute}/${PageRoutes.slug(PageRoutes.HOME)}`} />} />

						<Route path={`${LangRoutes.ENGLISH}/*`} element={<LocalizedRoutes lang={LangRoutes.ENGLISH} />} />
						<Route path={`${LangRoutes.SINHALA}/*`} element={<LocalizedRoutes lang={LangRoutes.SINHALA} />} />
						<Route path={`${LangRoutes.TAMIL}/*`} element={<LocalizedRoutes lang={LangRoutes.TAMIL} />} />

						<Route path={PageRoutes.HOME} element={<Navigate to={`/${currentLangRoute}/${PageRoutes.slug(PageRoutes.HOME)}`} />} />
						<Route path={PageRoutes.SCHEDULE} element={<Navigate to={`/${currentLangRoute}/${PageRoutes.slug(PageRoutes.SCHEDULE)}`} />} />
						<Route path={PageRoutes.FIND_MY_GROUP} element={<Navigate to={`/${currentLangRoute}/${PageRoutes.slug(PageRoutes.FIND_MY_GROUP)}`} />} />
						<Route path={PageRoutes.UNSUBSCRIBE} element={<Navigate to={`/${currentLangRoute}/${PageRoutes.slug(PageRoutes.UNSUBSCRIBE)}`} />} />
						<Route path={PageRoutes.ABOUT} element={<Navigate to={`/${currentLangRoute}/${PageRoutes.slug(PageRoutes.ABOUT)}`} />} />
						<Route path={PageRoutes.SUGGESTIONS} element={<Navigate to={`/${currentLangRoute}/${PageRoutes.slug(PageRoutes.SUGGESTIONS)}`} />} />
						
						<Route path="*" element={<ErrorPage />} />
						{/* TODO: I think for production is better to redirect * to home
						 <Route path="*" element={<Navigate to={"/"} />} /> */}
					</Routes>
					<Footer />
				</main>
				{/* </ScrollToTop> */}
			</BrowserRouter>
		</ColorModeContextProvider>
	);
}

function LocalizedRoutes({ lang }) {
	const langContext = useContext(LangContext)
	let selectedLocale = LangRoutes.getLocale(lang)
	
	useEffect(() => {
		langContext.selectLanguage(selectedLocale)
	}, [langContext, selectedLocale])

	const setTitle = (text) => {
		const el = document.querySelector('title');
		el.innerText = text;
	};
	
	const setDescription = (text) => {
		const el = document.querySelector("meta[name='description']");
		el.setAttribute('content', text)
	}

	useEffect(() => {
		setTitle(LangRoutes.getMessage("website.title", lang))
		setDescription(LangRoutes.getMessage("website.description", lang))
	}, [lang])

	
	return (
		<Routes>
			<Route path="/" element={<Navigate to={PageRoutes.slug(PageRoutes.HOME)} />} />

			<Route path={PageRoutes.slug(PageRoutes.HOME)} element={<Home />} />
			<Route path={PageRoutes.slug(PageRoutes.SCHEDULE)} element={<Schedule />} />
			<Route path={PageRoutes.slug(PageRoutes.FIND_MY_GROUP)} element={<FindMyGroup />} />
			<Route path={PageRoutes.slug(PageRoutes.UNSUBSCRIBE)} element={<Unsubscribe />} />
			<Route path={PageRoutes.slug(PageRoutes.ABOUT)} element={<About />} />
			<Route path={PageRoutes.slug(PageRoutes.SUGGESTIONS)} element={<Contact />} />

			<Route path="*" element={<ErrorPage />} />
		</Routes>
	);
}

export default App;
