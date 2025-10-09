export class AppError {
	private _message: string;
	private _statusCode: number;

	constructor(message: string, statusCode: number) {
		this._message = message;
		this._statusCode = statusCode;
	}

	public get message(): string {
		return this._message;
	}

	public get statusCode(): number {
		return this._statusCode;
	}
}
