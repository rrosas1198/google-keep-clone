import { IconButtonColor, IconButtonVariant } from "../icon-button";

export type IconButtonToggleColor = IconButtonColor;

export type IconButtonToggleVariant = IconButtonVariant;

export interface IconButtonToggleProps {
    id: string;
    name: string;
    color: IconButtonToggleColor;
    variant: IconButtonToggleVariant;
    autofocus: boolean | string;
    disabled: boolean | string;
    modelValue: boolean;
    ariaLabel: string;
    ariaLabelOn: string;
    ariaLabelOff: string;
    dataIconOn: string;
    dataIconOff: string;
}
