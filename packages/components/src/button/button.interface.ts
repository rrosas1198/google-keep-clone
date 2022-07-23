export type ButtonColor = "primary" | "secondary" | "tertiary";

export type ButtonVariant = "standard" | "filled" | "tonal" | "outlined";

export type ButtonType = "button" | "reset" | "submit";

export interface ButtonProps {
    id: string;
    name: string;
    color: ButtonColor;
    variant: ButtonVariant;
    autofocus: boolean | string;
    disabled: boolean | string;
    type: ButtonType;
    leadingIcon: string;
    trailingIcon: string;
}
