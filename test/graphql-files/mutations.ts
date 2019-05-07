import { gql } from 'apollo-server-core'

export const createCheckout = gql`
mutation makeCheckout($email: String!, $note: String!) {
	checkoutCreate(input: {
	  email: $email,
	  note:$note
	}) {
	  checkout {
		note,
		email
		id
	  }
	}
  }
`  