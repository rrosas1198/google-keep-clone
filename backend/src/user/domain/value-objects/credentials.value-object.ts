import { ValueObject } from "@keep/common";
import { flushErrors } from "@keep/validations";
import { ValueObjectReturn } from "src/common/interfaces";
import { EmailVo } from "src/common/value-objects";

export interface CredentialsProps {
    email: string;
    password: string;
}

export class CredentialsVo extends ValueObject<CredentialsProps> {
    private constructor(props: CredentialsProps) {
        super(props);
    }

    public get value() {
        return this.props;
    }

    public static fromProps(credentialsDto: CredentialsProps) {
        const [emailCodes, emailVo] = EmailVo.fromString(credentialsDto.email);

        const errors = flushErrors([
            {
                property: "email",
                codes: emailCodes,
                value: emailVo?.value
            }
        ]);

        const isValid = errors.every(error => error.codes.length <= 0);
        const instance = isValid ? new CredentialsVo(credentialsDto) : null;

        return [errors, instance] as ValueObjectReturn<CredentialsProps, CredentialsVo>;
    }
}
