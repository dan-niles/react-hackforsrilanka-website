import { useState, createContext } from "react";

import { IntlProvider } from "react-intl";
import English from "../lang/en.json";
import Tamil from "../lang/ta-LK.json";
import Sinhala from "../lang/si-LK.json";

const LangContext = createContext({ selectLanguage: () => {} });

export const LangContextProvider = (props) => {
	const lang = {
		en: English,
		"ta-LK": Tamil,
		"si-LK": Sinhala,
	};

	const defaultLang = localStorage.getItem("lang")
		? localStorage.getItem("lang")
		: "en";

	const [locale, setLocale] = useState(defaultLang);
	const [messages, setMessages] = useState(lang[locale]);

	function selectLanguage(newLocale) {
		setLocale(newLocale);
		if (newLocale === "en") {
			setMessages(lang["en"]);
		} else {
			if (newLocale === "ta-LK") {
				setMessages(lang["ta-LK"]);
			} else {
				setMessages(lang["si-LK"]);
			}
		}
		localStorage.setItem("lang", newLocale);
	}

	return (
		<LangContext.Provider value={{ locale, selectLanguage }}>
			<IntlProvider defaultLocale="en" messages={messages} locale={locale}>
				{props.children}
			</IntlProvider>
		</LangContext.Provider>
	);
};

export default LangContext;
