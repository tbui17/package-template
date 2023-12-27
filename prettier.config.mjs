/** @type {import('prettier').Config} */
const config = {
	plugins: ["prettier-plugin-jsdoc"],
	tabWidth: 4,
	useTabs: true,
	singleQuote: false,
	trailingComma: "es5",
	printWidth: 80,
	quoteProps: "as-needed",

	semi: false,
}

export default config
