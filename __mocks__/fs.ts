import path, { basename } from 'path'
import { FsMock } from '../typings/types'

const fs = jest.genMockFromModule<FsMock>('fs')

// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.
let mockFiles = Object.create(null)
fs.__setMockFiles = (newMockFiles: string[]): void => {
	
	for (const file in newMockFiles) {
		const fileArr = file.split('/')

		if(fileArr[fileArr.length-1].indexOf('.') == -1) {
			if(!mockFiles[file]) {
				mockFiles[file]  = []
			}
		}
		else {
			const dir = path.dirname(file)
			const basname = path.basename(file)

			if(!mockFiles[dir]) {
				mockFiles[dir]  = []
			}

			mockFiles[dir].push(basename)
		}
	
	}
}



fs.existsSync = (path: string): boolean => {
	return typeof mockFiles[path] !== 'undefined'
}

fs.promises = {
	writeFile: (path: string, file: string): Promise<void> => {
		return new Promise((resolve, reject): void => resolve())
	}
}


class A {
}

fs.ReadStream = A
fs.WriteStream = A

module.exports = fs