export const sortTodos = (file: string): string => {
	const lines = file.split("\n");
	const modifiedLines = [...lines];

	for (let l = 0; l < lines.length; l++) {
		if (isTodo(lines[l])) {
			const start = l;
			while (isTodo(lines[l]) || isIndentedBulletPoint(lines[l])) {
				l++;
			}
			const end = l - 1;
			const { done, undone } = getTodos(lines, start, end);
			modifiedLines.splice(start, undone.length, ...undone);
			modifiedLines.splice(start + undone.length, done.length, ...done);
		}
	}

	return modifiedLines.join("\n");
};

const isTodo = (s: string): boolean => {
	return s.startsWith("- [");
};

const isIndentedBulletPoint = (s: string): boolean => {
	const r = /\s+- .*/g;
	const match = r.test(s);
	return match;
};

const getTodos = (
	lines: Array<string>,
	start: number,
	end: number
): { done: Array<string>; undone: Array<string> } => {
	let undone: Array<string> = [];
	let done: Array<string> = [];
	for (let l = start; l <= end; l++) {
		const line = lines[l];
		if (line.startsWith("- [x]")) {
			done.push(line);
			if (hasChildren(lines, l)) {
				const cs = getChildren(lines, l);
				done = [...done, ...cs];
				l += cs.length;
			}
		} else if (line.startsWith("- [ ]")) {
			undone.push(line);
			if (hasChildren(lines, l)) {
				const cs = getChildren(lines, l);
				undone = [...undone, ...cs];
				l += cs.length;
			}
		}
	}
	return {
		done,
		undone,
	};
};

const getIndentation = (lines: Array<string>, l: number): number => {
	return lines[l].search(/\S/);
};

const hasChildren = (lines: Array<string>, l: number): boolean => {
	if (l + 1 >= lines.length) {
		return false;
	}
	const indCurr = getIndentation(lines, l);
	const indNext = getIndentation(lines, l + 1);
	if (indNext > indCurr) {
		return true;
	}
	return false;
};

const getChildren = (
	lines: Array<string>,
	parentLinum: number
): Array<string> => {
	const children: Array<string> = [];
	let nextLinum = parentLinum + 1;
	while (isChildof(lines, parentLinum, nextLinum)) {
		children.push(lines[nextLinum]);
		nextLinum++;
	}
	return children;
};

const isChildof = (
	lines: Array<string>,
	parentLinum: number,
	linum: number
): boolean => {
	if (parentLinum >= lines.length || linum >= lines.length) {
		return false;
	}
	return getIndentation(lines, linum) > getIndentation(lines, parentLinum);
};
