import { useModel, useRender } from "src/composables";
import { coerce } from "src/utils";
import { defineComponent, PropType, SetupContext } from "vue";
import { TextFieldProps, TextFieldType } from "./text-field.interface";

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
            type: String as PropType<TextFieldType>,
            default: "text"
        },
        modelValue: {
            type: String,
            default: null
        },
        placeholder: {
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
        readonly: {
            type: [Boolean, String],
            default: false
        },
        required: {
            type: [Boolean, String],
            default: false
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
    setup(props: TextFieldProps, { attrs }: SetupContext) {
        const model = useModel<string>();

        const isAutofocus = coerce<boolean>(props.autofocus);
        const isDisabled = coerce<boolean>(props.disabled);
        const isReadonly = coerce<boolean>(props.readonly);
        const isRequired = coerce<boolean>(props.required);

        function handleInput(event: Event) {
            model.value = (event.target as HTMLInputElement).value;
        }

        function renderLeading() {
            // leadingIcon
        }

        function renderTrailing() {
            // trailingIcon
        }

        useRender(() => (
            <div class="mdc-text-field">
                {renderLeading()}
                <input
                    class="mdc-text-field__input"
                    placeholder={props.placeholder}
                    autofocus={isAutofocus}
                    disabled={isDisabled}
                    readonly={isReadonly}
                    required={isRequired}
                    type={props.type}
                    value={model.value}
                    onInput={handleInput}
                    {...attrs}
                />
                {renderTrailing()}
            </div>
        ));

        return {};
    }
});
