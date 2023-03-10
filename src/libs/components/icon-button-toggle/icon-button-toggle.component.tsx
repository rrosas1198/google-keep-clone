import type { PropType, Ref, SetupContext } from "vue";
import { computed, defineComponent, ref, renderSlot } from "vue";
import { useRender } from "../composables";
import { useRipple } from "../ripple";
import { coerce } from "../utils";
import { useIconButtonToggle } from "./icon-button-toggle.factory";
import type {
    IIconButtonToggleColor,
    IIconButtonToggleProps,
    IIconButtonToggleVariant
} from "./icon-button-toggle.interface";

export const VIconButtonToggle = defineComponent({
    name: "VIconButtonToggle",
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
        color: {
            type: String as PropType<IIconButtonToggleColor>,
            default: null
        },
        variant: {
            type: String as PropType<IIconButtonToggleVariant>,
            default: "standard"
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
            required: true
        },
        ariaLabelOn: {
            type: String,
            default: null
        },
        ariaLabelOff: {
            type: String,
            default: null
        },
        dataIconOn: {
            type: String,
            default: null
        },
        dataIconOff: {
            type: String,
            default: null
        }
    },
    setup(props: IIconButtonToggleProps, { slots }: SetupContext) {
        const proxy = ref<HTMLElement>() as Ref<HTMLElement>;

        const { isOn, handleChange } = useIconButtonToggle(props);

        const ripple = useRipple(proxy, {
            disabled: props.disabled,
            unbounded: true
        });

        useRender(() => {
            const isAutofocus = coerce<boolean>(props.autofocus);
            const isDisabled = coerce<boolean>(props.disabled);

            const hasAriaLabel = props.ariaLabelOn && props.ariaLabelOff;

            const ariaPressed = hasAriaLabel ? undefined : isOn.value;
            const ariaLabel = computed(() => {
                if (!hasAriaLabel) return props.ariaLabel;
                return isOn.value ? props.ariaLabelOn : props.ariaLabelOff;
            });

            const classList = {
                "mdc-icon-button": true,
                "mdc-icon-button--on": isOn.value,
                "mdc-icon-button--primary": props.color === "primary",
                "mdc-icon-button--secondary": props.color === "secondary",
                "mdc-icon-button--tertiary": props.color === "tertiary",
                "mdc-icon-button--standard": props.variant === "standard",
                "mdc-icon-button--elevated": props.variant === "elevated",
                "mdc-icon-button--filled": props.variant === "filled",
                "mdc-icon-button--tonal": props.variant === "tonal",
                "mdc-icon-button--outlined": props.variant === "outlined",
                "mdc-icon-button--text": props.variant === "text"
            };

            return (
                <button
                    id={props.id}
                    name={props.name || props.id}
                    class={classList}
                    autofocus={isAutofocus}
                    disabled={isDisabled}
                    type="button"
                    aria-pressed={ariaPressed}
                    aria-label={ariaLabel.value}
                    onClick={handleChange}
                    {...ripple.listeners}
                >
                    <span class="mdc-icon-button__icon">{renderSlot(slots, "off-icon")}</span>
                    <span class="mdc-icon-button__icon--on">{renderSlot(slots, "on-icon")}</span>
                    <span ref={proxy} class={ripple.classList.value}></span>
                </button>
            );
        });

        return {};
    }
});
