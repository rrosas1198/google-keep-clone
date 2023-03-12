export type IButtonColor = "primary" | "secondary" | "tertiary";

export type IButtonVariant = "elevated" | "filled" | "tonal" | "outlined" | "text";

export type IButtonType = "button" | "reset" | "submit";

export interface IButtonProps {
    id: string;
    name: string;
    color: IButtonColor;
    variant: IButtonVariant;
    autofocus: boolean;
    disabled: boolean;
    type: IButtonType;
    leadingIcon: string;
    trailingIcon: string;
}
