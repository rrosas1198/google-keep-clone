import type { ISelectableProps } from "../composables";

export type ICheckboxValue = number | string | boolean;

export interface ICheckboxProps extends ISelectableProps<ICheckboxValue> {
    autofocus?: boolean;
    errorMessage?: string;
    falseLabel?: string;
    id: string;
    invalid?: boolean;
    label: string;
    name?: string;
    showLabel?: boolean;
    trueLabel?: string;
}
