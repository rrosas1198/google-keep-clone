import { ToggleProps } from "../composables";

export type SwitchColor = "primary" | "secondary" | "tertiary";

export interface SwitchProps extends ToggleProps {
    id: string;
    name: string;
    color: SwitchColor;
    autofocus: boolean | string;
}
