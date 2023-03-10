import type { PropType, SetupContext } from "vue";
import { defineComponent, ref } from "vue";
import { useRender } from "../composables";
import { useField } from "./field.factory";
import type { IFieldProps, IFieldVariant } from "./field.interface";

export const VField = defineComponent({
    name: "VField",
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        error: {
            type: Boolean,
            default: false
        },
        floating: {
            type: Boolean,
            default: false
        },
        focused: {
            type: Boolean,
            default: false
        },
        id: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        shaken: {
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
        variant: {
            type: String as PropType<IFieldVariant>,
            default: "outlined"
        },
        "onClick:control": {
            type: Function,
            default: undefined
        }
    },
    setup(props: IFieldProps, { slots }: SetupContext) {
        const labelRef = ref<HTMLLabelElement>();

        const fieldComposed = useField(labelRef, props);

        useRender(() => {
            const hasLabel = props.showLabel ?? !!props.label;

            const renderLeading = () => <div class="mdc-field__leading">{slots.leading?.({})}</div>;

            const renderTrailing = () => (
                <div class="mdc-field__trailing">{slots.trailing?.({})}</div>
            );

            const renderLabel = () => (
                <label
                    ref={labelRef}
                    for={props.id}
                    class={{
                        "mdc-field__label": true,
                        "mdc-field__label--shake": fieldComposed.isShaken.value
                    }}
                    style={{ "--field-label-translate-y": fieldComposed.labelYAxis.value }}
                    onAnimationend={fieldComposed.handleShakeEnd}
                >
                    {props.label}
                </label>
            );

            const renderOutline = () => (
                <div class="mdc-field__outline">
                    <div class="mdc-field__outline-start"></div>
                    <div class="mdc-field__outline-notch">{hasLabel && renderLabel()}</div>
                    <div class="mdc-field__outline-end"></div>
                </div>
            );

            const renderSupportingText = () => (
                <div class="mdc-field__supporting-text">
                    <span class="mdc-field__supporting-text-start">
                        {slots.supportingText?.({})}
                    </span>
                    <span class="mdc-field__supporting-text-end">
                        {slots.supportingTextEnd?.({})}
                    </span>
                </div>
            );

            return (
                <div
                    class={{
                        "mdc-field": true,
                        "mdc-field--disabled": props.disabled,
                        "mdc-field--error": props.error,
                        "mdc-field--focused": props.focused,
                        "mdc-field--floating": fieldComposed.isFloating.value,
                        "mdc-field--no-label": !props.label,
                        "mdc-field--outlined": props.variant === "outlined",
                        "mdc-field--with-leading": !!slots.leading,
                        "mdc-field--with-trailing": !!slots.trailing
                    }}
                    onClick={fieldComposed.handleClick}
                >
                    <div class="mdc-field__container">
                        {!!slots.leading && renderLeading()}

                        <div class="mdc-field__content">{slots.default?.({})}</div>

                        {!!slots.trailing && renderTrailing()}

                        {renderOutline()}
                    </div>

                    {props.showSupport && renderSupportingText()}
                </div>
            );
        });

        return {};
    }
});
