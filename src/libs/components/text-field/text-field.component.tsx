import type { PropType, SetupContext } from "vue";
import { defineComponent } from "vue";
import { useRender } from "../composables";
import { VField } from "../field";
import { useTextField } from "./text-field.factory";
import type { ITextFieldInputModel, ITextFieldProps, ITextFieldType } from "./text-field.interface";

export const VTextField = defineComponent({
    name: "VTextField",
    model: {
        prop: "modelValue",
        event: "update:modelValue"
    },
    props: {
        autocomplete: {
            type: Boolean,
            default: false
        },
        autofocus: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        error: {
            type: Boolean,
            default: false
        },
        errorMessage: {
            type: String,
            default: null
        },
        id: {
            type: String,
            required: true
        },
        inputMode: {
            type: String as PropType<ITextFieldInputModel>,
            default: null
        },
        label: {
            type: String,
            default: null
        },
        maxLength: {
            type: Number,
            default: null
        },
        modelValue: {
            type: String,
            default: null
        },
        name: {
            type: String,
            default: null
        },
        placeholder: {
            type: String,
            default: null
        },
        readonly: {
            type: Boolean,
            default: false
        },
        required: {
            type: Boolean,
            default: false
        },
        showLabel: {
            type: Boolean,
            default: true
        },
        showSupport: {
            type: Boolean,
            default: true
        },
        supportingText: {
            type: String,
            default: null
        },
        type: {
            type: String as PropType<ITextFieldType>,
            default: "text"
        }
    },
    setup(props: ITextFieldProps, { slots }: SetupContext) {
        const inputRef = ref<HTMLInputElement>();

        const textFieldComposed = useTextField(inputRef, props);

        useRender(() => {
            const hasLabel = !!props.label;
            const hasCounter = !!props.maxLength;

            const counterId = `${props.id}Counter`;
            const shouldAlert = props.error && !!props.errorMessage;

            const supportingText = shouldAlert ? props.errorMessage : props.supportingText;
            const supportingTextId = `${props.id}SupportingText`;

            const renderInput = () => {
                return (
                    <input
                        ref={inputRef}
                        id={props.id}
                        name={props.name || props.id}
                        class="mdc-text-field__input"
                        aria-label={hasLabel ? undefined : props.placeholder}
                        aria-invalid={props.error}
                        placeholder={hasLabel ? undefined : props.placeholder}
                        disabled={props.disabled}
                        inputmode={props.inputMode}
                        readonly={props.readonly}
                        required={props.required}
                        type={props.type}
                        value={textFieldComposed.model.value}
                        onBlur={textFieldComposed.handleBlur}
                        onInput={textFieldComposed.handleInput}
                    />
                );
            };

            const renderSupportingText = () => (
                <span
                    id={supportingTextId}
                    role={shouldAlert ? "alert" : undefined}
                    class="mdc-field__supporting-text-message"
                >
                    {supportingText}
                </span>
            );

            const renderCounter = () => {
                const modelLength = textFieldComposed.model.value?.length ?? 0;
                return (
                    <span id={counterId} class="mdc-field__supporting-text-counter">
                        {`${modelLength} / ${props.maxLength}`}
                    </span>
                );
            };

            return (
                <VField
                    id={props.id}
                    label={props.label || props.placeholder}
                    disabled={props.disabled}
                    error={props.error}
                    class="mdc-text-field"
                    floating={textFieldComposed.isFloating.value}
                    focused={textFieldComposed.isFocused.value}
                    shaken={textFieldComposed.isShaken.value}
                    showLabel={hasLabel}
                    showSupport={props.showSupport}
                    onClick:control={textFieldComposed.handleFocus}
                >
                    {{
                        ...slots,
                        default: () => renderInput(),
                        supportingText: () => supportingText && renderSupportingText(),
                        supportingTextEnd: () => hasCounter && renderCounter()
                    }}
                </VField>
            );
        });

        return {};
    }
});
