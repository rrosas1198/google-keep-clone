import { ValueObject } from "@keep/common";
import { flushRules, isString, isValidEmail, notBlank } from "@keep/validations";
import { MonoValueObjectReturn } from "../interfaces";

export class EmailVo extends ValueObject<string> {
    private constructor(value: string) {
        super({ value });
    }

    public get value() {
        return this.props.value;
    }

    public static fromString(value: string) {
        const { codes, valid } = this.validate(value);
        const instance = valid ? new EmailVo(value) : null;
        return [codes, instance] as MonoValueObjectReturn<EmailVo>;
    }

    private static validate(value: string) {
        const rules = flushRules([isString, notBlank, isValidEmail]);
        return rules(value);
    }
}
