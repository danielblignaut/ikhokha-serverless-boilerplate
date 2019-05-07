import createEvent from 'aws-event-mocks'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { print } from 'graphql/language/printer'
import { DocumentNode } from 'graphql'

export default (httpMethod: 'GET' | 'POST',queryDoc: DocumentNode, variables: any): APIGatewayProxyEvent => {
	let body = null
	const query = print(queryDoc)
	if(httpMethod == 'POST') {
		body = JSON.stringify({
			query,
			variables
		})
	}

	const event = createEvent({
		template: 'aws:apiGateway',
		merge: {
			body,
			queryStringParameters: {
				query,
				variables
			},
			multiValueQueryStringParameters:{ },
			httpMethod,
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application'
			},
			path: '/',
			resource: '/',
		}
	})

	return event
}
