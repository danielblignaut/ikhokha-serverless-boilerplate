import { Context } from 'aws-lambda'

interface GraphQlResult<t=any> {
	data: t
}
interface LambdaContextOptions {
	functionName?: string | null
	functionVersion?: string | null
	invokedFunctionArn?: string | null
	memoryLimitInMB?: number | null
	awsRequestId?: string | null
	logGroupName?: string | null
	logStreamName?: string | null
	identity?: any | null
	clientContext?: any | null
	timeInMillis?: number | null


}
export default (options: LambdaContextOptions, cb: Function): Context => {
	return {
		functionName:       options.functionName       || '',
		functionVersion:    options.functionVersion    || '',
		invokedFunctionArn: options.invokedFunctionArn || '',
		memoryLimitInMB:    options.memoryLimitInMB    || 0,
		awsRequestId:       options.awsRequestId       || '',
		logGroupName:       options.logGroupName       || '',
		logStreamName:      options.logStreamName      || '',
		identity:           options.identity           || {},
		clientContext:      options.clientContext      || {},
		timeInMillis:       options.timeInMillis       || 0,
		//@ts-ignore
		succeed: function (result: GraphQlResult): Function {
			if (result === undefined) {
				return cb(null)
			} else {
				if (typeof result !== 'string'){
					return cb(JSON.stringify(result))
				} else {
					return cb(result)
				}
			}
		},
		fail: function (error): Function {
			if (error === undefined) {
				return cb(null)
			} else {
				return cb(error)
			}
		},
		done: function (err, result): Function {
			if (err) {
				// @ts-ignore
				return this.fail(err)
			} else {
				// @ts-ignore
				return this.succeed(result)
			}
		},
		getRemainingTimeInMillis: function(): number {
			if (typeof options.timeInMillis === 'undefined' || typeof options.timeInMillis !== 'number') {
				return 0
			} else {
				return options.timeInMillis
			}
		},
		
	}
}