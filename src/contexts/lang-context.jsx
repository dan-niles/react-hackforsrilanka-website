import { useState, createContext } from "react";

import { IntlProvider } from "react-intl";
import LangRoutes from "../lang/LangRoutes";

const LangContext = createContext({
	selectLanguage: () => {},
	getLangRoute: () => {}
});


export const LangContextProvider = (props) => {

	const initialLocale = localStorage.getItem("lang")
		? localStorage.getItem("lang")
		: LangRoutes.DEFAULT_LOCALE;
	const initialLangRoute = LangRoutes.getFromLocale(initialLocale)

	const [locale, setLocale] = useState(initialLocale);
	const [langRoute, setLangRoute] = useState(initialLangRoute);
	const [messages, setMessages] = useState(LangRoutes.getMessages(initialLangRoute));	

	function selectLanguage(newLocale) {
		// Prevent changing the locale for same locale, LocalizedRoutes call this always
		if (newLocale === locale)
			return

		const newLangRoute = LangRoutes.getFromLocale(newLocale)
		setLocale(newLocale);
		setLangRoute(newLangRoute)
		setMessages(LangRoutes.getMessages(newLangRoute))
		localStorage.setItem("lang", newLocale);
	}

	function getLangRoute(locale) {
		return LangRoutes.getFromLocale(locale)
	}

	}

	return (
		<LangContext.Provider value={{ locale, selectLanguage, langRoute, getLangRoute }}>
			<IntlProvider 
					defaultLocale={LangRoutes.DEFAULT_LOCALE} 
					messages={messages} 
					locale={locale}>
				{props.children}
			</IntlProvider>
		</LangContext.Provider>
	);
};

export default LangContext;
