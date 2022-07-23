export type TextFieldType = "email" | "number" | "password" | "search" | "tel" | "text" | "url";

export interface TextFieldProps {
    id: string;
    name: string;
    label: string;
    placeholder: string;
    type: TextFieldType;
    disabled: boolean | string;
    required: boolean | string;
    readonly: boolean | string;
}
