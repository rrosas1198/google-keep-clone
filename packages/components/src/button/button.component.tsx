import { coerce, useRender } from "src/utils";
import { defineComponent, PropType, renderSlot, SetupContext } from "vue";
import { ButtonColor, ButtonProps, ButtonVariant } from "./button.interface";

export const VButton = defineComponent({
    name: "VButton",
    props: {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            default: null
        },
        disabled: {
            type: [Boolean, String],
            default: false
        },
        color: {
            type: String as PropType<ButtonColor>,
            default: null
        },
        variant: {
            type: String as PropType<ButtonVariant>,
            default: "standard"
        }
    },
    setup(props: ButtonProps, { slots }: SetupContext) {
        const isDisabled = coerce<boolean>(props.disabled);

        const classList = {
            "mdc-button": true,
            "mdc-button--primary": props.color === "primary",
            "mdc-button--secondary": props.color === "secondary",
            "mdc-button--tertiary": props.color === "tertiary",
            "mdc-button--standard": props.variant === "standard",
            "mdc-button--filled": props.variant === "filled",
            "mdc-button--tonal": props.variant === "tonal",
            "mdc-button--outlined": props.variant === "outlined"
        };

        useRender(() => (
            <button
                id={props.id}
                name={props.name || props.id}
                class={classList}
                disabled={isDisabled}
            >
                {renderSlot(slots, "default")}
            </button>
        ));

        return {};
    }
});
