
class PageRoutes {
    static HOME = "home"
    static SCHEDULE = "schedule"
    static SUBSCRIBE = "subscribe"
    static UNSUBSCRIBE = "unsubscribe"
    static FIND_MY_GROUP = "find-my-group"
    static ABOUT = "about"
    static SUGGESTIONS = "suggestions"

    static slugs = {
        "home": "home",
        "schedule": "find-power-cut-schedules-in-sri-lanka",
        "find-my-group": "find-your-group-by-location",
        "about": "about-ekata",
        "suggestions": "send-us-your-comments",
        "subscribe": "subscribe-to-receive-free-sms",
        "unsubscribe": "unsubscribe-from-free-sms"
    }

    static slug(pageName) {
        return this.slugs[pageName]
    }
}

export default PageRoutes 