import { gql } from 'apollo-server-core'

export const shopNameQuery = gql`
	query {
		shop {
			name
		}
	}`

export const firstNProducts = gql`
query firstNProducts($first: Int!) {
	products(first: $first) {
	  edges {
		node {
		  id,
		  title
		}
	  }
	}
  }`