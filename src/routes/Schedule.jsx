import { useSearchParams } from "react-router-dom";

import AnimatedPage from "../components/AnimatedPage/AnimatedPage";
import ScheduleView from "../components/Schedule/ScheduleView/ScheduleView";
import ScheduleForm from "../components/Schedule/ScheduleForm/ScheduleForm";

const Schedule = () => {
	// selecting group from URL
	let groupName = "";
	let suburb = "";
	let gss = "";
	let area = "";

	const [searchParams, setSearchParams] = useSearchParams();
	if (searchParams.get("group") != null) {
		groupName = searchParams.get("group");
		suburb = searchParams.get("suburb");
		gss = searchParams.get("gss");
		area = searchParams.get("area");
	}

	return (
		<AnimatedPage>
			<ScheduleForm
				groupName={groupName}
				suburb={suburb}
				gss={gss}
				area={area}
			/>

			{/* shows calender and power-cut times after the group is selected */}
			{(groupName || gss) && (
				<ScheduleView
					groupName={groupName}
					suburb={suburb}
					gss={gss}
					area={area}
				/>
			)}
		</AnimatedPage>
	);
};

export default Schedule;
