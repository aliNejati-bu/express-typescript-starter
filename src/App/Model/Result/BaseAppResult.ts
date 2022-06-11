export class BaseAppResult<TResult> {
    constructor(
        public result: TResult,
        public isError: boolean,
        public message: string
    ) {
    }
}