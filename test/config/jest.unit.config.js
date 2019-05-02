// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
	...require('./jest-common-config'),
	testEnvironment: 'node',
	testMatch: ['**/**/*.test.{ts,js,jsx,tsx}'],
	displayName: 'unit',

}