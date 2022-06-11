import {BaseValidator} from "./Validators/BaseValidator";
import {container} from "../Container";
import {BaseValidatorAppResult} from "../App/Model/Result/Validator/BaseValidatorAppResult";
import {baseResponse} from "../helpers/functions";

export function wrapValidatorToMiddleware(validator: Function): any {
    return (req, res, next) => {
        validator = validator.bind((container.get(BaseValidator) as BaseValidator));
        let validatorResult = validator(req.body) as BaseValidatorAppResult<any>;
        if (validatorResult.isError) {
            baseResponse(res, {messages: validatorResult.messages}, "validation filed.", null, "error", 400);
        }
        next();
    };
}