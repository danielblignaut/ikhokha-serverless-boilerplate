import typeCheckConfig from './type-check-config'

describe('validating env vars', () => {
	const OLD_ENV = process.env

	const mockConfig = (nodeEnv: any, token: any, tokenKey: any, apiUrl: any): void => {
		process.env = {
			...process.env,
			NODE_ENV: nodeEnv,
			PROXY_API_TOKEN: token,
			PROXY_API_TOKEN_KEY: tokenKey,
			PROXY_API_URL: apiUrl			
		} as NodeJS.ProcessEnv
	}
  
	beforeEach(() => {
		process.env = { ...OLD_ENV }
	})
  
	afterEach(() => {
		process.env = OLD_ENV
	})
  
	test('expect env vars to be string w/ valid NODE_ENV', () => {
		mockConfig('development','','','')		
		expect(typeCheckConfig).not.toThrowError()
	})

	test('test non-string PROXY_API_TOKEN', () => {
		mockConfig('development',undefined,'','')		
		expect(typeCheckConfig).toThrowError()
	})

	test('test non-string PROXY_API_TOKEN_KEY', () => {
		mockConfig('development','',undefined,'')		
		expect(typeCheckConfig).toThrowError()
	})

	test('test non-string PROXY_API_URL', () => {
		mockConfig('development','','',undefined)		
		expect(typeCheckConfig).toThrowError()
	})

	test('expect env vars to be string w/ null NODE_ENV', () => {
		mockConfig(undefined,'','','')		
		expect(typeCheckConfig).toThrowError()
	})

	test('expect env vars to be string w/ invalid NODE_ENV', () => {
		mockConfig('staging','','','')		
		expect(typeCheckConfig).toThrowError()
	})
})