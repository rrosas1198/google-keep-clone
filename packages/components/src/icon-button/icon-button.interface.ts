import { ARIAHasPopup } from "../interfaces";

export type IconButtonColor = "primary" | "secondary" | "tertiary";

export type IconButtonVariant = "standard" | "filled" | "tonal" | "outlined";

export interface IconButtonProps {
    id: string;
    name: string;
    ariaLabel: string;
    ariaHasPopup: ARIAHasPopup;
    disabled: boolean | string;
    color: IconButtonColor;
    variant: IconButtonVariant;
}
