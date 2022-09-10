import English from "./en.json";
import Tamil from "./ta-LK.json";
import Sinhala from "./si-LK.json";

class LangRoutes {
    static DEFAULT_LOCALE = "en"

    static ENGLISH = "english"
    static TAMIL = "tamil"
    static SINHALA = "sinhala"

    static messages = {
		"english": English,
		"tamil": Tamil,
		"sinhala": Sinhala,
	}

    static getLocale(langRoute) {
        return this.getMessages(langRoute)["lang.locale"]
    }

    static getFromLocale(locale) {
        return Object.keys(this.messages).find(key => this.messages[key]["lang.locale"] === locale);
    }

    static getMessages(langRoute) {
        return this.messages[langRoute]
    }

    static getMessage(id, langRoute) {
        const langMessages = this.getMessages(langRoute)
        return langMessages.hasOwnProperty(id) ? langMessages[id] : this.getDefaultedMessage(id)
    }

    static getDefaultedMessage(id) {
        const defaultMessages = this.getMessages(this.getFromLocale(this.DEFAULT_LOCALE))
        return defaultMessages.hasOwnProperty(id) ? defaultMessages[id] : id
    }

    static getTranslatedLangName(langRoute) {
        return this.getMessages(langRoute)["lang.translated"]
    }
}

export default LangRoutes 2