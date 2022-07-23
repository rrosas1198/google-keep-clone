export type ButtonColor = "primary" | "secondary" | "tertiary";

export type ButtonVariant = "standard" | "filled" | "tonal" | "outlined";

export interface ButtonProps {
    id: string;
    name: string;
    disabled: boolean | string;
    color: ButtonColor;
    variant: ButtonVariant;
}
