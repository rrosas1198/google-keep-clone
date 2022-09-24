export type ITextFieldType = "email" | "number" | "password" | "search" | "tel" | "text" | "url";

export interface ITextFieldProps {
    id: string;
    name: string;
    label: string;
    type: ITextFieldType;
    autofocus: boolean | string;
    disabled: boolean | string;
    inline: boolean | string;
    readonly: boolean | string;
    required: boolean | string;
    maxLength: string | number;
    modelValue: string;
    placeholder: string;
    leadingIcon: string;
    trailingIcon: string;
    error: boolean | string;
    errorText: string;
    showSupport: boolean | string;
    supportingText: string;
}
