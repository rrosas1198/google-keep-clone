export type IFieldVariant = "outlined" | "none";

export interface IFieldProps {
    disabled: boolean;
    error: boolean;
    floating: boolean;
    focused: boolean;
    id: string;
    label: string;
    shaken: boolean;
    showLabel: boolean;
    showSupport: boolean;
    variant: IFieldVariant;
}
