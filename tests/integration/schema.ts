import { request } from 'graphql-request'
import * as customenv from 'custom-env'


customenv.env(true)

const query = `query {
	products(first: 20) {
	  edges {
		node {
		  id,
		  title
		}
	  }
	}
  }`


if(typeof process.env.SERVER_URL != 'string') throw new Error('no server URL is set.')

request(process.env.SERVER_URL, query).then((data: {}) => {
	console.log(data)
})