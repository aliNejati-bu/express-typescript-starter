export class BaseAppError extends Error {
    constructor(msg,
                public originalError: any) {
        super(`App Error: ${msg}`);
    }
}