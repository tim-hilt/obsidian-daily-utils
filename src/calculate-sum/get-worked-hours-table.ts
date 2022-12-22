import {
	findTableEnd,
	NOT_FOUND_INDEX,
	SLICE_INCLUDE_END,
	TABLE_CONTENTS_OFFSET,
} from "./utils";

const NUM_WORKED_HOURS_TABLE_COLS = 2;

const isWorkedHoursHeaders = (headers: Array<string>): boolean => {
	return (
		headers.length === NUM_WORKED_HOURS_TABLE_COLS &&
		headers.includes("Event") &&
		headers.includes("Time")
	);
};

const findWorkedHoursTableStart = (lines: Array<string>): number => {
	for (let l = 0; l < lines.length; l++) {
		const headers = lines[l]
			.split("|")
			.map((h) => h.trim())
			.filter((h) => h);
		if (isWorkedHoursHeaders(headers)) {
			return l + TABLE_CONTENTS_OFFSET;
		}
	}
	return NOT_FOUND_INDEX;
};

export const getWorkedHoursTable = (
	fileContent: string
): [Array<string>, number] => {
	const lines = fileContent.split("\n");
	const workedHoursTableStart = findWorkedHoursTableStart(lines);

	if (workedHoursTableStart === NOT_FOUND_INDEX) {
		return [[], NOT_FOUND_INDEX];
	}

	const workedHoursTableEnd = findTableEnd(lines, workedHoursTableStart);
	return [
		lines.slice(
			workedHoursTableStart,
			workedHoursTableEnd + SLICE_INCLUDE_END
		),
		workedHoursTableEnd,
	];
};
