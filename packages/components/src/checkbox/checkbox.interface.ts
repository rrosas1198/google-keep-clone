export type ICheckboxValue = number | string | boolean;

export interface ICheckboxProps {
    id: string;
    name: string;
    label: string;
    autofocus: boolean | string;
    checked: boolean | string;
    disabled: boolean | string;
    indeterminate: boolean | string;
    value: ICheckboxValue;
    modelValue: ICheckboxValue;
    ariaLabel: string;
}
