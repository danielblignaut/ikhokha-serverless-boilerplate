import createServer from '@ikhokha/src/create-server'
import { APIGatewayProxyEvent, Callback, APIGatewayProxyResult, Context } from 'aws-lambda'
import {CustomContext} from '@ikhokha/typings/types'


const context: CustomContext = {

}

export const appFunction: (event: APIGatewayProxyEvent, context: Context, callback: Callback<APIGatewayProxyResult>)=> void = createServer(context)
