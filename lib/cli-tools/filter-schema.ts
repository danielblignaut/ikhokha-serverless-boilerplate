
import { GraphQLSchema, GraphQLNamedType } from 'graphql'
import {
	transformSchema,
	FilterRootFields,
	FilterTypes,
} from 'graphql-tools'
import { RootFilter } from 'graphql-tools/dist/transforms/FilterRootFields'
import { OperationsToKeep, TypesToKeep } from '@ikhokha/typings/types'

export default (schema: GraphQLSchema, operationsToKeep: OperationsToKeep, typesToKeep: TypesToKeep): GraphQLSchema => {
	Object.keys(operationsToKeep).forEach((key): void => {
		if(key != 'Query' && key != 'Mutation') throw new Error(`${key} is not a valid operation key`)	
	})

	const querytype = schema.getQueryType()
	const mutationtype = schema.getMutationType()

	if(querytype == null && operationsToKeep.Query.length > 0) throw new Error('there are no queries on the schema to filter')
	if(mutationtype == null && operationsToKeep.Mutation.length > 0) throw new Error('there are no queries on the schema to filter')

	if(operationsToKeep.Query.length > 0 && querytype != null) {
		operationsToKeep.Query.forEach((val): void => {
			if(typeof querytype.getFields()[val] === 'undefined') throw new Error(`${val} is not a query on the schema`)
		})
	}

	if(operationsToKeep.Mutation.length > 0 && mutationtype != null) {
		operationsToKeep.Mutation.forEach((val): void => {
			if(typeof mutationtype.getFields()[val] === 'undefined') throw new Error(`${val} is not a mutation on the schema`)
		})
	}

	if(typesToKeep.length > 0) {
		const typeMap = schema.getTypeMap()
		typesToKeep.forEach((val): void => {
			if(typeof typeMap[val] === 'undefined') throw new Error(`${val} is not a valid type`)
		})
	}

	const removeRootQueriesAndMutations = (operationsToKeep: OperationsToKeep): RootFilter => {
		
		return (
			operation: 'Query' | 'Mutation' | 'Subscription',
			fieldName: string): boolean => {
			return typeof operationsToKeep[operation] != 'undefined' && operationsToKeep[operation].indexOf(fieldName) > -1
				? true
				: false
		}
	}

	const removeUnusedTypes = (type: GraphQLNamedType): boolean => {
		const name = type.name
		if(typesToKeep.length == 0) return true

		return typesToKeep.indexOf(name) > -1 ? true : false
	}

	return transformSchema(schema, [
		new FilterRootFields(removeRootQueriesAndMutations(operationsToKeep)),
		new FilterTypes(removeUnusedTypes)
	])
}