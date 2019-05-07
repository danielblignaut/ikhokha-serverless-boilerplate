import createProxyLink from '@ikhokha/lib/proxy/create-proxy-link'
import typeDefs from '@ikhokha/generated/schema.graphql'
import { CustomContext, ProxyLinkHeaders } from '@ikhokha/typings/types'
import { ApolloServer, makeRemoteExecutableSchema } from 'apollo-server-lambda'
import typeCheckConfig from '@ikhokha/lib/config/type-check-config'
import { APIGatewayProxyEvent, Callback, APIGatewayProxyResult } from 'aws-lambda'
import { Context as LambdaContext } from 'aws-lambda'

function createServer(context: CustomContext): (event: APIGatewayProxyEvent, context: LambdaContext, callback: Callback<APIGatewayProxyResult>)=> void {
	typeCheckConfig()
	let linkHeaders: ProxyLinkHeaders = {
		
	}
	linkHeaders[process.env.PROXY_API_TOKEN_KEY] = process.env.PROXY_API_TOKEN
	const link = createProxyLink(process.env.PROXY_API_URL, linkHeaders)
	const schema = makeRemoteExecutableSchema({
		schema: typeDefs,
		link
	})
	const server = new ApolloServer({ schema, context })
	return server.createHandler({
		cors: {
			origin: true,
			credentials: true
		}
	})
}


export default createServer