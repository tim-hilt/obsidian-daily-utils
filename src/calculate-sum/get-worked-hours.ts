import { MINUTES_IN_HOUR, PAD_WIDTH } from "./utils";

const TIME_COL_INDEX = 2;

const BEGIN_WORK_INDEX = 0;
const LUNCH_BREAK_INDEX = 1;
const END_WORK_INDEX = 2;

// TODO: The below function could be built more DRY
export const getWorkedHours = (workedHoursTable: Array<string>): string => {
	let workedMinutes = 0;

	// prettier-ignore
	let [hours, minutes] = workedHoursTable[BEGIN_WORK_INDEX]
		.split("|")[TIME_COL_INDEX].trim().split(":");
	workedMinutes -= parseInt(hours) * MINUTES_IN_HOUR + parseInt(minutes);

	// prettier-ignore
	[hours, minutes] = workedHoursTable[LUNCH_BREAK_INDEX]
		.split("|")[TIME_COL_INDEX].trim().split(":");
	workedMinutes -= parseInt(hours) * MINUTES_IN_HOUR + parseInt(minutes);

	// prettier-ignore
	[hours, minutes] = workedHoursTable[END_WORK_INDEX]
		.split("|")[TIME_COL_INDEX].trim().split(":");
	workedMinutes += parseInt(hours) * MINUTES_IN_HOUR + parseInt(minutes);

	const h = Math.floor(workedMinutes / MINUTES_IN_HOUR);
	const m = workedMinutes % MINUTES_IN_HOUR;

	return (
		String(h).padStart(PAD_WIDTH, "0") +
		":" +
		String(m).padStart(PAD_WIDTH, "0")
	);
};
