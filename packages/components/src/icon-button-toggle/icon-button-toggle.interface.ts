import { IIconButtonColor, IIconButtonVariant } from "src/icon-button";

export type IIconButtonToggleColor = IIconButtonColor;

export type IIconButtonToggleVariant = IIconButtonVariant;

export interface IIconButtonToggleProps {
    id: string;
    name: string;
    color: IIconButtonToggleColor;
    variant: IIconButtonToggleVariant;
    autofocus: boolean | string;
    disabled: boolean | string;
    modelValue: boolean;
    ariaLabel: string;
    ariaLabelOn: string;
    ariaLabelOff: string;
    dataIconOn: string;
    dataIconOff: string;
}
