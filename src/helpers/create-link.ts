import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { ApolloLink } from 'apollo-link'
import fetch from 'node-fetch'

export default (shopifyUrl: string, shopifyToken: string): ApolloLink => {
	// Apollo has no fix for the below typings hack :(
	const fetchHack: GlobalFetch['fetch'] = (fetch as unknown) as GlobalFetch['fetch']

	const httpLink: HttpLink = new HttpLink({
		uri: shopifyUrl,
		fetch: fetchHack
	})

	interface LinkHeaders {
		headers: {
			[key: string]: string
		}
	}

	const middlewareLink: ApolloLink = setContext((): LinkHeaders => ({
		headers: {
			'X-Shopify-Storefront-Access-Token': shopifyToken
		}
	}))

	const link: ApolloLink = middlewareLink.concat(httpLink)

	return link
}
