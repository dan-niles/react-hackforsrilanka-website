import { useState, useMemo, createContext } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import grey from "@mui/material/colors/grey";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const ColorModeContextProvider = (props) => {

	const toggleHtmlTagTheme = (isLight) => {
		const htmlTagClasses = document.getElementsByTagName("html")[0].classList
		isLight ? htmlTagClasses.add("light-mode") 
			: htmlTagClasses.remove("light-mode");
	}

	let appColorMode = "dark";
	if (localStorage.getItem("color-mode") !== null) {
		appColorMode = localStorage.getItem("color-mode");
		toggleHtmlTagTheme(appColorMode === "light")
	}

	const [mode, setMode] = useState(appColorMode);
	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => {
					const nextMode = prevMode === "light" ? "dark" : "light"
					localStorage.setItem("color-mode", nextMode);
					toggleHtmlTagTheme(nextMode === "light")
					return nextMode;
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
					"Noto Sans",
					"Liberation Sans",
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
