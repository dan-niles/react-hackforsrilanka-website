import { useSearchParams } from "react-router-dom";

import AnimatedPage from "../components/AnimatedPage/AnimatedPage";
import ScheduleView from "../components/Schedule/ScheduleView/ScheduleView";
import ScheduleForm from "../components/Schedule/ScheduleForm/ScheduleForm";

const Schedule = () => {
	// selecting group from URL
	let groupName = "";

	const [searchParams, setSearchParams] = useSearchParams();
	if (searchParams.get("group") != null) {
		groupName = searchParams.get("group");
	}

	return (
		<AnimatedPage>
			<ScheduleForm groupName={groupName} />

			{/* shows calender and power-cut times after the group is selected */}
			{groupName && <ScheduleView groupName={groupName} />}
		</AnimatedPage>
	);
};

export default Schedule;
