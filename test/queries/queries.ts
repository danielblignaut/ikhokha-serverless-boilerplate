import { gql } from 'apollo-server-core'

export const shopNameQuery = gql`
	query {
		shop {
			name
		}
	}`
