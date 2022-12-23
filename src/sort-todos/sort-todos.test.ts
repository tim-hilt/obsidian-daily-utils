import { test, expect } from "vitest";
import { sortTodos } from "./sort-todos";

test("should sort todos correctly", () => {
	// GIVEN
	const file = `# Title

- [x] one
- [ ] two
- [x] three
- [ ] four

something else
`;

	// WHEN
	const result = sortTodos(file);

	// THEN
	const expected = `# Title

- [ ] two
- [ ] four
- [x] one
- [x] three

something else
`;

	expect(result).toBe(expected);
});

test("should sort multiple todos-lists correctly", () => {
	// GIVEN
	const file = `# Title

- [x] one
- [ ] two
- [x] three
- [ ] four

something else

- [x] one
- [ ] two
- [x] three
- [ ] four
`;

	// WHEN
	const result = sortTodos(file);

	// THEN
	const expected = `# Title

- [ ] two
- [ ] four
- [x] one
- [x] three

something else

- [ ] two
- [ ] four
- [x] one
- [x] three
`;

	expect(result).toBe(expected);
});

test("should sort todos with children correctly", () => {
	// GIVEN
	const file = `# Title

- [x] one
  - test
  - Hallo
- [ ] two
  - nochwas
  - foo
- [x] three
- [ ] four

something else
`;

	// WHEN
	const result = sortTodos(file);

	// THEN
	const expected = `# Title

- [ ] two
  - nochwas
  - foo
- [ ] four
- [x] one
  - test
  - Hallo
- [x] three

something else
`;

	expect(result).toBe(expected);
});
