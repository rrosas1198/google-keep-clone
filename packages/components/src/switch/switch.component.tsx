import { defineComponent, PropType, SetupContext } from "vue";
import { ToggleValue, useRender, useToggle } from "../composables";
import { coerce } from "../utils";
import { SwitchColor, SwitchProps } from "./switch.interface";

export const VSwitch = defineComponent({
    name: "VSwitch",
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
            type: String as PropType<SwitchColor>,
            default: null
        },
        modelValue: {
            type: [Number, String, Boolean] as PropType<ToggleValue>,
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
    setup(props: SwitchProps, { attrs }: SetupContext) {
        const { checked, ariaLabel, handleClick } = useToggle(props);

        const isAutofocus = coerce<boolean>(props.autofocus);
        const isDisabled = coerce<boolean>(props.disabled);

        const classList = {
            "mdc-switch": true,
            "mdc-switch--primary": props.color === "primary",
            "mdc-switch--secondary": props.color === "secondary",
            "mdc-switch--tertiary": props.color === "tertiary"
        };

        useRender(() => (
            <div class={classList}>
                <button
                    id={props.id}
                    name={props.name || props.id}
                    class="mdc-switch__background"
                    type="button"
                    role="switch"
                    autofocus={isAutofocus}
                    disabled={isDisabled}
                    aria-checked={checked.value}
                    aria-label={ariaLabel.value}
                    onClick={handleClick}
                    {...attrs}
                >
                    <div class="mdc-switch__track"></div>
                </button>

                <input
                    id={props.id}
                    name={props.name || props.id}
                    class="mdc-switch__input"
                    type="checkbox"
                    aria-hidden="true"
                    checked={checked.value}
                />
            </div>
        ));

        return {};
    }
});
