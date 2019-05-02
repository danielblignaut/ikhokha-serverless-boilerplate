class InvalidUriError extends Error {
	public constructor(message: string) {
		super(message)
		this.name = 'InvalidUriError'
	}
}

export { InvalidUriError }