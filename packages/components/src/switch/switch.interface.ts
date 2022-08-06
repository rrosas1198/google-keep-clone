export type SwitchColor = "primary" | "secondary" | "tertiary";

export interface SwitchProps {
    id: string;
    name: string;
    color: SwitchColor;
    active: boolean | string;
    autofocus: boolean | string;
    disabled: boolean | string;
    modelValue: boolean;
    ariaLabel: string;
}
