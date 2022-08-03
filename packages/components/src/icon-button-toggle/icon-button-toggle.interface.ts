import { ToggleProps } from "../composables";
import { IconButtonColor, IconButtonVariant } from "../icon-button";

export type IconButtonToggleColor = IconButtonColor;

export type IconButtonToggleVariant = IconButtonVariant;

export interface IconButtonToggleProps extends ToggleProps {
    id: string;
    name: string;
    color: IconButtonToggleColor;
    variant: IconButtonToggleVariant;
    ariaLabel: string;
    autofocus: boolean | string;
}
