import GraphQLPlayground from 'graphql-playground-middleware-lambda'
export const appFunction = GraphQLPlayground({ endpoint: '/' })