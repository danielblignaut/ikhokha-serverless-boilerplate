// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
	rootDir: path.join(__dirname, '..', '..'),
	transform: {
		'^.+\\.jsx?$': 'babel-jest',
		'^.+\\.ts?$': 'ts-jest'
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	moduleNameMapper: {
		'\\.module\\.css$': 'identity-obj-proxy',
		'\\.css$': require.resolve('./../style-mock.ts'),
	},
	moduleDirectories: ['node_modules', path.join(__dirname, '..', '..', 'src'), path.join(__dirname, '..', '..', 'shared'), path.join(__dirname, '..')],
	setupFilesAfterEnv: [require.resolve('./../setup-test.ts')],
	collectCoverageFrom: [
		'**/src/**/*.{ts,js,jsx,tsx}',
		'**/cli-tools/**/*.{ts,js,jsx,tsx}',
		'!**/src/**/*.test.{ts,js,jsx,tsx}',
		'!**/cli-tools/**/*.test.{ts,js,jsx,tsx}',
		'!**/src/**/index.{ts,js,jsx,tsx}',
		'!**/cli-tools/**/index.{ts,js,jsx,tsx}',
	],
	coveragePathIgnorePatterns: [
		'/node_modules/',
		'/__client_tests__/',
		'__server_tests__/',
	],
	coverageThreshold: {
		global: {
			statements: 100,
			branches: 100,
			lines: 100,
			functions: 100
		}
	},
	watchPlugins: [
		'jest-watch-typeahead/filename',
		'jest-watch-typeahead/testname',
		'jest-watch-select-projects'
	]
}
