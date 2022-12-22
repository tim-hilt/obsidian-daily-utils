export const NOT_FOUND_INDEX = -1;
export const TABLE_CONTENTS_OFFSET = 2;
export const MINUTES_IN_HOUR = 60;
export const SLICE_INCLUDE_END = 1;
export const PAD_WIDTH = 2;

const COL_NUM_OFFSET = 2;
const LAST_LINE_INDEX = 1;

export const findTableEnd = (lines: Array<string>, start: number): number => {
	const numCols = lines[start].split("|").length - COL_NUM_OFFSET;

	for (let l = start; l < lines.length; l++) {
		const line = lines[l];
		const currLineCols = line.split("|").length - COL_NUM_OFFSET;
		if (currLineCols < numCols) {
			return l - LAST_LINE_INDEX;
		}
	}

	return lines.length - LAST_LINE_INDEX;
};
