import React, { useEffect, useState } from "react";

import ScheduleContainer from "./ScheduleContainer";
import ScheduleItemsContainer from "./ScheduleItemsContainer";
import ScheduleItem from "./ScheduleItem";

import { format, isThisWeek, nextDay, getDay, isSameWeek } from "date-fns";
import { enGB } from "date-fns/locale";
import { DatePickerCalendar as ScheduleCalendar } from "react-nice-dates";
import "react-nice-dates/build/style.css";
import moment from "moment";

import ScheduleDatePicker from "./ScheduleDatePicker";
import axios from "axios";
import { baseURL } from "../../../BaseApi";

import AlertDialog from "../../Alert/AlertDialog";

const Schedule = (props) => {
	const [date, setDate] = useState(new Date());
	const [scheduleItems, setScheduleItems] = useState([]);

	// Fetch schedule data from api
	const fetchScheduleItems = () => {
		console.log("date--------", date, "----schedul----", scheduleItems);
		const startDate = moment(new Date(date)).format("yyyy-MM-DD");
		const endDate = moment(new Date(date)).format("yyyy-MM-DD");
		console.log("-------datees ---------", startDate, endDate);
		return axios
			.get(
				baseURL +
					`/api/power-schedule/${props.groupName}/?from_date=${startDate}&to_date=${endDate}`
			)
			.then((res) => {
				console.log("--------get schedule api -----", res);
				setScheduleItems(res.data.data);
			});
	};

	useEffect(() => {
		fetchScheduleItems();
	}, []);

	// Filter according to group and selected date
	let filteredScheduleItems = scheduleItems.filter(
		(i) =>
			i.group_name === props.groupName &&
			format(new Date(i.starting_period), "dd MMM yyyy", { locale: enGB }) ===
				format(date, "dd MMM yyyy", { locale: enGB })
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

	const today = new Date();
	const modifiers = {
		// Displays only two weeks (Current week and next week)
		hideDays: (date) => {
			return (
				!isThisWeek(date, { weekStartsOn: 1 }) &&
				!isSameWeek(nextDay(today, getDay(today)), date, {
					weekStartsOn: 1,
				})
			);
		},
		// Colour key system for dates
		greenClass: (date) => {
			let seledate = [];
			return seledate.includes(moment(new Date(date)).format("yyyy-MM-DD"));
		},
		orangeClass: (date) => {
			console.log("TESTING++++++++++++", scheduleItems);
			if (scheduleItems.length > 0) {
				scheduleItems.forEach((i) => {
					console.log("1....", i.starting_period.substring(0, 9));
					console.log("2....", moment(new Date(date)).format("yyyy-MM-DD"));
					return (
						i.starting_period.substring(0, 9) ===
						moment(new Date(date)).format("yyyy-MM-DD")
					);
				});
			}
		},
		grayClass: (date) => true,
	};
	const modifiersClassNames = {
		hideDays: "d-none",
		greenClass: "-green-ring",
		orangeClass: "-orange-ring",
		grayClass: "-gray-ring",
	};

	// For opening/closing subscribe modal
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<AlertDialog
				open={open}
				handleClose={handleClose}
				groupName={props.groupName}
			/>
			<ScheduleContainer
				groupName={props.groupName}
				handleClickOpen={handleClickOpen}
			>
				<ScheduleItemsContainer
					scheduleItemData={scheduleItems}
					date={date}
					groupName={props.groupName}
					totalHrs={totalHrs.toFixed(1)}
					handleClickOpen={handleClickOpen}
				>
					{filteredScheduleItems.map((i) => (
						<ScheduleItem
							key={i.unique_id}
							starting_period={i.starting_period}
							ending_period={i.ending_period}
						/>
					))}
				</ScheduleItemsContainer>
				<div className="col-sm-6 col-12 my-3 order-md-1 d-none d-md-block">
					<ScheduleCalendar
						date={date}
						onDateChange={setDate}
						locale={enGB}
						touchDragEnabled={false}
						modifiers={modifiers}
						modifiersClassNames={modifiersClassNames}
					/>
					<div className="container">
						<div className="card">
							<div className="card-body">
								<div className="calendar-legend">
									<div className="calender-legend-item">
										<div className="calender-legend-ring orange"></div>
										<span className="mb-0">Schedule Available</span>
									</div>
									<div className="calender-legend-item">
										<div className="calender-legend-ring gray"></div>
										<span className="mb-0">Not Available</span>
									</div>
									<div className="calender-legend-item">
										<div className="calender-legend-ring green"></div>
										<span className="mb-0">No Power Cuts</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Hide the calendar on mobile and show a datepicker */}
				<div className="col-12 mt-4 mb-4 order-md-1 d-block d-md-none">
					<ScheduleDatePicker date={date} setDate={setDate} />
				</div>
			</ScheduleContainer>
		</>
	);
};

export default Schedule;
