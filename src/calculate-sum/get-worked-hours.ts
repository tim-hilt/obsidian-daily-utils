import { MINUTES_IN_HOUR, PAD_WIDTH } from "./utils";

const TIME_COL_INDEX = 2;

const BEGIN_WORK_INDEX = 0;
const LUNCH_BREAK_INDEX = 1;
const END_WORK_INDEX = 2;

const PARSE_TIME_FAILED = 0;

const calcMinutes = (hours: number, minutes: number): number => {
	return hours * MINUTES_IN_HOUR + minutes;
};

const getHoursMinutes = (tableLine: string): [number, number] => {
	// prettier-ignore
	const [hours, minutes] =  tableLine
		.split("|")[TIME_COL_INDEX]
		.trim()
		.split(":")
		.map(x => parseInt(x));
	if (isNaN(hours) || isNaN(minutes)) {
		return [PARSE_TIME_FAILED, PARSE_TIME_FAILED];
	}
	return [hours, minutes];
};

export const getWorkedHours = (workedHoursTable: Array<string>): string => {
	let [hours, minutes] = getHoursMinutes(workedHoursTable[BEGIN_WORK_INDEX]);
	const beginWorkMinutes = calcMinutes(hours, minutes);

	[hours, minutes] = getHoursMinutes(workedHoursTable[LUNCH_BREAK_INDEX]);
	const lunchMinutes = calcMinutes(hours, minutes);

	[hours, minutes] = getHoursMinutes(workedHoursTable[END_WORK_INDEX]);
	const endWorkMinutes = calcMinutes(hours, minutes);

	const workedMinutes = endWorkMinutes - lunchMinutes - beginWorkMinutes;

	const h = Math.floor(workedMinutes / MINUTES_IN_HOUR);
	const m = workedMinutes % MINUTES_IN_HOUR;

	return (
		String(h).padStart(PAD_WIDTH, "0") +
		":" +
		String(m).padStart(PAD_WIDTH, "0")
	);
};
