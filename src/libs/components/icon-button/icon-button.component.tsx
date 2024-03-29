import type { PropType, Ref, SetupContext } from "vue";
import { defineComponent, ref, renderSlot } from "vue";
import { useRender } from "../composables";
import type { IAriaHasPopup } from "../interfaces";
import { useRipple } from "../ripple";
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
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        link: {
            type: Boolean,
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
            const Element = props.link ? "a" : "button";

            const renderRipple = () => {
                const classList = { "mdc-icon-button__ripple": true, ...ripple.classList.value };
                return <span ref={proxy} class={classList}></span>;
            };

            return (
                <Element
                    id={props.id}
                    name={props.name || props.id}
                    class={{
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
                    }}
                    autofocus={props.autofocus}
                    disabled={props.disabled}
                    type={props.link ? undefined : props.type}
                    role={props.link ? "button" : undefined}
                    aria-label={props.ariaLabel}
                    aria-has-popup={props.ariaHasPopup}
                    {...ripple.listeners}
                >
                    {renderSlot(slots, "default")}
                    {renderRipple()}
                </Element>
            );
        });

        return {};
    }
});
