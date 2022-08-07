import { defineComponent, PropType, SetupContext } from "vue";
import { useRender } from "../composables";
import { coerce } from "../utils";
import { useCheckbox } from "./checkbox.factory";
import { CheckboxColor, CheckboxProps, CheckboxValue } from "./checkbox.interface";

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
        value: {
            type: [Number, String, Boolean] as PropType<CheckboxValue>,
            default: true
        },
        modelValue: {
            type: [Number, String, Boolean] as PropType<CheckboxValue>,
            default: null
        },
        ariaLabel: {
            type: String,
            default: null
        }
    },
    setup(props: CheckboxProps, { attrs }: SetupContext) {
        const { isChecked, handleChange } = useCheckbox(props);

        const isAutofocus = coerce<boolean>(props.autofocus);
        const isDisabled = coerce<boolean>(props.disabled);
        const isIndeterminate = coerce<boolean>(props.indeterminate);

        const ariaChecked = isIndeterminate ? "mixed" : undefined;

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
                    class="mdc-checkbox__native-control"
                    type="checkbox"
                    autofocus={isAutofocus}
                    disabled={isDisabled}
                    indeterminate={isIndeterminate}
                    checked={isChecked.value}
                    aria-checked={ariaChecked}
                    aria-label={props.ariaLabel}
                    onChange={handleChange}
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
