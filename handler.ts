import { startServer } from './src/helpers'

// TODO: no typing for the below
export const appFunction = startServer().createHandler({
	cors: {
		origin: true,
		credentials: true
	}
})
