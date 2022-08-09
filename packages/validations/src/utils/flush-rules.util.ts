import { ValidationResult, ValidationRule } from "src/interfaces";

export function flushRules<T>(rules: ValidationRule[]) {
    return (value: T): ValidationResult<T> => {
        const results = rules.map(rule => ({ code: rule.code, valid: rule.func(value) }));
        const errorCodes = results.filter(result => !result.valid).map(result => result.code);
        return { value, valid: errorCodes.length <= 0, codes: errorCodes };
    };
}
