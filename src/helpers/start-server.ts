import { ApolloServer } from 'apollo-server-lambda'
import { createExecutableSchema, typeDefs } from './index'

export default (): ApolloServer => {
	const SHOPIFY_API_TOKEN = 'd2696157b6d517907338605169b708d3'
	const SHOPIFY_API_URL = 'https://ikhokha.myshopify.com/api/graphql'
	const schema = createExecutableSchema(
		typeDefs,
		SHOPIFY_API_URL,
		SHOPIFY_API_TOKEN
	)

	const server = new ApolloServer({ schema })

	return server
}
