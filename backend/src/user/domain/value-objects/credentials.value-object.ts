import { ValueObject } from "@keep/core";
import { flushErrors } from "@keep/validations";
import { IValueObjectReturn } from "src/common/interfaces";
import { EmailVo } from "src/common/value-objects";

export interface ICredentialsProps {
    email: string;
    password: string;
}

export class CredentialsVo extends ValueObject<ICredentialsProps> {
    private constructor(props: ICredentialsProps) {
        super(props);
    }

    public get value() {
        return this.props;
    }

    public static fromProps(credentialsDto: ICredentialsProps) {
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

        return [errors, instance] as IValueObjectReturn<ICredentialsProps, CredentialsVo>;
    }
}
