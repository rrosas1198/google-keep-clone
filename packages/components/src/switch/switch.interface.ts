export type ISwitchColor = "primary" | "secondary" | "tertiary";

export interface ISwitchProps {
    id: string;
    name: string;
    color: ISwitchColor;
    active: boolean | string;
    autofocus: boolean | string;
    disabled: boolean | string;
    modelValue: boolean;
    ariaLabel: string;
}
