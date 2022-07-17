import { defineComponent, PropType } from "vue";
import { ARIAHasPopup } from "../interfaces";
import { coerce, useRender } from "../utils";
import { IconButtonColor, IconButtonProps, IconButtonVariant } from "./icon-button.interface";

export const VIconButton = defineComponent({
    name: "VIconButton",
    model: {
        prop: "modelValue",
        event: "update:modelValue"
    },
    props: {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            default: null
        },
        ariaLabel: {
            type: String,
            required: true
        },
        ariaHasPopup: {
            type: String as PropType<ARIAHasPopup>,
            default: null
        },
        disabled: {
            type: [Boolean, String],
            default: false
        },
        color: {
            type: String as PropType<IconButtonColor>,
            default: null
        },
        variant: {
            type: String as PropType<IconButtonVariant>,
            default: "standard"
        }
    },
    setup(props: IconButtonProps) {
        const isDisabled = coerce<boolean>(props.disabled);

        const classList = {
            "mdc-icon-button": true,
            "mdc-icon-button--standard": props.variant === "standard",
            "mdc-icon-button--filled": props.variant === "filled",
            "mdc-icon-button--tonal": props.variant === "tonal",
            "mdc-icon-button--outlined": props.variant === "outlined"
        };

        useRender(() => {
            return (
                <button
                    id={props.id}
                    name={props.name || props.id}
                    class={classList}
                    aria-label={props.ariaLabel}
                    aria-has-popup={props.ariaHasPopup}
                    disabled={isDisabled}
                >
                    <span class="mdc-icon-button__icon">V</span>
                </button>
            );
        });

        return {};
    }
});
