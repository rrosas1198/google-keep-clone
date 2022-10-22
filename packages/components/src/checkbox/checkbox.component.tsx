import { useRender } from "src/composables";
import { useRipple } from "src/ripple";
import { coerce } from "src/utils";
import { defineComponent, PropType, Ref, ref } from "vue";
import { useCheckbox } from "./checkbox.factory";
import { ICheckboxProps, ICheckboxValue } from "./checkbox.interface";

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
        label: {
            type: String,
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
            type: [Number, String, Boolean] as PropType<ICheckboxValue>,
            default: true
        },
        modelValue: {
            type: [Number, String, Boolean] as PropType<ICheckboxValue>,
            default: null
        },
        ariaLabel: {
            type: String,
            default: null
        }
    },
    setup(props: ICheckboxProps) {
        const proxy = ref<HTMLInputElement>() as Ref<HTMLInputElement>;

        const { handleChange } = useCheckbox(props);

        const ripple = useRipple(proxy, {
            disabled: props.disabled,
            unbounded: true
        });

        useRender(() => {
            const isDisabled = coerce<boolean>(props.disabled);

            const classList = {
                "mdc-checkbox": true,
                "mdc-checkbox--disabled": isDisabled
            };

            const renderInput = () => {
                const isAutofocus = coerce<boolean>(props.autofocus);
                const isChecked = coerce<boolean>(props.checked);
                const isIndeterminate = coerce<boolean>(props.indeterminate);

                const ariaChecked = isIndeterminate ? "mixed" : undefined;
                const coercedValue = coerce(props.value);

                return (
                    <input
                        id={props.id}
                        name={props.name || props.id}
                        class="mdc-checkbox__native-control"
                        type="checkbox"
                        autofocus={isAutofocus}
                        disabled={isDisabled}
                        indeterminate={isIndeterminate}
                        checked={isChecked}
                        value={coercedValue}
                        aria-checked={ariaChecked}
                        aria-label={props.ariaLabel}
                        data-indeterminate={isIndeterminate}
                        onChange={handleChange}
                        {...ripple.listeners}
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

            const renderRipple = () => {
                const rippleClassList = { "mdc-checkbox__ripple": true, ...ripple.classList.value };
                return <span ref={proxy} class={rippleClassList}></span>;
            };

            const renderLabel = () => {
                if (!props.label) return null;
                return (
                    <label class="mdc-checkbox__label" for={props.name || props.id}>
                        {props.label}
                    </label>
                );
            };

            return (
                <div class={classList}>
                    <div class="mdc-checkbox__control">
                        {renderInput()}
                        {renderBackground()}
                        {renderRipple()}
                    </div>

                    {renderLabel()}
                </div>
            );
        });

        return {};
    }
});
