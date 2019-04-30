import createLink from '../src/lib/proxy/create-link'
import { ApolloLink } from 'apollo-link'
import * as fs from 'fs'
import { promisify } from 'util'
import { printSchema } from 'graphql'
import minimist = require('minimist')
/* 
	FETCH SCHEMA
*/
import { introspectSchema } from 'graphql-tools'

const fetchSchema = async (link: ApolloLink): Promise<GraphQLSchema> => {
	const schema: GraphQLSchema = await introspectSchema(link)

	return schema
}

/*
	FILTER SCHEMA
*/

import { GraphQLSchema } from 'graphql'
import {
	transformSchema,
	FilterRootFields} from 'graphql-tools'
import { RootFilter } from 'graphql-tools/dist/transforms/FilterRootFields'
import { OperationsToKeep } from '../typings/types'

const removeRootQueriesAndMutations: RootFilter = (
	operation: 'Query' | 'Mutation' | 'Subscription',
	fieldName: string): boolean => {
	

	const operationsToKeep: OperationsToKeep = {
		Query: ['collections', 'productTypes', 'products'],
		Mutation: [
			'checkoutCreate',
			'checkoutDiscountCodeApplyV2',
			'checkoutDiscountCodeRemove',
			'checkoutEmailUpdateV2',
			'checkoutGiftCardApply',
			'checkoutGiftCardRemoveV2',
			'checkoutGiftCardsAppend',
			'checkoutLineItemsAdd',
			'checkoutLineItemsRemove',
			'checkoutLineItemsUpdate',
			'checkoutLineItemsReplace',
			'checkoutShippingAddressUpdateV2',
			'checkoutCompleteFree',
			'checkoutCompleteWithCreditCardV2',
			'checkoutCompleteWithTokenizedPaymentV2'
		]
	}

	return typeof operationsToKeep[operation] !== 'undefined' &&
		operationsToKeep[operation].indexOf(fieldName) > -1
		? true
		: false
}

const filterSchema = (schema: GraphQLSchema): GraphQLSchema => {
	return transformSchema(schema, [
		new FilterRootFields(removeRootQueriesAndMutations)
	])
}

/*
	CLI TOOL
*/

const run = async (): Promise<void> => {
	const argv: minimist.ParsedArgs = minimist(process.argv)

	if (typeof argv['url'] === 'undefined')
		throw new Error('--url flag must be set')
	if (typeof argv['token'] === 'undefined')
		throw new Error('--token flag must be set')
	if (typeof argv['path'] === 'undefined')
		throw new Error('--path flag must be set')
	if (typeof argv['token-key'] === 'undefined')
		throw new Error('--token-key flag must be set')

	const link: ApolloLink = createLink(argv['url'], argv['token'], argv['token-key'] )
	const writeFile = promisify(fs.writeFile)

	let schema: GraphQLSchema = await fetchSchema(link)
	schema = filterSchema(schema)

	let schemaString: string = printSchema(schema)

	await writeFile(argv['path'], schemaString)

	console.log('successfully saved schema!')
}

run().catch((err): void => {
	console.log(err)
})
