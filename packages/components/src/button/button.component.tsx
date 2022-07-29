import { defineComponent, PropType, renderSlot, SetupContext } from "vue";
import { useRender } from "../composables";
import { coerce } from "../utils";
import { ButtonColor, ButtonProps, ButtonType, ButtonVariant } from "./button.interface";

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
        color: {
            type: String as PropType<ButtonColor>,
            default: null
        },
        variant: {
            type: String as PropType<ButtonVariant>,
            default: "standard"
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
            type: String as PropType<ButtonType>,
            default: "button"
        },
        leadingIcon: {
            type: String,
            default: null
        },
        trailingIcon: {
            type: String,
            default: null
        }
    },
    setup(props: ButtonProps, { attrs, slots }: SetupContext) {
        const isAutofocus = coerce<boolean>(props.autofocus);
        const isDisabled = coerce<boolean>(props.disabled);

        const hasLeading = "leading" in slots || !!props.leadingIcon;
        const hasTrailing = "trailing" in slots || !!props.trailingIcon;

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

        function renderLeading() {
            return (
                <span class="mdc-button__leading">
                    {"leading" in slots ? renderSlot(slots, "leading") : props.leadingIcon}
                </span>
            );
        }

        function renderTrailing() {
            return (
                <span class="mdc-button__trailing">
                    {"trailing" in slots ? renderSlot(slots, "trailing") : props.trailingIcon}
                </span>
            );
        }

        useRender(() => (
            <button
                id={props.id}
                name={props.name || props.id}
                class={classList}
                autofocus={isAutofocus}
                disabled={isDisabled}
                type={props.type}
                {...attrs}
            >
                {hasLeading && renderLeading()}
                <span class="mdc-button__label">{renderSlot(slots, "default")}</span>
                {hasTrailing && renderTrailing()}
            </button>
        ));

        return {};
    }
});
