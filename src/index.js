import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import { LangContextProvider } from "./contexts/lang-context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<LangContextProvider>
		<App />
	</LangContextProvider>
);
