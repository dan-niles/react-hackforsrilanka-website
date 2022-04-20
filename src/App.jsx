import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./routes/Home";
import Schedule from "./routes/Schedule";
import About from "./routes/About";
import Contact from "./routes/Contact";
import ErrorPage from "./routes/ErrorPage";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import grey from "@mui/material/colors/grey";
import "./assets/css/styles.css";

function App() {
	const darkTheme = createTheme({
		palette: {
			mode: "dark",
			secondary: grey,
		},
		typography: {
			fontFamily: [
				"-apple-system",
				"BlinkMacSystemFont",
				'"Segoe UI"',
				"Roboto",
				'"Helvetica Neue"',
				"Arial",
				"sans-serif",
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"',
			].join(","),
		},
	});

	return (
		<ThemeProvider theme={darkTheme}>
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				<main className="flex-shrink-0">
					<Navbar />
					{/* <Navbar /> */}
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="schedule" element={<Schedule />} />
						<Route path="schedule/:groupname" element={<Schedule />} />
						<Route path="about" element={<About />} />
						<Route path="contact" element={<Contact />} />
						<Route path="*" element={<ErrorPage />} />
					</Routes>
				</main>
				<Footer />
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
