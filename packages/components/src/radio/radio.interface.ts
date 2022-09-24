export type IRadioValue = number | string;

export type IRadioColor = "primary" | "secondary" | "tertiary";

export interface IRadioProps {
    id: string;
    name: string;
    color: IRadioColor;
    autofocus: boolean | string;
    selected: boolean | string;
    disabled: boolean | string;
    value: IRadioValue;
    modelValue: IRadioValue;
    ariaLabel: string;
}
