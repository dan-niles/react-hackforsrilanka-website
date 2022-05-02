import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./routes/Home";
import Schedule from "./routes/Schedule";
import About from "./routes/About";
import Contact from "./routes/Contact";
import ErrorPage from "./routes/ErrorPage";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import "./assets/css/styles.css";

import { ColorModeContextProvider } from "./contexts/color-mode";

function App() {
	return (
		<ColorModeContextProvider>
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				<main className="flex-shrink-0">
					<Navbar />
					<Routes>
						{/* these pages can be found within the './routes' folder */}
						<Route path="/" element={<Home />} />
						<Route path="schedule" element={<Schedule />} />
						<Route path="about" element={<About />} />
						<Route path="contact" element={<Contact />} />
						<Route path="*" element={<ErrorPage />} />
					</Routes>
				</main>
				<Footer />
			</BrowserRouter>
		</ColorModeContextProvider>
	);
}

export default App;
