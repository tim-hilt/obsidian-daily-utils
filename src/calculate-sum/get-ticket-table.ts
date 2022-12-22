import {
	findTableEnd,
	NOT_FOUND_INDEX,
	SLICE_INCLUDE_END,
	TABLE_CONTENTS_OFFSET,
} from "./utils";

const NUM_TICKET_TABLE_COLS = 3;

const isTicketHeaders = (headers: Array<string>): boolean => {
	return (
		headers.length === NUM_TICKET_TABLE_COLS &&
		headers.includes("Ticket") &&
		headers.includes("Description") &&
		headers.includes("Time")
	);
};

const findTicketTableStart = (lines: Array<string>): number => {
	for (let l = 0; l < lines.length; l++) {
		const headers = lines[l]
			.split("|")
			.map((h) => h.trim())
			.filter((h) => h);
		if (isTicketHeaders(headers)) {
			return l + TABLE_CONTENTS_OFFSET;
		}
	}
	return NOT_FOUND_INDEX;
};

export const getTicketTable = (
	fileContent: string
): [Array<string>, number] => {
	const lines = fileContent.split("\n");
	const ticketTableStart = findTicketTableStart(lines);

	if (ticketTableStart === NOT_FOUND_INDEX) {
		return [[], NOT_FOUND_INDEX];
	}

	const ticketTableEnd = findTableEnd(lines, ticketTableStart);
	return [
		lines.slice(ticketTableStart, ticketTableEnd + SLICE_INCLUDE_END),
		ticketTableEnd,
	];
};
