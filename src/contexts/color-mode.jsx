import { useState, useMemo, createContext } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import grey from "@mui/material/colors/grey";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const ColorModeContextProvider = (props) => {
	const [mode, setMode] = useState("dark");
	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => {
					if (prevMode === "light") {
						document
							.getElementsByTagName("html")[0]
							.classList.remove("light-mode");
						return "dark";
					} else {
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
