import createProxyLink from '@ikhokha/lib/proxy/create-proxy-link'
import { ApolloLink } from 'apollo-link'
import * as fs from 'fs'
import { printSchema, GraphQLSchema } from 'graphql'
import { ProxyLinkHeaders, OperationsToKeep, TypesToKeep } from '@ikhokha/typings/types'
import { introspectSchema } from 'graphql-tools'
import filterSchema from '@ikhokha/lib/cli-tools/filter-schema'
import * as validUrl from 'valid-url'

export default async (url: string, token: string, path: string, tokenKey: string, operationsToKeep: OperationsToKeep, typesToKeep: TypesToKeep): Promise<void> => {
	if(typeof url != 'string') throw new Error(`${url} is not a valid string`)
	if(typeof token != 'string') throw new Error(`${token} is not a valid string`)
	if(typeof path != 'string') throw new Error(`${path} is not a valid path`)
	if(typeof tokenKey != 'string') throw new Error(`${tokenKey} is not a valid string`)
	if(!validUrl.isUri(url)) throw new Error(`${url} is not a valid url`)

	const pathArr = path.split('/')

	if(pathArr.length <= 1) throw new Error(`${path} must contain relative directory`)

	let pathString = process.env.PWD + ''
	const fileName = pathArr[pathArr.length-1]
	const fileNameArr = fileName.split('.')

	if(typeof fileNameArr !== 'undefined' && fileNameArr.length > 0 && fileNameArr[0] === '') {

		throw new Error(`${path} must have a valid name`)

	}


	pathArr.splice(-1,1)
	pathArr.forEach((val): void => {
		if(val !== '') {
			pathString += '/' + val
		}
	})

	if(!fs.existsSync(pathString)) throw new Error(`${pathString} does not exist`)
	
	pathString +='/'

	path = pathString + fileName
	
	const re = /(?:\.([^.]+))?$/
	const extensionArr = re.exec(path)
	if(extensionArr== null || extensionArr[1] !== 'graphql') throw new Error(`${path} must have .graphql as an extension`)


	let linkHeaders: ProxyLinkHeaders = {
	
	}
	linkHeaders[tokenKey] = token
	const link: ApolloLink = createProxyLink(url, linkHeaders)
	let schema: GraphQLSchema = await introspectSchema(link)
	schema = filterSchema(schema, operationsToKeep, typesToKeep)
	// appsync doesn't like """ comments, need to use #
	let schemaString: string = printSchema(schema, { commentDescriptions: true })

	const res = await fs.promises.writeFile(path, schemaString)
	console.log('successfully saved schema!')
}

