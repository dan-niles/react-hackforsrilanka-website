import React, { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";

import AnimatedPage from "../components/AnimatedPage/AnimatedPage";
import ScheduleContainer from "../components/Schedule/ScheduleContainer";
import ScheduleItemsContainer from "../components/Schedule/ScheduleItemsContainer";
import ScheduleItem from "../components/Schedule/ScheduleItem";

import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { DatePickerCalendar as ScheduleCalendar } from "react-nice-dates";
import "react-nice-dates/build/style.css";

const Schedule = () => {
	const [date, setDate] = useState(new Date());
	const [scheduleItems, setScheduleItems] = useState([]);

	// selecting group from URL
	let groupName = "A";

	const [searchParams, setSearchParams] = useSearchParams();
	if (searchParams.get("group") != null) groupName = searchParams.get("group");

	const params = useParams();
	if (params.groupname != null) groupName = params.groupname;

	// Fetch schedule data from api
	const fetchScheduleItems = () => {
		fetch("https://hackforsrilanka-api.herokuapp.com/api/illuminati/data")
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setScheduleItems(data);
			});
	};

	useEffect(() => {
		fetchScheduleItems();
	}, []);

	// Filter according to group and selected date
	let filteredScheduleItems = scheduleItems.filter(
		(i) =>
			i.group_name === groupName &&
			format(new Date(i.starting_period), "dd MMM yyyy", { locale: enUS }) ===
				format(date, "dd MMM yyyy", { locale: enUS })
	);

	// Remove duplicates
	filteredScheduleItems = Array.from(
		new Set(filteredScheduleItems.map((a) => a.starting_period))
	).map((starting_period) => {
		return filteredScheduleItems.find(
			(a) => a.starting_period === starting_period
		);
	});

	// Calculating total hours of power cuts
	const totalHrs = filteredScheduleItems.reduce(
		(a, item) =>
			(a =
				a +
				Math.abs(
					new Date(item.starting_period) - new Date(item.ending_period)
				) /
					36e5),
		0
	);

	return (
		<AnimatedPage>
			<ScheduleContainer>
				<ScheduleItemsContainer
					date={date}
					groupName={groupName}
					totalHrs={totalHrs}
				>
					{filteredScheduleItems.map((i) => (
						<ScheduleItem
							key={i.unique_id}
							starting_period={i.starting_period}
							ending_period={i.ending_period}
						/>
					))}
				</ScheduleItemsContainer>
				<div className="col-sm-6 col-12 my-3 order-md-1">
					<ScheduleCalendar
						date={date}
						onDateChange={setDate}
						locale={enUS}
						touchDragEnabled={false}
					/>
				</div>
			</ScheduleContainer>
		</AnimatedPage>
	);
};

export default Schedule;
