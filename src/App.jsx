import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactGA from "react-ga";

import Home from "./routes/Home";
import Schedule from "./routes/Schedule";
import About from "./routes/About";
import Contact from "./routes/Contact";
import ErrorPage from "./routes/ErrorPage";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import { ColorModeContextProvider } from "./contexts/color-mode";
import "./assets/css/styles.css";

const TRACKING_ID = "UA-225410687-1";
ReactGA.initialize(TRACKING_ID);

function App() {
	useEffect(() => {
		ReactGA.pageview(window.location.pathname + window.location.search);
	}, []);

	return (
		<ColorModeContextProvider>
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				<main className="d-flex flex-column flex-shrink-0 min-vh-100 h-100">
					<Navbar />
					<Routes>
						{/* these pages can be found within the './routes' folder */}
						<Route path="/" element={<Home />} />
						<Route path="schedule" element={<Schedule />} />
						<Route path="about" element={<About />} />
						<Route path="contact" element={<Contact />} />
						<Route path="*" element={<ErrorPage />} />
					</Routes>
					<Footer />
				</main>
			</BrowserRouter>
		</ColorModeContextProvider>
	);
}

export default App;
