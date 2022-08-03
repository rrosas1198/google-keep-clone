import { ToggleProps } from "../composables";

export type CheckboxColor = "primary" | "secondary" | "tertiary";

export interface CheckboxProps extends ToggleProps {
    id: string;
    name: string;
    color: CheckboxColor;
    autofocus: boolean | string;
    checked: boolean | string;
    indeterminate: boolean | string;
}
