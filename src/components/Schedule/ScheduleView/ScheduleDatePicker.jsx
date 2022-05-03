import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

const ScheduleDatePicker = (props) => {
	const setDate = props.setDate;
	const date = props.date;

	// For mobile date picker
	const handleDateChange = (newValue) => {
		setDate(newValue);
	};

	const handlePrevClick = () => {
		setDate(
			(currrentDate) =>
				new Date(currrentDate.setDate(currrentDate.getDate() - 1))
		);
	};
	const handleNextClick = () => {
		setDate(
			(currrentDate) =>
				new Date(currrentDate.setDate(currrentDate.getDate() + 1))
		);
	};

	// console.log("--------date-------",date);
	return (
		<Stack
			direction="row"
			justifyContent="center"
			alignItems="center"
			spacing={1}
		>
			<IconButton className="date-picker-button" onClick={handlePrevClick}>
				<ChevronLeftIcon />
			</IconButton>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<MobileDatePicker
					className="helllooo"
					label="Date"
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
			<IconButton className="date-picker-button" onClick={handleNextClick}>
				<ChevronRightIcon />
			</IconButton>
		</Stack>
	);
};

export default ScheduleDatePicker;
