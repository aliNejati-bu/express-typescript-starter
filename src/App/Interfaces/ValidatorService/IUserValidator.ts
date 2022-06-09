import {BaseValidatorAppResult} from "../../Model/Result/Validator/BaseValidatorAppResult";

export interface IUserValidator {
    validateUser<T>(data: any): Promise<BaseValidatorAppResult<T>>;
}