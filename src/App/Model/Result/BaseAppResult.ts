import {ResultStatus} from "./ResultStatus";

export class BaseAppResult<TResult> {
    constructor(
        public result: TResult,
        public isError: boolean,
        public message: string,
        public ResultStatus: ResultStatus
    ) {
    }
}