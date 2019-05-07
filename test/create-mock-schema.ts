import * as gqlTools from 'graphql-tools'
import * as typeDefs from '@ikhokha/test/graphql-files/typeDefs'
import { GraphQLSchema } from 'graphql'
const schema = gqlTools.makeExecutableSchema({
	typeDefs: typeDefs.example
})

gqlTools.addMockFunctionsToSchema({
	schema
})

const mock = jest.spyOn(gqlTools, 'introspectSchema')
mock.mockImplementation(async (): Promise<any> => { 
	return schema
})

export default (): GraphQLSchema => (schema)