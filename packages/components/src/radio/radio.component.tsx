import { defineComponent, PropType } from "vue";
import { useRender } from "../composables";
import { coerce } from "../utils";
import { useRadio } from "./radio.factory";
import { IRadioColor, IRadioProps, IRadioValue } from "./radio.interface";

export const VRadio = defineComponent({
    name: "VRadio",
    props: {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        color: {
            type: String as PropType<IRadioColor>,
            default: null
        },
        autofocus: {
            type: [Boolean, String],
            default: false
        },
        selected: {
            type: [Boolean, String],
            default: false
        },
        disabled: {
            type: [Boolean, String],
            default: false
        },
        value: {
            type: [Number, String] as PropType<IRadioValue>,
            default: null
        },
        modelValue: {
            type: [Number, String] as PropType<IRadioValue>,
            default: null
        },
        ariaLabel: {
            type: String,
            default: null
        }
    },
    setup(props: IRadioProps) {
        const { isSelected, handleChange } = useRadio(props);

        useRender(() => {
            const isAutofocus = coerce<boolean>(props.autofocus);
            const isDisabled = coerce<boolean>(props.disabled);

            const classList = {
                "mdc-radio": true,
                "mdc-radio--primary": props.color === "primary",
                "mdc-radio--secondary": props.color === "secondary",
                "mdc-radio--tertiary": props.color === "tertiary"
            };

            return (
                <div class={classList}>
                    <input
                        id={props.id}
                        name={props.name}
                        class="mdc-radio__native-control"
                        type="radio"
                        autofocus={isAutofocus}
                        disabled={isDisabled}
                        checked={isSelected.value}
                        value={props.value}
                        aria-label={props.ariaLabel}
                        onChange={handleChange}
                    />
                    <div class="mdc-radio__background">
                        <div class="mdc-radio__outer-circle"></div>
                        <div class="mdc-radio__inner-circle"></div>
                    </div>
                </div>
            );
        });

        return {};
    }
});
