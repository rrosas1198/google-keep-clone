import { coerce, useRender } from "src/utils";
import { defineComponent, PropType } from "vue";
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
        placeholder: {
            type: String,
            default: null
        },
        type: {
            type: String as PropType<TextFieldType>,
            default: "text"
        },
        disabled: {
            type: [Boolean, String],
            default: false
        },
        required: {
            type: [Boolean, String],
            default: false
        },
        readonly: {
            type: [Boolean, String],
            default: false
        }
    },
    setup(props: TextFieldProps) {
        const isDisabled = coerce<boolean>(props.disabled);
        const isReadonly = coerce<boolean>(props.readonly);
        const isRequired = coerce<boolean>(props.required);

        function renderPrefix() {
            //
        }

        function renderSuffix() {
            //
        }

        useRender(() => (
            <div class="mdc-text-field">
                {renderPrefix()}
                <input
                    class="mdc-text-field__input"
                    placeholder={props.placeholder}
                    disabled={isDisabled}
                    readonly={isReadonly}
                    required={isRequired}
                    type={props.type}
                />
                {renderSuffix()}
            </div>
        ));

        return {};
    }
});
