import { IValidationResult, IValidationRule } from "src/interfaces";

export function flushRules<T>(rules: IValidationRule[]) {
    return (value: T): IValidationResult<T> => {
        const results = rules.map(rule => ({ code: rule.code, valid: rule.func(value) }));
        const errorCodes = results.filter(result => !result.valid).map(result => result.code);
        return { value, valid: errorCodes.length <= 0, codes: errorCodes };
    };
}
