import esbuild from "esbuild";
import process from "process";
import builtins from "builtin-modules";

const EXIT_FAILURE = 1;
const ARG_POS = 2;

const prod = process.argv[ARG_POS] === "production";

esbuild
	.build({
		entryPoints: ["src/main.ts"],
		bundle: true,
		external: [
			"obsidian",
			"electron",
			"@codemirror/autocomplete",
			"@codemirror/collab",
			"@codemirror/commands",
			"@codemirror/language",
			"@codemirror/lint",
			"@codemirror/search",
			"@codemirror/state",
			"@codemirror/view",
			"@lezer/common",
			"@lezer/highlight",
			"@lezer/lr",
			...builtins,
		],
		format: "cjs",
		target: "es2018",
		logLevel: "info",
		sourcemap: prod ? false : "inline",
		minify: prod,
		treeShaking: true,
		outfile: "main.js",
	})
	.catch(() => process.exit(EXIT_FAILURE));
