export class BaseDataError extends Error {
    constructor(message: string,public originalError?: Error) {
        super();
    }
}