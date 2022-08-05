export type CheckboxColor = "primary" | "secondary" | "tertiary";

export type CheckboxValue = number | string | boolean;

export interface CheckboxProps {
    id: string;
    name: string;
    color: CheckboxColor;
    autofocus: boolean | string;
    checked: boolean | string;
    disabled: boolean | string;
    indeterminate: boolean | string;
    value: CheckboxValue;
    modelValue: CheckboxValue;
    ariaLabel: string;
}
