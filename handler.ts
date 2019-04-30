import {createServer} from './src/lib/server'
import { APIGatewayProxyEvent, Callback, APIGatewayProxyResult, Context } from 'aws-lambda'
import {CustomContext} from './typings/types'


const context: CustomContext = {

}



export const appFunction: (event: APIGatewayProxyEvent, context: Context, callback: Callback<APIGatewayProxyResult>)=> void = createServer(context)
