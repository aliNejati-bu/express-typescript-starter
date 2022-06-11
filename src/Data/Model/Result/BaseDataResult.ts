export class BaseDataResult<T> {
    constructor(
        public data: T,
        public isError: boolean,
        public isSuccessQuery: boolean = true
    ) {
    }
}