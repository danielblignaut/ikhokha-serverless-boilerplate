import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { ApolloLink } from 'apollo-link'
import fetch from 'node-fetch'

export default (url: string, token: string, tokenKey: string): ApolloLink => {
	// Apollo has no fix for the below typings hack :(
	const fetchHack: GlobalFetch['fetch'] = (fetch as unknown) as GlobalFetch['fetch']

	const httpLink: HttpLink = new HttpLink({
		uri: url,
		fetch: fetchHack
	})

	interface LinkHeaders {
		headers: {
			[key: string]: string
		}
	}

	let linkMiddlewareArgs: LinkHeaders = {
		headers: {

		}
	}

	linkMiddlewareArgs.headers[tokenKey] = token

	const middlewareLink: ApolloLink = setContext((): LinkHeaders => (linkMiddlewareArgs))

	const link: ApolloLink = middlewareLink.concat(httpLink)

	return link
}
