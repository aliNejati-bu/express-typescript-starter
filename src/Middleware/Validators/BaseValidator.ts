import {BaseValidatorAppResult} from "../../App/Model/Result/Validator/BaseValidatorAppResult";

export class BaseValidator {
    protected createResult<T>(schema: any, input: any): BaseValidatorAppResult<T | null> {
        let result: BaseValidatorAppResult<T | null> = new BaseValidatorAppResult<T | null>(null, [], false);
        let validated = schema.validate(input, {abortEarly: false, allowUnknown: true});
        if (validated.error) {
            result.isError = true;
            validated.error.details.forEach(
                (val: any) => {
                    result.messages.push({
                        message: val.message,
                        field: val.path
                    })
                }
            )
        } else {
            result.isError = false;
            result.data = validated.value;
        }
        return result;
    }
}
