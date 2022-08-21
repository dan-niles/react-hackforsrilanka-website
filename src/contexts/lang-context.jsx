import { useState, createContext } from "react";

import { IntlProvider } from "react-intl";
import English from "../lang/en.json";
import Tamil from "../lang/ta-LK.json";
import Sinhala from "../lang/si-LK.json";

const LangContext = createContext({
	selectLanguage: () => {},
	getLocalePath: () => {}
});


export const LangContextProvider = (props) => {
	const defaultLocale = "en"
	const langPath = {
		"en": "english",
		"ta-LK": "tamil",
		"si-LK": "sinhala",
	};
	const langMessages = {
		"en": English,
		"ta-LK": Tamil,
		"si-LK": Sinhala,
	};

	const initialLocale = localStorage.getItem("lang")
		? localStorage.getItem("lang")
		: defaultLocale;

	const [locale, setLocale] = useState(initialLocale);
	const [localePath, setLocalePath] = useState(langPath[initialLocale]);
	const [messages, setMessages] = useState(langMessages[initialLocale]);

	function selectLanguage(newLocale) {
		// Prevent changing the locale for same locale, LocalizedRoutes call this always
		if (newLocale === locale)
			return

		setLocale(newLocale);
		setLocalePath(langPath[newLocale])
		setMessages(langMessages[newLocale])
		localStorage.setItem("lang", newLocale);
	}

	function getLocalePath(locale) {
		return langPath[locale]
	}

	return (
			<IntlProvider defaultLocale="en" messages={messages} locale={locale}>
		<LangContext.Provider value={{ locale, selectLanguage, localePath, getLocalePath }}>
				{props.children}
			</IntlProvider>
		</LangContext.Provider>
	);
};

export default LangContext;
