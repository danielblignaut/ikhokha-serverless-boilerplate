
export interface CustomContext {

}

export interface OperationsToKeep {
	Query: string[]
	Mutation: string[]
	[key: string]: string[]
}

export interface AwsServer {
	
}

export interface ProxyLinkHeaders {
	[key: string]: string
}

export interface ProxyLinkContext {
	headers: ProxyLinkHeaders
}