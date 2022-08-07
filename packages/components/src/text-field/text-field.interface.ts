export type TextFieldType = "email" | "number" | "password" | "search" | "tel" | "text" | "url";

export interface TextFieldProps {
    id: string;
    name: string;
    label: string;
    type: TextFieldType;
    autofocus: boolean | string;
    disabled: boolean | string;
    readonly: boolean | string;
    required: boolean | string;
    modelValue: string;
    placeholder: string;
    leadingIcon: string;
    trailingIcon: string;
}
