import { makeRemoteExecutableSchema } from 'graphql-tools'
import { createLink } from './index'
import { ApolloLink } from 'apollo-link'
import { GraphQLSchema } from 'graphql'

export default (
	schema: string,
	url: string,
	token: string,
	tokenKey: string
): GraphQLSchema => {
	const link: ApolloLink = createLink(url, token, tokenKey)

	const executableSchema = makeRemoteExecutableSchema({
		schema,
		link
	})

	if (typeof executableSchema === 'undefined') {
		throw new Error(`Could not get the Shopify schema at url: ${url}`)
	}

	return executableSchema
}
