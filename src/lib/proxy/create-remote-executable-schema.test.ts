import createRemoteExecutableSchema from './create-remote-executable-schema'
import { ApolloLink } from 'apollo-link'
import * as graphqlTools from 'graphql-tools'

describe('create remote executable schema', () => {
	test('parse an invalid schema', () => {

		jest.mock('apollo-link')
		const apolloLink = <jest.Mock<ApolloLink>>ApolloLink

		Object.defineProperty(graphqlTools, 'makeRemoteExecutableSchema', jest.fn(() => null))

		createRemoteExecutableSchema('', client)
	})	
})