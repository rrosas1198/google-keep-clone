export type IconButtonColor = "primary" | "secondary" | "tertiary";

export type IconButtonVariant = "standard" | "filled" | "tonal" | "outlined";

export interface IconButtonProps {
    color: IconButtonColor;
    variant: IconButtonVariant;
}
