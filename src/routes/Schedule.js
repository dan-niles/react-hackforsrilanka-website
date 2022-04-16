import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import AnimatedPage from "../components/AnimatedPage/AnimatedPage";

import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { DatePickerCalendar } from "react-nice-dates";
import "react-nice-dates/build/style.css";

const Schedule = () => {
	const [date, setDate] = useState(new Date());

	const [searchParams, setSearchParams] = useSearchParams();
	const groupName = searchParams.get("group");

	const [scheduleItems, setScheduleItems] = useState([]);

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

	return (
		<AnimatedPage>
			<header className="bg-dark pt-2 pb-5">
				<div className="container">
					<div className="text-center mb-3">
						<h1 className="fw-bolder">Power-Cut Schedule</h1>
						<p className="lead fw-normal text-muted mb-0">Group {groupName}</p>
					</div>
					<div className="row gx-5 align-items-center justify-content-center">
						<div className="col-lg-12 col-xl-12 col-xxl-12">
							<div className="card">
								<div className="container">
									<div className="row">
										{/* component 1 */}
										<div className="col-sm-6 col-12 my-3 order-1">
											<div>
												<DatePickerCalendar
													date={date}
													onDateChange={setDate}
													locale={enUS}
												/>
											</div>
										</div>
										{/* component 2 */}
										<div className="col-sm-6 col-12 d-flex pa-sm order-2">
											<div className="card border-0 mt-5 flex-fill">
												<div className="card-body px-1 py-3">
													<div className="text-center mt-3 mb-4">
														<span className="schedule-date">
															{date
																? format(date, "dd MMM yyyy", { locale: enUS })
																: "None Selected"}
														</span>
														<br />
														<span className="schedule-day">
															{date
																? date.toLocaleString("en-US", {
																		weekday: "long",
																  })
																: ""}
														</span>
													</div>
													<div className="schedule-list my-3 px-3">
														{filteredScheduleItems.map((i) => (
															<div
																className="alert alert-warning text-center alert-dismissible fade show"
																role="alert"
																key={i.unique_id}
															>
																<p>
																	{new Date(
																		i.starting_period
																	).toLocaleTimeString("en", {
																		timeStyle: "short",
																		hour12: true,
																		timeZone: "UTC",
																	})}
																	{" - "}
																	{new Date(i.ending_period).toLocaleTimeString(
																		"en",
																		{
																			timeStyle: "short",
																			hour12: true,
																			timeZone: "UTC",
																		}
																	)}
																</p>
															</div>
														))}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		</AnimatedPage>
	);
};

export default Schedule;
