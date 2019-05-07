export default (): void => {

	if(typeof process.env.PROXY_API_URL !== 'string') throw new Error('Proxy API URL is not defined')
	if(typeof process.env.PROXY_API_TOKEN !== 'string') throw new Error('Proxy API Token is not defined')
	if(typeof process.env.PROXY_API_TOKEN_KEY !== 'string') throw new Error('Proxy API Token Key is not defined')
	if(typeof process.env.NODE_ENV !== 'string') throw new Error('NODE_ENV is not defined')

	if(process.env.NODE_ENV != 'development' && process.env.NODE_ENV != 'production' && process.env.NODE_ENV != 'test') throw new Error('NODE_ENV is set to an invalid value')
}
