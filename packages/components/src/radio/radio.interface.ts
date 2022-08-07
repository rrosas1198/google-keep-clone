export type RadioValue = number | string;

export type RadioColor = "primary" | "secondary" | "tertiary";

export interface RadioProps {
    id: string;
    name: string;
    color: RadioColor;
    autofocus: boolean | string;
    selected: boolean | string;
    disabled: boolean | string;
    value: RadioValue;
    modelValue: RadioValue;
    ariaLabel: string;
}
