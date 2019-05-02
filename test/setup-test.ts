import * as dotenv from 'dotenv'
import {typeCheckConfig} from '../src/lib/config'

dotenv.config()

const testTypeCheckConfig = (): void => {
	if(typeof process.env.TEST__SERVER_URL != 'string') throw new Error('no server URL is set.')
}

typeCheckConfig()
testTypeCheckConfig()