import { useRender } from "src/composables";
import { coerce } from "src/utils";
import type { PropType, SetupContext } from "vue";
import { defineComponent } from "vue";
import { useSwitch } from "./switch.factory";
import type { ISwitchColor, ISwitchProps } from "./switch.interface";

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
            type: String as PropType<ISwitchColor>,
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
    setup(props: ISwitchProps, { attrs }: SetupContext) {
        const { isActive, handleChange } = useSwitch(props);

        useRender(() => {
            const isAutofocus = coerce<boolean>(props.autofocus);
            const isDisabled = coerce<boolean>(props.disabled);

            const classList = {
                "mdc-switch": true,
                "mdc-switch--primary": props.color === "primary",
                "mdc-switch--secondary": props.color === "secondary",
                "mdc-switch--tertiary": props.color === "tertiary"
            };

            return (
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
            );
        });

        return {};
    }
});
