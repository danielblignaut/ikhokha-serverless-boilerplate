// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
module.exports = {
	rootDir: path.join(__dirname, '..', '..'),
	transform: {
		'^.+\\.graphql$': 'jest-raw-loader',
		'^.+\\.jsx?$': 'babel-jest',
		'^.+\\.ts?$': 'ts-jest',

	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'graphql', 'gql'],
	moduleNameMapper: {
		'\\.module\\.css$': 'identity-obj-proxy',
		'\\.css$': require.resolve('./../style-mock.ts'),
		'@ikhokha/(.*)$': '<rootDir>/$1',
	},
	moduleDirectories: ['node_modules'],
	setupFilesAfterEnv: [require.resolve('./../setup-test.ts')],
	collectCoverageFrom: [
		'**/src/**/*.{ts,js,jsx,tsx}',
		'**/lib/**/*.{ts,js,jsx,tsx}',
		'!**/src/**/*.test.{ts,js,jsx,tsx}',
		'!**/cli-tools/**/*.test.{ts,js,jsx,tsx}',
		'!**/cli-tools/**/index.{ts,js,jsx,tsx}',
		'!**/lib/**/*.test.{ts,js,jsx,tsx}',

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
