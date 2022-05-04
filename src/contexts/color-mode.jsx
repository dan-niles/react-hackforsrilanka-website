import { useState, useMemo, createContext } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import grey from "@mui/material/colors/grey";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const ColorModeContextProvider = (props) => {
	let appColorMode = "dark";
	if (localStorage.getItem("color-mode") !== null) {
		appColorMode = localStorage.getItem("color-mode");
		if (appColorMode === "light") {
			document.getElementsByTagName("html")[0].classList.add("light-mode");
		} else {
			document.getElementsByTagName("html")[0].classList.remove("light-mode");
		}
	}

	const [mode, setMode] = useState(appColorMode);
	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => {
					if (prevMode === "light") {
						localStorage.setItem("color-mode", "dark");
						document
							.getElementsByTagName("html")[0]
							.classList.remove("light-mode");
						return "dark";
					} else {
						localStorage.setItem("color-mode", "light");
						document
							.getElementsByTagName("html")[0]
							.classList.add("light-mode");
						return "light";
					}
				});
			},
		}),
		[]
	);

	const appTheme = useMemo(() =>
		createTheme({
			palette: {
				mode: mode,
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
				button: {
					textTransform: "none",
				},
			},
		})
	);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={appTheme}>{props.children}</ThemeProvider>
		</ColorModeContext.Provider>
	);
};

export default ColorModeContext;
