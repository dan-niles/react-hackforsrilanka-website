import ReactGA from "react-ga";

const useAnalyticsEventTracker = (category = "Some category") => {
	const eventTracker = (action = "Some action", label = "Some label") => {
		ReactGA.event({ category, action, label });
	};
	return eventTracker;
};
export default useAnalyticsEventTracker;
