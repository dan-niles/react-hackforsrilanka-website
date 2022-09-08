
class PageRoutes {
    static HOME = "home"
    static SCHEDULE = "schedule"
    static FIND_MY_GROUP = "find-my-group"
    static SUBSCRIBE = "subscribe"
    static UNSUBSCRIBE = "unsubscribe"
    static ABOUT = "about"
    static SUGGESTIONS = "suggestions"

    static slugs = {
        "home": "home",
        "schedule": "find-power-cut-schedules-in-sri-lanka",
        "find-my-group": "find-your-group-by-location",
        "subscribe": "subscribe-to-receive-free-sms",
        "unsubscribe": "unsubscribe-from-free-sms",
        "about": "about-ekata",
        "suggestions": "send-us-your-comments",
    }

    static slug(pageName) {
        return this.slugs[pageName]
    }
}

export default PageRoutes 