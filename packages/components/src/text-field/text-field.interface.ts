export type TextFieldType = "email" | "number" | "password" | "search" | "tel" | "text" | "url";

export interface TextFieldProps {
    id: string;
    name: string;
    label: string;
    type: TextFieldType;
    modelValue: string;
    placeholder: string;
    autofocus: boolean | string;
    disabled: boolean | string;
    required: boolean | string;
    readonly: boolean | string;
    leadingIcon: string;
    trailingIcon: string;
}
