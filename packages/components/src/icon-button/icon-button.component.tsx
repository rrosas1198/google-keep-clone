import { useRender } from "src/composables";
import type { IAriaHasPopup } from "src/interfaces";
import { useRipple } from "src/ripple";
import { coerce } from "src/utils";
import type { PropType, Ref, SetupContext } from "vue";
import { defineComponent, ref, renderSlot } from "vue";
import type {
    IIconButtonColor,
    IIconButtonProps,
    IIconButtonType,
    IIconButtonVariant
} from "./icon-button.interface";

export const VIconButton = defineComponent({
    name: "VIconButton",
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
            type: String as PropType<IIconButtonColor>,
            default: null
        },
        variant: {
            type: String as PropType<IIconButtonVariant>,
            default: "standard"
        },
        ariaLabel: {
            type: String,
            required: true
        },
        ariaHasPopup: {
            type: String as PropType<IAriaHasPopup>,
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
        link: {
            type: [Boolean, String],
            default: false
        },
        type: {
            type: String as PropType<IIconButtonType>,
            default: "button"
        }
    },
    setup(props: IIconButtonProps, { slots }: SetupContext) {
        const proxy = ref<HTMLElement>() as Ref<HTMLElement>;

        const ripple = useRipple(proxy, {
            disabled: props.disabled,
            unbounded: true
        });

        useRender(() => {
            const isAutofocus = coerce<boolean>(props.autofocus);
            const isDisabled = coerce<boolean>(props.disabled);
            const isLink = coerce<boolean>(props.link);

            const Element = isLink ? "a" : "button";

            const classList = {
                "mdc-icon-button": true,
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
                <Element
                    id={props.id}
                    name={props.name || props.id}
                    class={classList}
                    autofocus={isAutofocus}
                    disabled={isDisabled}
                    type={isLink ? undefined : props.type}
                    role={isLink ? "button" : undefined}
                    aria-label={props.ariaLabel}
                    aria-has-popup={props.ariaHasPopup}
                    {...ripple.listeners}
                >
                    {renderSlot(slots, "default")}
                    <span ref={proxy} class={ripple.classList.value}></span>
                </Element>
            );
        });

        return {};
    }
});
