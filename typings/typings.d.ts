declare module '*.graphql' {
	const content: any
	export default content
}

declare module '*.json' {
	const content: any
	export default content
}

declare module 'serverless-webpack' {
	const lib: {
		webpack: {
			isLocal: boolean
		}
		
		entries: any
	}
	export { lib }
}
