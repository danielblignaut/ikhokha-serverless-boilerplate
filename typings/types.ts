import { ApolloLink } from 'apollo-link'
import { GraphQLSchema } from 'graphql'

export interface CustomContext {

}

export interface OperationsToKeep {
	Query: string[]
	Mutation: string[]
	[key: string]: string[]
}

export interface AwsServer {
	
}

export interface ProxyLinkHeaders {
	[key: string]: string
}

export interface ProxyLinkContext {
	headers: ProxyLinkHeaders
}


export interface TypesToKeep extends Array<string> {

}

export interface FsMock {
	__setMockFiles: (files: string[])=> void
	existsSync: (path: string)=> boolean
	ReadStream: Function
	WriteStream: Function
	promises: {
		writeFile: (path: string, content: string)=> Promise<void>
	}
}

export interface GraphQlToolsMock {
	introspectSchema: (link: ApolloLink)=> GraphQLSchema
}

export interface GraphQlMockError {

}

export interface GraphQlMockResult {
	body: string
}

export interface GraphQlMockResponseBody<T = any> {
	data: T
}