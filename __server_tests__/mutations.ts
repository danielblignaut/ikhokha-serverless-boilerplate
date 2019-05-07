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

	test('create a checkout', (done)=>{

		const callback = (error: string | Error | null | undefined, result: APIGatewayProxyResult | undefined) => {
			if(typeof result === 'undefined') return
			
			const body = JSON.parse(result.body) as GraphQlMockResponseBody
			expect(body.data).toMatchSnapshot({
				checkoutCreate: {
					checkout: {
						id: expect.any(String)
					}
				}
			})
			done()
		}
		event = createLambdaEvent('POST',mutations.createCheckout,{
			email: 'daniel@ucook.co.za',
			note: 'this is my test note!!!'
		})
		context = createLambdaContext({}, callback)
		const app = appFunction(event, context, callback)
	})
})