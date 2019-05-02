import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { ApolloLink } from 'apollo-link'
import fetch from 'node-fetch'
import { ProxyLinkContext, ProxyLinkHeaders } from '../../../typings/types'
import * as validUrl from 'valid-url'
import { InvalidUriError } from '../exceptions'

export default (url: string, headers: ProxyLinkHeaders): ApolloLink => {

	if(!validUrl.isUri(url)) throw new InvalidUriError(`${url} is not a valid url`)

	// Apollo has no fix for the below typings hack :(
	const fetchHack: GlobalFetch['fetch'] = (fetch as unknown) as GlobalFetch['fetch']

	const httpLink: HttpLink = new HttpLink({
		uri: url,
		fetch: fetchHack
	})
	
	let linkMiddlewareArgs: ProxyLinkContext = {
		headers
	}

	const middlewareLink: ApolloLink = setContext((): ProxyLinkContext => (linkMiddlewareArgs))

	const link: ApolloLink = middlewareLink.concat(httpLink)
	
	return link
}
