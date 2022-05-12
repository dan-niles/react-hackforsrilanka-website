import { useSearchParams } from "react-router-dom";

import AnimatedPage from "../components/AnimatedPage/AnimatedPage";
import ScheduleView from "../components/Schedule/ScheduleView/ScheduleView";
import ScheduleForm from "../components/Schedule/ScheduleForm/ScheduleForm";

const Schedule = () => {
	// selecting group from URL
	let groupName = "";
	let district = "";
	let gss = "";
	let area = "";

	const [searchParams, setSearchParams] = useSearchParams();
	if (searchParams.get("group") != null) {
		groupName = searchParams.get("group");
		district = searchParams.get("district");
		gss = searchParams.get("gss");
		area = searchParams.get("area");
	}

	return (
		<AnimatedPage>
			<ScheduleForm
				groupName={groupName}
				district={district}
				gss={gss}
				area={area}
			/>

			{/* shows calender and power-cut times after the group is selected */}
			{(groupName || gss) && (
				<ScheduleView
					groupName={groupName}
					district={district}
					gss={gss}
					area={area}
				/>
			)}
		</AnimatedPage>
	);
};

export default Schedule;
