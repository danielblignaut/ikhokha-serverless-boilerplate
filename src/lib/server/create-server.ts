import { createRemoteExecutableSchema, typeDefs, createProxyLink } from './../proxy'
import { CustomContext, ProxyLinkHeaders } from './../../../typings/types'
import { ApolloServer } from 'apollo-server-lambda'
import { typeCheckConfig } from './../config'
import { APIGatewayProxyEvent, Callback, APIGatewayProxyResult } from 'aws-lambda'
import { Context as LambdaContext } from 'aws-lambda'

function createServer(context: CustomContext): (event: APIGatewayProxyEvent, context: LambdaContext, callback: Callback<APIGatewayProxyResult>)=> void {

	typeCheckConfig()

	let linkHeaders: ProxyLinkHeaders = {
		
	}
	linkHeaders[process.env.PROXY_API_TOKEN_KEY] = process.env.PROXY_API_TOKEN

	const apolloLink = createProxyLink(process.env.PROXY_API_URL, linkHeaders)

	const schema = createRemoteExecutableSchema(
		typeDefs,
		apolloLink
	)


	const server = new ApolloServer({ schema, context })
	
	// TODO: no typing for the below
	return server.createHandler({
		cors: {
			origin: true,
			credentials: true
		}
	})
}


export default createServer