import * as typeDefs from '@ikhokha/test/graphql-files/typeDefs'
import filterSchema from '@ikhokha/lib/cli-tools/filter-schema'
import { OperationsToKeep, TypesToKeep } from '@ikhokha/typings/types'
import { makeExecutableSchema } from 'graphql-tools'
import { printSchema, GraphQLSchema } from 'graphql'

describe('filter schema', () => {
	let operationsToKeep: OperationsToKeep
	let typesToKeep: TypesToKeep
	let schema: GraphQLSchema 

	beforeEach(() => {
		operationsToKeep  = {
			Query: ['getAuthorById', 'getPosts'],
			Mutation: ['deletePost', 'editAuthor']
		}
		typesToKeep = ['Post']
		schema = makeExecutableSchema({ typeDefs: typeDefs.example })
	})

	test('give a valid filter and schema', () => {
		let filteredSchema = filterSchema(schema,operationsToKeep, typesToKeep)
		expect(printSchema(filteredSchema)).toMatchSnapshot()
	})

	test('give no query / mutation filters', () => {
		operationsToKeep = {
			Query: [],
			Mutation: []
		}
		let filteredSchema = filterSchema(schema,operationsToKeep, typesToKeep)
		expect(printSchema(filteredSchema)).toMatchSnapshot()
	})

	test('give no type filters', () => {
		typesToKeep = []
		let filteredSchema = filterSchema(schema,operationsToKeep, typesToKeep)
		expect(printSchema(filteredSchema)).toMatchSnapshot()
	})

	test('give one type filters', () => {
		typesToKeep = [
			'Author',
			'Int',
			'String'
		]
		let filteredSchema = filterSchema(schema,operationsToKeep, typesToKeep)
		expect(printSchema(filteredSchema)).toMatchSnapshot()
	})

	test('give invalid query filter', () => {
		operationsToKeep = {
			Query: ['fetchDog'],
			Mutation: []
		}		
		expect(() => filterSchema(schema, operationsToKeep, typesToKeep)).toThrowError()
	})

	test('give invalid type filter', () => {
		typesToKeep = ['NotReal']
		
		expect(() => filterSchema(schema, operationsToKeep, typesToKeep)).toThrowError()
	})

	test('give invalid mutation filter', () => {
		operationsToKeep = {
			Query: [],
			Mutation: ['fetchDog']
		}
		
		expect(() => filterSchema(schema, operationsToKeep, typesToKeep)).toThrowError()
	})

	test('give mutation filters but no mutations on schema', () => {
		operationsToKeep = {
			Query: [],
			Mutation: ['editAuthor']
		}		
		schema = makeExecutableSchema({typeDefs: typeDefs.exampleWithoutQueryAndMutation})
		expect(() => filterSchema(schema, operationsToKeep, typesToKeep)).toThrowError()
	})

	test('give query filters but no mutations on schema', () => {
		operationsToKeep = {
			Query: ['getPosts'],
			Mutation: []
		}
		schema = makeExecutableSchema({typeDefs: typeDefs.exampleWithoutQueryAndMutation})
		expect(() => filterSchema(schema, operationsToKeep, typesToKeep)).toThrowError()
	})

	test('pass invalid filter key', () => {
		operationsToKeep = {
			Query: [],
			Mutation: [],
			randomKey: []
		}
		
		expect(() => filterSchema(schema, operationsToKeep, typesToKeep)).toThrowError()
	})


})