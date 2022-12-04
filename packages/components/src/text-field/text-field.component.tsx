import { useRender } from "src/composables";
import { coerce } from "src/utils";
import type { PropType, SetupContext } from "vue";
import { defineComponent, renderSlot } from "vue";
import { useTextField } from "./text-field.factory";
import type { ITextFieldProps, ITextFieldType } from "./text-field.interface";

export const VTextField = defineComponent({
    name: "VTextField",
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
        label: {
            type: String,
            default: null
        },
        type: {
            type: String as PropType<ITextFieldType>,
            default: "text"
        },
        autofocus: {
            type: [Boolean, String],
            default: false
        },
        disabled: {
            type: [Boolean, String],
            default: false
        },
        inline: {
            type: [Boolean, String],
            default: false
        },
        readonly: {
            type: [Boolean, String],
            default: false
        },
        required: {
            type: [Boolean, String],
            default: false
        },
        maxLength: {
            type: [String, Number],
            default: null
        },
        modelValue: {
            type: String,
            default: null
        },
        placeholder: {
            type: String,
            default: null
        },
        leadingIcon: {
            type: String,
            default: null
        },
        trailingIcon: {
            type: String,
            default: null
        },
        error: {
            type: [Boolean, String],
            default: false
        },
        errorText: {
            type: String,
            default: null
        },
        showSupport: {
            type: [Boolean, String],
            default: true
        },
        supportingText: {
            type: String,
            default: null
        }
    },
    setup(props: ITextFieldProps, { slots }: SetupContext) {
        const { handleInput } = useTextField();

        useRender(() => {
            const isAutofocus = coerce<boolean>(props.autofocus);
            const isDisabled = coerce<boolean>(props.disabled);
            const isReadonly = coerce<boolean>(props.readonly);
            const isRequired = coerce<boolean>(props.required);

            const hasLabel = !!props.label;
            const hasError = coerce<boolean>(props.error);

            const hasLeading = "leading" in slots || !!props.leadingIcon;
            const hasTrailing = "trailing" in slots || !!props.trailingIcon;

            const getLeadingContent = () => {
                if ("leading" in slots) return renderSlot(slots, "leading");
                return <i class="material-symbols-outlined">{props.leadingIcon}</i>;
            };

            const getTrailingContent = () => {
                if ("trailing" in slots) return renderSlot(slots, "trailing");
                return <i class="material-symbols-outlined">{props.trailingIcon}</i>;
            };

            const renderLeading = () => {
                if (!hasLeading) return null;
                return <span class="mdc-text-field__leading">{getLeadingContent()}</span>;
            };

            const renderTrailing = () => {
                if (!hasTrailing) return null;
                return <span class="mdc-text-field__trailing">{getTrailingContent()}</span>;
            };

            return (
                <div class="mdc-text-field">
                    {renderLeading()}
                    <input
                        id={props.id}
                        name={props.name || props.id}
                        class="mdc-text-field__input"
                        placeholder={hasLabel ? undefined : props.placeholder}
                        aria-label={hasLabel ? undefined : props.placeholder}
                        aria-invalid={hasError}
                        autofocus={isAutofocus}
                        disabled={isDisabled}
                        readonly={isReadonly}
                        required={isRequired}
                        type={props.type}
                        value={props.modelValue}
                        onInput={handleInput}
                    />
                    {renderTrailing()}
                </div>
            );
        });

        return {};
    }
});
