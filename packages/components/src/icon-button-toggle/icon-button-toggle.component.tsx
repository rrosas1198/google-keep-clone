import { defineComponent, PropType, renderSlot, SetupContext } from "vue";
import { ToggleValue, useRender, useToggle } from "../composables";
import { coerce } from "../utils";
import {
    IconButtonToggleColor,
    IconButtonToggleProps,
    IconButtonToggleVariant
} from "./icon-button-toggle.interface";

export const VIconButtonToggle = defineComponent({
    name: "VIconButtonToggle",
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
        color: {
            type: String as PropType<IconButtonToggleColor>,
            default: null
        },
        variant: {
            type: String as PropType<IconButtonToggleVariant>,
            default: "standard"
        },
        modelValue: {
            type: [Number, String, Boolean] as PropType<ToggleValue>,
            default: null
        },
        ariaLabel: {
            type: String,
            required: true
        },
        disabled: {
            type: [Boolean, String],
            default: false
        },
        autofocus: {
            type: [Boolean, String],
            default: false
        },
        ariaLabelOn: {
            type: String,
            default: null
        },
        ariaLabelOff: {
            type: String,
            default: null
        },
        dataValueOn: {
            type: [Number, String, Boolean] as PropType<ToggleValue>,
            default: true
        },
        dataValueOff: {
            type: [Number, String, Boolean] as PropType<ToggleValue>,
            default: false
        }
    },
    setup(props: IconButtonToggleProps, { attrs, slots }: SetupContext) {
        const { checked, ariaLabel, handleClick } = useToggle(props);

        const isAutofocus = coerce<boolean>(props.autofocus);
        const isDisabled = coerce<boolean>(props.disabled);
        const ariaPressed = props.ariaLabelOn && props.ariaLabelOff ? undefined : checked.value;

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
                type="button"
                aria-pressed={ariaPressed}
                aria-label={ariaLabel.value}
                onClick={handleClick}
                {...attrs}
            >
                <span class="mdc-icon-button__icon">{renderSlot(slots, "default")}</span>
            </button>
        ));

        return {};
    }
});
