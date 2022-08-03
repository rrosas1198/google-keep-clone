import { ToggleProps } from "../composables";

export type RadioColor = "primary" | "secondary" | "tertiary";

export interface RadioProps extends ToggleProps {
    id: string;
    name: string;
    color: RadioColor;
    autofocus: boolean | string;
    checked: boolean | string;
}
