import { defineComponent, PropType, renderSlot, SetupContext } from "vue";
import { useRender } from "../composables";
import { ARIAHasPopup } from "../interfaces";
import { coerce } from "../utils";
import {
    IconButtonColor,
    IconButtonProps,
    IconButtonType,
    IconButtonVariant
} from "./icon-button.interface";

export const VIconButton = defineComponent({
    name: "VIconButton",
    props: {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            default: null
        },
        color: {
            type: String as PropType<IconButtonColor>,
            default: null
        },
        variant: {
            type: String as PropType<IconButtonVariant>,
            default: "standard"
        },
        ariaLabel: {
            type: String,
            required: true
        },
        ariaHasPopup: {
            type: String as PropType<ARIAHasPopup>,
            default: null
        },
        autofocus: {
            type: [Boolean, String],
            default: false
        },
        disabled: {
            type: [Boolean, String],
            default: false
        },
        type: {
            type: String as PropType<IconButtonType>,
            default: "button"
        }
    },
    setup(props: IconButtonProps, { attrs, slots }: SetupContext) {
        const isAutofocus = coerce<boolean>(props.autofocus);
        const isDisabled = coerce<boolean>(props.disabled);

        const classList = {
            "mdc-icon-button": true,
            "mdc-icon-button--primary": props.color === "primary",
            "mdc-icon-button--secondary": props.color === "secondary",
            "mdc-icon-button--tertiary": props.color === "tertiary",
            "mdc-icon-button--standard": props.variant === "standard",
            "mdc-icon-button--filled": props.variant === "filled",
            "mdc-icon-button--tonal": props.variant === "tonal",
            "mdc-icon-button--outlined": props.variant === "outlined"
        };

        useRender(() => (
            <button
                id={props.id}
                name={props.name || props.id}
                class={classList}
                autofocus={isAutofocus}
                disabled={isDisabled}
                type={props.type}
                aria-label={props.ariaLabel}
                aria-has-popup={props.ariaHasPopup}
                {...attrs}
            >
                <span class="mdc-icon-button__icon">{renderSlot(slots, "default")}</span>
            </button>
        ));

        return {};
    }
});
