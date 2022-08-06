import { defineComponent, PropType, SetupContext } from "vue";
import { useRender } from "../composables";
import { coerce } from "../utils";
import { useSwitch } from "./switch.factory";
import { SwitchColor, SwitchProps } from "./switch.interface";

export const VSwitch = defineComponent({
    name: "VSwitch",
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
            type: String as PropType<SwitchColor>,
            default: null
        },
        active: {
            type: [Boolean, String],
            default: false
        },
        autofocus: {
            type: [Boolean, String],
            default: false
        },
        disabled: {
            type: [Boolean, String],
            default: false
        },
        modelValue: {
            type: Boolean,
            default: null
        },
        ariaLabel: {
            type: String,
            default: null
        }
    },
    setup(props: SwitchProps, { attrs }: SetupContext) {
        const { isActive, handleChange } = useSwitch(props);

        const isAutofocus = coerce<boolean>(props.autofocus);
        const isDisabled = coerce<boolean>(props.disabled);

        const classList = {
            "mdc-switch": true,
            "mdc-switch--primary": props.color === "primary",
            "mdc-switch--secondary": props.color === "secondary",
            "mdc-switch--tertiary": props.color === "tertiary"
        };

        useRender(() => (
            <div class={classList}>
                <button
                    id={props.id}
                    name={props.name || props.id}
                    class="mdc-switch__background"
                    type="button"
                    role="switch"
                    autofocus={isAutofocus}
                    disabled={isDisabled}
                    aria-checked={isActive.value}
                    aria-label={props.ariaLabel}
                    onClick={handleChange}
                    {...attrs}
                >
                    <div class="mdc-switch__track"></div>
                </button>

                <input
                    id={props.id}
                    name={props.name || props.id}
                    class="mdc-switch__input"
                    type="checkbox"
                    aria-hidden="true"
                    checked={isActive.value}
                />
            </div>
        ));

        return {};
    }
});
