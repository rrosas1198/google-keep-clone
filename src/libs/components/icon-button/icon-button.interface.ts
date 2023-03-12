import type { IAriaHasPopup } from "../interfaces";

export type IIconButtonColor = "primary" | "secondary" | "tertiary";

export type IIconButtonVariant = "standard" | "elevated" | "filled" | "tonal" | "outlined" | "text";

export type IIconButtonType = "button" | "reset" | "submit";

export interface IIconButtonProps {
    id: string;
    name: string;
    color: IIconButtonColor;
    variant: IIconButtonVariant;
    ariaLabel: string;
    ariaHasPopup: IAriaHasPopup;
    autofocus: boolean;
    disabled: boolean;
    link: boolean;
    type: IIconButtonType;
}
