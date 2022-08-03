import { defineComponent, PropType, SetupContext } from "vue";
import { ToggleValue, useRender, useToggle } from "../composables";
import { coerce } from "../utils";
import { CheckboxColor, CheckboxProps } from "./checkbox.interface";

export const VCheckbox = defineComponent({
    name: "VCheckbox",
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
            type: String as PropType<CheckboxColor>,
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
        checked: {
            type: [Boolean, String],
            default: false
        },
        indeterminate: {
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
    setup(props: CheckboxProps, { attrs }: SetupContext) {
        const { checked, handleInput } = useToggle(props);

        const isAutofocus = coerce<boolean>(props.autofocus);
        const isDisabled = coerce<boolean>(props.disabled);
        const isIndeterminate = coerce<boolean>(props.indeterminate);

        const ariaChecked = isIndeterminate ? "mixed" : undefined;
        const ariaLabel = props.ariaLabelOn || props.ariaLabelOff;

        const classList = {
            "mdc-checkbox": true,
            "mdc-checkbox--primary": props.color === "primary",
            "mdc-checkbox--secondary": props.color === "secondary",
            "mdc-checkbox--tertiary": props.color === "tertiary"
        };

        useRender(() => (
            <div class={classList}>
                <input
                    id={props.id}
                    name={props.name || props.id}
                    class="mdc-checkbox__native"
                    type="checkbox"
                    autofocus={isAutofocus}
                    disabled={isDisabled}
                    indeterminate={isIndeterminate}
                    checked={checked.value}
                    aria-checked={ariaChecked}
                    aria-label={ariaLabel}
                    onChange={handleInput}
                    {...attrs}
                />
                <div class="mdc-checkbox__background">
                    <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                            class="md3-checkbox__checkmark-path"
                            fill="none"
                            d="M1.73,12.91 8.1,19.28 22.79,4.59"
                        ></path>
                    </svg>
                    <div class="mdc-checkbox__mixedmark"></div>
                </div>
            </div>
        ));

        return {};
    }
});
