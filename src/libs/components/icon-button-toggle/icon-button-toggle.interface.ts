import type { IIconButtonColor, IIconButtonVariant } from "../icon-button";

export type IIconButtonToggleColor = IIconButtonColor;

export type IIconButtonToggleVariant = IIconButtonVariant;

export interface IIconButtonToggleProps {
    id: string;
    name: string;
    color: IIconButtonToggleColor;
    variant: IIconButtonToggleVariant;
    autofocus: boolean;
    disabled: boolean;
    modelValue: boolean;
    ariaLabel: string;
    ariaLabelOn: string;
    ariaLabelOff: string;
    dataIconOn: string;
    dataIconOff: string;
}
