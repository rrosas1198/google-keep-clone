import { defineComponent, PropType, SetupContext } from "vue";
import { ToggleValue, useRender, useToggle } from "../composables";
import { coerce } from "../utils";
import { RadioColor, RadioProps } from "./radio.interface";

export const VRadio = defineComponent({
    name: "VRadio",
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
            type: String as PropType<RadioColor>,
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
    setup(props: RadioProps, { attrs }: SetupContext) {
        const { checked, handleInput } = useToggle(props);

        const isAutofocus = coerce<boolean>(props.autofocus);
        const isDisabled = coerce<boolean>(props.disabled);

        const ariaLabel = props.ariaLabelOn || props.ariaLabelOff;

        const classList = {
            "mdc-radio": true,
            "mdc-radio--primary": props.color === "primary",
            "mdc-radio--secondary": props.color === "secondary",
            "mdc-radio--tertiary": props.color === "tertiary"
        };

        useRender(() => (
            <div class={classList}>
                <input
                    id={props.id}
                    name={props.name || props.id}
                    class="mdc-radio__native-control"
                    type="radio"
                    autofocus={isAutofocus}
                    disabled={isDisabled}
                    checked={checked.value}
                    aria-label={ariaLabel}
                    onChange={handleInput}
                    {...attrs}
                />
                <div class="mdc-radio__background">
                    <div class="mdc-radio__outer-circle"></div>
                    <div class="mdc-radio__inner-circle"></div>
                </div>
            </div>
        ));

        return {};
    }
});
