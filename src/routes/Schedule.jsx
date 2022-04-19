import { useSearchParams, useParams } from "react-router-dom";

import AnimatedPage from "../components/AnimatedPage/AnimatedPage";
import ScheduleView from "../components/Schedule/ScheduleView/ScheduleView";
import ScheduleForm from "../components/Schedule/ScheduleForm/ScheduleForm";

const Schedule = () => {
	// selecting group from URL
	let groupName = "";

	const params = useParams();
	if (params.groupname != null) {
		groupName = params.groupname;
	}

	const [searchParams, setSearchParams] = useSearchParams();
	if (searchParams.get("group") != null) {
		groupName = searchParams.get("group");
	}

	return (
		<AnimatedPage>
			<ScheduleForm groupName={groupName} />
			{groupName && <ScheduleView groupName={groupName} />}
			{/* {!groupName && <ScheduleForm groupName={groupName} />} */}
		</AnimatedPage>
	);
};

export default Schedule;
