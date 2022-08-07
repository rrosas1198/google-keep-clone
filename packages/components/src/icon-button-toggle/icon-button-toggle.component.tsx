import { defineComponent, PropType, renderSlot, SetupContext } from "vue";
import { useRender } from "../composables";
import { coerce } from "../utils";
import { useIconButtonToggle } from "./icon-button-toggle.factory";
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
        autofocus: {
            type: [Boolean, String],
            default: false
        },
        disabled: {
            type: [Boolean, String],
            default: false
        },
        modelValue: {
            type: Boolean,
            default: null
        },
        ariaLabel: {
            type: String,
            required: true
        },
        ariaLabelOn: {
            type: String,
            default: null
        },
        ariaLabelOff: {
            type: String,
            default: null
        },
        dataIconOn: {
            type: String,
            default: true
        },
        dataIconOff: {
            type: String,
            default: false
        }
    },
    setup(props: IconButtonToggleProps, { attrs, slots }: SetupContext) {
        const { isOn, handleChange } = useIconButtonToggle(props);

        const isAutofocus = coerce<boolean>(props.autofocus);
        const isDisabled = coerce<boolean>(props.disabled);

        const hasAriaLabel = props.ariaLabelOn && props.ariaLabelOff;

        const ariaPressed = hasAriaLabel ? undefined : isOn.value;
        const ariaLabel = hasAriaLabel
            ? isOn.value
                ? props.ariaLabelOn
                : props.ariaLabelOff
            : props.ariaLabel;

        const classList = {
            "mdc-icon-button": true,
            "mdc-icon-button--on": isOn.value,
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
                aria-label={ariaLabel}
                onClick={handleChange}
                {...attrs}
            >
                <span class="mdc-icon-button__icon">{renderSlot(slots, "default")}</span>
            </button>
        ));

        return {};
    }
});
