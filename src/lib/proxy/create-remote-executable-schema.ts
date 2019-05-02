import { makeRemoteExecutableSchema } from 'graphql-tools'
import { ApolloLink } from 'apollo-link'
import { GraphQLSchema } from 'graphql'

export default (
	schema: string,
	link: ApolloLink
): GraphQLSchema => {

	const executableSchema = makeRemoteExecutableSchema({
		schema,
		link
	})

	if (executableSchema instanceof GraphQLSchema != true) {
		throw new Error('Could not turn the graphQL API into a schema... something wrong :(')
	}

	return executableSchema
}
