// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
	...require('./jest-common-config'),
	testEnvironment: 'jest-environment-jsdom',
	testMatch: ['**/__client_tests__/**/*.{ts,js,jsx,tsx}'],
	displayName: 'client',
}