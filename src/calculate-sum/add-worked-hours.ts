type AddWorkedHoursProperties = {
	file: string;
	worklogHours: string;
	ticketTableEnd: number;
	workedHours: string;
	workedHoursTableEnd: number;
};

const SUM_LINE_OFFSET = 2;

export const addWorkedHours = ({
	file,
	worklogHours,
	ticketTableEnd,
	workedHours,
	workedHoursTableEnd,
}: AddWorkedHoursProperties): string => {
	const fileContent = file.split("\n");

	fileContent[ticketTableEnd + SUM_LINE_OFFSET] = "Sum: " + worklogHours;
	fileContent[workedHoursTableEnd + SUM_LINE_OFFSET] = "Sum: " + workedHours;

	return fileContent.join("\n");
};
