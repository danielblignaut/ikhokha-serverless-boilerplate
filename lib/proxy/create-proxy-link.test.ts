import createProxyLink from './create-proxy-link'
import { ApolloLink } from 'apollo-link'
import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import { ProxyLinkHeaders } from '@ikhokha/typings/types'
import * as query from '@ikhokha/test/graphql-files/queries'

describe('create proxy link', () => {

	test('parse an invalid URL', () => {	
		expect(() => {
			createProxyLink('asdasdaasd.gooasdasdgle.com',{})
		}).toThrowError(Error)
	})

	test('parse a valid URL', () => {
		const link = createProxyLink('https://www.google.com',{})
		expect(link).toBeInstanceOf(ApolloLink)
	})

	test('parse environment URL', () => {
		const link = createProxyLink(process.env.PROXY_API_URL,{})
		expect(link).toBeInstanceOf(ApolloLink)
	})

	test('context setter coverage', async () => {
		let headers: ProxyLinkHeaders = {
			'acess-token' : 'asd'
		}

		const link = createProxyLink(process.env.PROXY_API_URL,headers)

		const client = new ApolloClient({
			link,
			cache: new InMemoryCache()
		})

		const responsePromise = client.query({
			query: query.shopNameQuery
		})

		await expect(responsePromise).rejects.toThrowError()
	})

	test('use test environment credentials', async () => {
		let headers: ProxyLinkHeaders = {
		}

		headers[process.env.PROXY_API_TOKEN_KEY] = process.env.PROXY_API_TOKEN

		const link = createProxyLink(process.env.PROXY_API_URL,headers)

		const client = new ApolloClient({
			link,
			cache: new InMemoryCache()
		})

		const responsePromise = client.query({
			query: query.shopNameQuery
		})

		await expect(responsePromise).resolves.toHaveProperty('data')
	})


})