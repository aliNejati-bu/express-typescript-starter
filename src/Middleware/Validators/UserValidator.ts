import * as joi from 'joi';
import {BaseValidator} from "./BaseValidator";
import {BaseValidatorAppResult} from "../../App/Model/Result/Validator/BaseValidatorAppResult";



export class UserValidator extends BaseValidator {
    createUser<T>(input): BaseValidatorAppResult<T | null> {
        let schema = joi.object().keys({
            name: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().required()
        });
        return this.createResult<T>(schema, input);
    }
}