import { createExecutableSchema, typeDefs } from './../proxy'
import { CustomContext } from './../../../typings/types'
import { ApolloServer } from 'apollo-server-lambda'
import { devTypeCheckConfig, productionTypeCheckConfig } from './../config'
import { APIGatewayProxyEvent, Callback, APIGatewayProxyResult } from 'aws-lambda'
import { Context as LambdaContext } from 'aws-lambda'

function createServer(context: CustomContext): (event: APIGatewayProxyEvent, context: CustomContext, callback: Callback<APIGatewayProxyResult>)=> void {

	if(process.env.NODE_ENV == 'development') {
		devTypeCheckConfig()
	}
	else if(process.env.NODE_ENV == 'production') {
		productionTypeCheckConfig()
	}

	const schema = createExecutableSchema(
		typeDefs,
		'asdasd',
		process.env.PROXY_API_TOKEN,
		process.env.PROXY_API_TOKEN_KEY
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