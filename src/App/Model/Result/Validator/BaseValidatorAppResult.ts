export class BaseValidatorAppResult<T> {
    constructor(
        public data: T,
        public messages: Array<{
            field: string,
            message: string
        }>,
        public isError: boolean
    ) {
    }
}