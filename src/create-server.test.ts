import createServer from './create-server'
import { CustomContext } from '@ikhokha/typings/types'
import * as typeCheckConfig from '@ikhokha/lib/config/type-check-config'
import * as createProxyLink from '@ikhokha/lib/proxy/create-proxy-link'
import { ApolloLink } from 'apollo-link'
import createMockSchema from '@ikhokha/test/create-mock-schema'
import * as apolloServerLambda from 'apollo-server-lambda'
const mockSchema = createMockSchema()

// @ts-ignore
apolloServerLambda.ApolloServer = jest.fn(() => {
	return {
		// eslint-disable-next-line
		createHandler: jest.fn()
	}
})

const makeRemoteSchemaExecutableMock = jest.spyOn(apolloServerLambda, 'makeRemoteExecutableSchema')
makeRemoteSchemaExecutableMock.mockImplementation(() => (mockSchema))

const configMock = jest.spyOn(typeCheckConfig, 'default')
configMock.mockImplementation(()=> {})


const proxyMock = jest.spyOn(createProxyLink, 'default')
proxyMock.mockImplementation(() => (new ApolloLink()))


describe('test create server', () => {
	let context: CustomContext 

	beforeEach(() => {
		process.env.PROXY_API_TOKEN = '123'
		process.env.PROXY_API_TOKEN_KEY = 'header'
		process.env.PROXY_API_URL = 'url'
		context = {}
	})

	test('successfully start server', () => {
		expect(createServer(context)).toBe(undefined)
	})
})