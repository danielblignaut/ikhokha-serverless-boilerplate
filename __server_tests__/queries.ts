import {appFunction} from '../handler'
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import { Context } from 'aws-lambda'
import createLambdaContext from '@ikhokha/test/create-lambda-context'
import createLambdaEvent from '@ikhokha/test/create-lambda-event'
import * as queries from '@ikhokha/test/graphql-files/queries'
import * as mutations from '@ikhokha/test/graphql-files/mutations'
import { GraphQlMockError, GraphQlMockResult, GraphQlMockResponseBody } from '@ikhokha/typings/types'


describe('test Shopify Queries', () => {
	let event: APIGatewayEvent
	let context: Context
	let callback: Function

	test('succesfully get first product', (done)=>{

		const callback = (error: string | Error | null | undefined, result: APIGatewayProxyResult | undefined) => {
			if(typeof result === 'undefined') return
			
			const body = JSON.parse(result.body) as GraphQlMockResponseBody
			expect(body.data).toMatchSnapshot()
			done()
		}
		
		event = createLambdaEvent('GET',queries.firstNProducts,{
			first: 1
		})
		context = createLambdaContext({}, callback)
		const app = appFunction(event, context, callback)
	})

})