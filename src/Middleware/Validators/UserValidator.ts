import * as joi from 'joi';
import {BaseValidator} from "./BaseValidator";
import {BaseValidatorAppResult} from "../../App/Model/Result/Validator/BaseValidatorAppResult";
import {injectable} from "inversify";


@injectable()
export class UserValidator extends BaseValidator {
    createUser<T>(input): BaseValidatorAppResult<T | null> {
        let schema = joi.object().keys({
            name: joi.string().required().max(255),
            email: joi.string().email().required().max(255),
            password: joi.string().required().max(255)
        });
        return this.createResult<T>(schema, input);
    }

    getToken<T>(input): BaseValidatorAppResult<T | null> {
        let schema = joi.object().keys({
            email: joi.string().email().required().max(255),
            password: joi.string().required().max(255)
        });
        return this.createResult<T>(schema, input);
    }
}