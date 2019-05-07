import * as filterSchema from '@ikhokha/lib/cli-tools/filter-schema'
import saveRemoteSchema from '@ikhokha/lib/cli-tools/save-remote-schema'
import { OperationsToKeep, TypesToKeep } from '@ikhokha/typings/types'
import createMockSchema from '@ikhokha/test/create-mock-schema'
import * as createProxyLink from '@ikhokha/lib/proxy/create-proxy-link'
import { ApolloLink } from 'apollo-link'
import * as graphqlTools from 'graphql-tools'
import { GraphQLSchema } from 'graphql'

jest.mock('fs')
const mockSchema = createMockSchema()

const filterMock = jest.spyOn(filterSchema, 'default')
filterMock.mockImplementation(() => (mockSchema))

const proxyMock = jest.spyOn(createProxyLink, 'default')
proxyMock.mockImplementation(() => (new ApolloLink()))

const introspectSchemaMock = jest.spyOn(graphqlTools, 'introspectSchema')
introspectSchemaMock.mockImplementation((): Promise<GraphQLSchema> => (new Promise((resolve, reject) => (resolve(mockSchema)))))

describe('save remote schema', () => {
	let operationsToKeep: OperationsToKeep
	let typesToKeep: TypesToKeep
	let url: string
	let token: string
	let tokenKey: string
	let path: string

	beforeEach(() => {
		process.env.PWD = '/test'

		const MOCK_FILE_INFO = {
			[process.env.PWD + '/src/generated']: {},
			['.']: {}
		}
		require('fs').__setMockFiles(MOCK_FILE_INFO)

		operationsToKeep = {
			Query: [],
			Mutation: []
		}
		typesToKeep = []
		url = 'https://www.google.com'
		token = 'https://www.google.com'
		tokenKey = 'https://www.google.com'
		path = 'src/generated/file.graphql'
	})

	afterAll(() => {
		
	})

	test('successful save remote schema', async () => {
		await expect(saveRemoteSchema(url, token, path, tokenKey,operationsToKeep, typesToKeep)).resolves.toBe(undefined)
	})

	test('invalid URL  as number', async () => {
		// @ts-ignore
		url = 123
		await expect(saveRemoteSchema(url, token, path, tokenKey,operationsToKeep, typesToKeep)).rejects.toThrowError()
	})

	test('invalid URL  as bad string', async () => {
		url = '123'
		await expect(saveRemoteSchema(url, token, path, tokenKey,operationsToKeep, typesToKeep)).rejects.toThrowError()
	})

	test('invalid token  as number', async () => {
		// @ts-ignore
		token = 123
		await expect(saveRemoteSchema(url, token, path, tokenKey,operationsToKeep, typesToKeep)).rejects.toThrowError()

		return expect(true).toBe(true)
	})

	test('invalid token key  as number', async () => {
		// @ts-ignore
		tokenKey = 123
		await expect(saveRemoteSchema(url, token, path, tokenKey,operationsToKeep, typesToKeep)).rejects.toThrowError()

		return expect(true).toBe(true)
	})

	test('invalid path as number', async () => {
		// @ts-ignore
		path = 123
		await expect(saveRemoteSchema(url, token, path, tokenKey,operationsToKeep, typesToKeep)).rejects.toThrowError()

	})

	test('invalid PWD', async () => {
		// @ts-ignore
		process.env.PWD = 123
		await expect(saveRemoteSchema(url, token, path, tokenKey,operationsToKeep, typesToKeep)).rejects.toThrowError()

	})

	test('non-existant string path', async () => {
		path = '/i/do/not/exist'
		await expect(saveRemoteSchema(url, token, path, tokenKey,operationsToKeep, typesToKeep)).rejects.toThrowError()

	})

	test('invalid  string path', async () => {
		path = '.'
		await expect(saveRemoteSchema(url, token, path, tokenKey,operationsToKeep, typesToKeep)).rejects.toThrowError()

	})

	test('invalid file extension', async () => {
		path = '/src/generated/file.txt'
		await expect(saveRemoteSchema(url, token, path, tokenKey,operationsToKeep, typesToKeep)).rejects.toThrowError()

	})

	test('invalid file name', async () => {
		path = '/src/generated/.graphql'
		await expect(saveRemoteSchema(url, token, path, tokenKey,operationsToKeep, typesToKeep)).rejects.toThrowError()

	})

})