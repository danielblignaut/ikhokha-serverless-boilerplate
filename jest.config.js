module.exports = {
	...require('./test/config/jest-common-config'),
	projects: ['./test/config/jest.client.config.js', './test/config/jest.server.config.js', './test/config/jest.unit.config.js'],
}