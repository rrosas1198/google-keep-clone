import type { PropType, Ref } from "vue";
import { defineComponent, ref } from "vue";
import { useRender } from "../composables";
import { useRipple } from "../ripple";
import { useCheckbox } from "./checkbox.factory";
import type { ICheckboxProps, ICheckboxValue } from "./checkbox.interface";

export const VCheckbox = defineComponent({
    name: "VCheckbox",
    props: {
        autofocus: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        errorMessage: {
            type: String,
            default: undefined
        },
        falseLabel: {
            type: String,
            default: undefined
        },
        falseValue: {
            type: [Number, String, Boolean] as PropType<ICheckboxValue>,
            default: undefined
        },
        id: {
            type: String,
            required: true
        },
        indeterminate: {
            type: Boolean,
            default: false
        },
        invalid: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            required: true
        },
        modelValue: {
            type: [Number, String, Boolean, Array] as PropType<ICheckboxValue | ICheckboxValue[]>,
            default: undefined
        },
        name: {
            type: String,
            default: undefined
        },
        readonly: {
            type: Boolean,
            default: false
        },
        showLabel: {
            type: Boolean,
            default: true
        },
        trueLabel: {
            type: String,
            default: undefined
        },
        trueValue: {
            type: [Number, String, Boolean] as PropType<ICheckboxValue>,
            default: undefined
        },
        value: {
            type: [Number, String, Boolean] as PropType<ICheckboxValue>,
            default: undefined
        }
    },
    setup(props: ICheckboxProps) {
        const inputRef = ref<HTMLInputElement>() as Ref<HTMLInputElement>;
        const rippleRef = ref<HTMLInputElement>() as Ref<HTMLInputElement>;

        const checkboxComposed = useCheckbox(inputRef, props);
        const rippleComposed = useRipple(rippleRef, {
            disabled: props.disabled,
            unbounded: true
        });

        useRender(() => {
            const renderInput = () => {
                const ariaChecked = checkboxComposed.indeterminate.value
                    ? "mixed"
                    : checkboxComposed.isChecked.value;

                return (
                    <input
                        ref={inputRef}
                        id={props.id}
                        name={props.name}
                        class="mdc-checkbox__native-control"
                        disabled={props.disabled}
                        checked={checkboxComposed.isChecked.value}
                        type="checkbox"
                        value={checkboxComposed.trueValue.value}
                        indeterminate={checkboxComposed.indeterminate.value}
                        aria-checked={ariaChecked}
                        aria-label={props.showLabel ? undefined : props.label}
                        aria-readonly={props.readonly}
                        data-indeterminate={checkboxComposed.indeterminate.value}
                        onChange={checkboxComposed.handleChange}
                    />
                );
            };

            const renderBackground = () => (
                <div class="mdc-checkbox__background">
                    <svg class="mdc-checkbox__check-mark" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                            class="mdc-checkbox__checkmark-path"
                            fill="currentColor"
                            d="M1.73,12.91 8.1,19.28 22.79,4.59"
                        ></path>
                    </svg>
                    <div class="mdc-checkbox__mixed-mark"></div>
                </div>
            );

            const renderRipple = () => (
                <span
                    ref={rippleRef}
                    class={{ "mdc-checkbox__ripple": true, ...rippleComposed.classList.value }}
                ></span>
            );

            const renderLabel = () => (
                <label class="mdc-checkbox__label" for={props.name || props.id}>
                    {props.label}
                </label>
            );

            return (
                <div
                    class={{ "mdc-checkbox": true, "mdc-checkbox--disabled": props.disabled }}
                    {...rippleComposed.listeners}
                >
                    <div class="mdc-checkbox__control">
                        {renderInput()}
                        {renderBackground()}
                        {renderRipple()}
                    </div>

                    {props.showLabel && renderLabel()}
                </div>
            );
        });

        return {};
    }
});
