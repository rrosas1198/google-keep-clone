import { ARIAHasPopup } from "../interfaces";

export type IconButtonColor = "primary" | "secondary" | "tertiary";

export type IconButtonVariant = "standard" | "filled" | "tonal" | "outlined";

export type IconButtonType = "button" | "reset" | "submit";

export interface IconButtonProps {
    id: string;
    name: string;
    color: IconButtonColor;
    variant: IconButtonVariant;
    ariaLabel: string;
    ariaHasPopup: ARIAHasPopup;
    autofocus: boolean | string;
    disabled: boolean | string;
    type: IconButtonType;
}
