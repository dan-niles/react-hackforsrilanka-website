import { useState } from "react";
import { createPortal } from "react-dom";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import TodayIcon from "@mui/icons-material/Today";
import Button from "@mui/material/Button";

import { isThisWeek, nextDay, getDay, isSameWeek } from "date-fns";
import add from "date-fns/add";
import sub from "date-fns/sub";

const ScheduleDatePicker = (props) => {
	const setDate = props.setDate;
	const date = props.date;
	const today = new Date();

	const minDate = props.minDate;
	const maxDate = props.maxDate;

	const [disablePrev, setDisablePrev] = useState(false);
	const [disableNext, setDisableNext] = useState(false);

	// For mobile date picker
	const handleDateChange = (newValue) => {
		setDate(newValue);
	};

	const handlePrevClick = () => {
		if (
			isThisWeek(sub(date, { days: 1 }), { weekStartsOn: 1 }) ||
			isSameWeek(nextDay(today, getDay(today)), sub(date, { days: 1 }), {
				weekStartsOn: 1,
			})
		) {
			setDate(
				(currrentDate) =>
					new Date(currrentDate.setDate(currrentDate.getDate() - 1))
			);
		}

		if (minDate.toDateString() === date.toDateString()) {
			setDisablePrev(true);
		} else {
			setDisableNext(false);
			setDisablePrev(false);
		}
	};

	const handleNextClick = () => {
		if (
			isThisWeek(add(date, { days: 1 }), { weekStartsOn: 1 }) ||
			isSameWeek(nextDay(today, getDay(today)), add(date, { days: 1 }), {
				weekStartsOn: 1,
			})
		) {
			setDate(
				(currrentDate) =>
					new Date(currrentDate.setDate(currrentDate.getDate() + 1))
			);
		}

		if (maxDate.toDateString() === date.toDateString()) {
			setDisableNext(true);
		} else {
			setDisableNext(false);
			setDisablePrev(false);
		}
	};

	return (
		<>
			<Stack
				className="mb-2"
				direction="row"
				justifyContent="center"
				alignItems="center"
				spacing={1}
			>
				<Button
					variant="outlined"
					startIcon={<TodayIcon />}
					size="small"
					color="secondary"
					onClick={() => {
						props.setDate(today);
						setDisableNext(false);
						setDisablePrev(false);
					}}
				>
					Today
				</Button>
			</Stack>
			<Stack
				direction="row"
				justifyContent="center"
				alignItems="center"
				spacing={1}
			>
				<IconButton
					className="date-picker-button"
					onClick={handlePrevClick}
					disabled={disablePrev}
				>
					<ChevronLeftIcon />
				</IconButton>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<MobileDatePicker
						minDate={minDate}
						maxDate={maxDate}
						label=" "
						inputFormat="dd-MM-yyyy"
						value={date}
						onChange={handleDateChange}
						renderInput={(params) => (
							<TextField
								className="mobile-date-picker"
								color="secondary"
								{...params}
							/>
						)}
						color="secondary"
					/>
				</LocalizationProvider>
				<IconButton
					className="date-picker-button"
					onClick={handleNextClick}
					disabled={disableNext}
				>
					<ChevronRightIcon />
				</IconButton>
			</Stack>
		</>
	);
};

export default ScheduleDatePicker;
