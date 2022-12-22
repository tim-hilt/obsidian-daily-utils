import { MINUTES_IN_HOUR, PAD_WIDTH } from "./utils";

const TIME_COL_INDEX = 3;

export const getWorklogHours = (table: Array<string>): string => {
	let workedMinutes = 0;

	for (let r = 0; r < table.length; r++) {
		// prettier-ignore
		const [hours, minutes] = table[r].split("|")[TIME_COL_INDEX]
      .trim().split(":");
		workedMinutes += parseInt(hours) * MINUTES_IN_HOUR + parseInt(minutes);
	}

	const hours = Math.floor(workedMinutes / MINUTES_IN_HOUR);
	const minutes = workedMinutes % MINUTES_IN_HOUR;

	return (
		String(hours).padStart(PAD_WIDTH, "0") +
		":" +
		String(minutes).padStart(PAD_WIDTH, "0")
	);
};
