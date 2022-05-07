import React, { useEffect, useState } from "react";

import ScheduleContainer from "./ScheduleContainer";
import ScheduleItemsContainer from "./ScheduleItemsContainer";
import ScheduleItem from "./ScheduleItem";

import {
	format,
	isThisWeek,
	nextDay,
	getDay,
	isSameWeek,
	startOfWeek,
	endOfWeek,
} from "date-fns";
import { enGB } from "date-fns/locale";
import { DatePickerCalendar as ScheduleCalendar } from "react-nice-dates";
import "react-nice-dates/build/style.css";
import moment from "moment";

import ScheduleDatePicker from "./ScheduleDatePicker";
import axios from "axios";
import { baseURL } from "../../../BaseApi";

import AlertDialog from "../../Alert/AlertDialog";
import TodayIcon from "@mui/icons-material/Today";
import Button from "@mui/material/Button";

const Schedule = (props) => {
	const [date, setDate] = useState(new Date());
	const [scheduleItems, setScheduleItems] = useState([]);
	const [areaGroup, setAreaGroup] = useState(null);
	const today = new Date();
	const minDate = startOfWeek(today, { weekStartsOn: 1 });
	const maxDate = endOfWeek(nextDay(today, getDay(today)), {
		weekStartsOn: 1,
	});

	// Fetch schedule data from api
	const fetchScheduleItems = () => {
		const startDate = moment(minDate).format("yyyy-MM-DD");

		const endDate = moment(maxDate).format("yyyy-MM-DD");
		return axios
			.get(
				baseURL +
					`/api/power-schedule/${props.groupName}/?from_date=${startDate}&to_date=${endDate}`
			)
			.then((res) => {
				setScheduleItems(res.data.data);
			});
	};

	// Fetch schedule data from api using state and city
	const fetchDistrictAreaScheduleItems = () => {
		const startDate = moment(minDate).format("yyyy-MM-DD");

		const endDate = moment(maxDate).format("yyyy-MM-DD");
		return axios
			.get(
				baseURL +
					`/api/schedule-by-place/?district=${props.district}&area=${props.area}&from_date=${startDate}&to_date=${endDate}`
			)
			.then((res) => {
				setScheduleItems(res.data.data);
				console.log(res.data.data);
			});
	};

	useEffect(() => {
		if (props.district && props.area) {
			fetchDistrictAreaScheduleItems();
		}
	}, [props.district, props.area]);

	// useEffect(() => {
	// 	if (areaGroup) {
	// 		fetchDistrictAreaScheduleItems();
	// 	}
	// }, [areaGroup]);

	useEffect(() => {
		if (props.groupName) {
			fetchScheduleItems();
		}
	}, [props.groupName]);

	if (date) {
		// Filter according to group and selected date
		var filteredScheduleItems = scheduleItems.filter((i) => {
			// set initial areaGroup
			if (scheduleItems.length > 0 && !areaGroup) {
				setAreaGroup(scheduleItems[0].group_name);
			}

			if (props.groupName && i.group_name === props.groupName) {
				return (
					i.starting_period.substring(0, 10) ===
					format(date, "yyyy-MM-dd", { locale: enGB })
				);
			}
			if (areaGroup && i.group_name === areaGroup) {
				return (
					i.starting_period.substring(0, 10) ===
					format(date, "yyyy-MM-dd", { locale: enGB })
				);
			}
		});

		console.log(filteredScheduleItems);

		// Remove duplicates
		filteredScheduleItems = Array.from(
			new Set(filteredScheduleItems.map((a) => a.starting_period))
		).map((starting_period) => {
			return filteredScheduleItems.find(
				(a) => a.starting_period === starting_period
			);
		});
	}

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
			if (scheduleItems.length > 0) {
				let obj = scheduleItems.find(
					(i) =>
						i.starting_period.substring(0, 10) ===
						moment(new Date(date)).format("yyyy-MM-DD")
				);
				if (obj !== undefined) return true;
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

	useEffect(() => {
		if (document.getElementsByClassName("nice-dates-day_today").length === 0) {
			const para = document.createElement("span");
			para.classList.add("nice-dates-day_month");
			para.classList.add("nice-dates-day_today");
			const node = document.createTextNode("---");
			para.append(node);
			document.getElementsByClassName("-today")[0].appendChild(para);
		}
	});

	// For opening/closing subscribe modal
	const [open, setOpen] = useState(false);
	const [unSub, setUnSub] = useState(false);

	const handleClickOpen = () => {
		setUnSub(false);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleClickUnsubscribe = () => {
		setUnSub(true);
		setOpen(true);
	};

	return (
		<>
			<AlertDialog
				unSub={unSub}
				open={open}
				handleClose={handleClose}
				groupName={props.groupName}
				areaGroup={areaGroup}
			/>
			<ScheduleContainer
				groupName={props.groupName}
				AreaGroup={areaGroup}
				handleClickOpen={handleClickOpen}
				handleClickUnsubscribe={handleClickUnsubscribe}
			>
				<ScheduleItemsContainer
					handleClickOpen={handleClickOpen}
					handleClickUnsubscribe={handleClickUnsubscribe}
					scheduleItemData={scheduleItems}
					date={date}
					setDate={setDate}
					groupName={props.groupName}
					district={props.district}
					groupList={[...new Set(scheduleItems.map((item) => item.group_name))]}
					setAreaGroup={setAreaGroup}
				>
					{/* {console.log('------------filteredScheduleItems: ', filteredScheduleItems)} */}
					{filteredScheduleItems.map((i) => {
						return (
							<ScheduleItem
								key={i.unique_id}
								starting_period={i.starting_period}
								ending_period={i.ending_period}
							/>
						);
					})}
				</ScheduleItemsContainer>
				<div className="col-lg-6 col-12 my-3 order-md-1 d-none d-lg-block">
					<Button
						sx={{ position: "absolute", zIndex: 999, top: "1em", left: "1em" }}
						variant="outlined"
						startIcon={<TodayIcon />}
						size="small"
						color="secondary"
						onClick={() => {
							setDate(today);
						}}
					>
						Today
					</Button>
					<ScheduleCalendar
						date={date}
						onDateChange={setDate}
						locale={enGB}
						touchDragEnabled={false}
						modifiers={modifiers}
						modifiersClassNames={modifiersClassNames}
					/>
					<div className="container mt-3">
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
				<div className="col-12 mt-2 mb-3 order-md-1 d-block d-lg-none">
					<ScheduleDatePicker
						date={date}
						setDate={setDate}
						maxDate={maxDate}
						minDate={minDate}
					/>
				</div>
			</ScheduleContainer>
		</>
	);
};

export default Schedule;
