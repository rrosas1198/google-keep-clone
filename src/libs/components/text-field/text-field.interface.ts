export type ITextFieldInputModel = "email" | "tel" | "url" | "numeric";

export type ITextFieldType = "email" | "number" | "password" | "search" | "tel" | "text" | "url";

export interface ITextFieldProps {
    autocomplete: boolean;
    autofocus: boolean;
    disabled: boolean;
    error: boolean;
    errorMessage: string;
    id: string;
    inputMode: ITextFieldInputModel;
    label: string;
    maxLength: number;
    modelValue: string;
    name: string;
    placeholder: string;
    readonly: boolean;
    required: boolean;
    showLabel: boolean;
    showSupport: boolean;
    supportingText: string;
    type: ITextFieldType;
}
