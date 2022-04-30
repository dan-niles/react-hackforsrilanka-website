import React, { useEffect, useState } from "react";

import ScheduleContainer from "./ScheduleContainer";
import ScheduleItemsContainer from "./ScheduleItemsContainer";
import ScheduleItem from "./ScheduleItem";

import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { DatePickerCalendar as ScheduleCalendar } from "react-nice-dates";
import "react-nice-dates/build/style.css";
import moment from "moment";

import ScheduleDatePicker from "./ScheduleDatePicker";
import axios from "axios";
import { baseURL } from "../../../BaseApi";

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

  //	console.log("------filtred schedule item---",filteredScheduleItems);
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
    <ScheduleContainer groupName={props.groupName}>
      <ScheduleItemsContainer
        scheduleItemData={scheduleItems}
        date={date}
        groupName={props.groupName}
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
      <div className="col-sm-6 col-12 my-3 order-md-1 d-none d-md-block">
        <ScheduleCalendar
          date={date}
          onDateChange={setDate}
          locale={enUS}
          touchDragEnabled={false}
        />
      </div>

      {/* Hide the calendar on mobile and show a datepicker */}
      <div className="col-12 mt-5 mb-4 order-md-1 d-block d-md-none">
        <ScheduleDatePicker date={date} setDate={setDate} />
      </div>
    </ScheduleContainer>
  );
};

export default Schedule;
