import { Notice, Plugin } from "obsidian";
import {
	addWorkedHours,
	getTicketTable,
	getWorkedHours,
	getWorkedHoursTable,
	getWorklogHours,
} from "./calculate-sum";
import { sortTodos } from "./sort-todos";

const NOTIFICATION_TIME = 4000;

export default class DailyUtils extends Plugin {
	async calculateSum() {
		const activeFile = this.app.workspace.getActiveFile();

		if (activeFile === null) {
			new Notice("No file opened", NOTIFICATION_TIME);
			return;
		}

		const activeFileContent = await this.app.vault.read(activeFile);

		const [ticketTable, ticketTableEnd] = getTicketTable(activeFileContent);
		const worklogHours = getWorklogHours(ticketTable);

		const [workedHoursTable, workedHoursTableEnd] =
			getWorkedHoursTable(activeFileContent);
		const workedHours = getWorkedHours(workedHoursTable);

		const modifiedFileContent = addWorkedHours({
			file: activeFileContent,
			worklogHours,
			ticketTableEnd,
			workedHours,
			workedHoursTableEnd,
		});

		this.app.vault.modify(activeFile, modifiedFileContent);
	}

	async sortTodos() {
		const activeFile = this.app.workspace.getActiveFile();

		if (activeFile === null) {
			new Notice("No file opened", NOTIFICATION_TIME);
			return;
		}

		const activeFileContent = await this.app.vault.read(activeFile);
		const modifiedFileContent = sortTodos(activeFileContent);

		this.app.vault.modify(activeFile, modifiedFileContent);
	}

	async onload() {
		this.addCommand({
			id: "obsidian-daily-utils-calculate-working-hours",
			name: "Calculate Worked Hours",
			callback: () => this.calculateSum(),
		});

		this.addCommand({
			id: "obsidian-daily-utils-sort-todos",
			name: "Sort Todos",
			callback: () => this.sortTodos(),
		});
	}
}
