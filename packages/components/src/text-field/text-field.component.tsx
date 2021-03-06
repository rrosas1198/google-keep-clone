import { defineComponent, PropType, renderSlot, SetupContext } from "vue";
import { useModel, useRender } from "../composables";
import { coerce } from "../utils";
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
    setup(props: TextFieldProps, { attrs, slots }: SetupContext) {
        const model = useModel<string>();

        const isAutofocus = coerce<boolean>(props.autofocus);
        const isDisabled = coerce<boolean>(props.disabled);
        const isReadonly = coerce<boolean>(props.readonly);
        const isRequired = coerce<boolean>(props.required);

        const hasLeading = "leading" in slots || !!props.leadingIcon;
        const hasTrailing = "trailing" in slots || !!props.trailingIcon;

        function handleInput(event: Event) {
            model.value = (event.target as HTMLInputElement).value;
        }

        function getLeadingContent() {
            if ("leading" in slots) return renderSlot(slots, "leading");
            return <i class="material-symbols-outlined">{props.leadingIcon}</i>;
        }

        function getTrailingContent() {
            if ("trailing" in slots) return renderSlot(slots, "trailing");
            return <i class="material-symbols-outlined">{props.trailingIcon}</i>;
        }

        function renderLeading() {
            if (!hasLeading) return null;
            return <span class="mdc-text-field__leading">{getLeadingContent()}</span>;
        }

        function renderTrailing() {
            if (!hasTrailing) return null;
            return <span class="mdc-text-field__trailing">{getTrailingContent()}</span>;
        }

        useRender(() => (
            <div class="mdc-text-field">
                {renderLeading()}
                <input
                    id={props.id}
                    name={props.name || props.id}
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
