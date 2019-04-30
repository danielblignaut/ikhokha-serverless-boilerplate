declare module 'serverless-offline'
declare module 'serverless-webpack'
declare module 'custom-env' 

declare module '*.json' {
	const content: any
	export default content
}

declare module '*.graphql' {
	const content: any
	export default content
}

declare namespace NodeJS {
	interface ProcessEnv {
		PROXY_API_URL: string
		PROXY_API_TOKEN: string
		PROXY_API_TOKEN_KEY: string
		SERVER_URL: string
		NODE_ENV: 'production' | 'test' | 'development'
	}
}