import type { PropType, Ref, SetupContext } from "vue";
import { defineComponent, ref, renderSlot } from "vue";
import { useRender } from "../composables";
import { useRipple } from "../ripple";
import type { IButtonColor, IButtonProps, IButtonType, IButtonVariant } from "./button.interface";

export const VButton = defineComponent({
    name: "VButton",
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
            type: String as PropType<IButtonColor>,
            default: null
        },
        variant: {
            type: String as PropType<IButtonVariant>,
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
        type: {
            type: String as PropType<IButtonType>,
            default: "button"
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
    setup(props: IButtonProps, { slots }: SetupContext) {
        const proxy = ref<HTMLElement>() as Ref<HTMLElement>;

        const ripple = useRipple(proxy, { disabled: props.disabled });

        useRender(() => {
            const isOutlined = props.variant === "outlined";

            const hasLeading = "leading" in slots || !!props.leadingIcon;
            const hasTrailing = "trailing" in slots || !!props.trailingIcon;

            const renderRipple = () => {
                const classList = { "mdc-button__ripple": true, ...ripple.classList.value };
                return <span ref={proxy} class={classList}></span>;
            };

            const renderOutline = () => <span class="mdc-button__outline"></span>;

            const renderIcon = (content: string) => <span class="mdc-button__icon">{content}</span>;

            const renderLeading = () => (
                <span class="mdc-button__leading">
                    {"leading" in slots
                        ? renderSlot(slots, "leading")
                        : renderIcon(props.leadingIcon)}
                </span>
            );

            const renderTrailing = () => (
                <span class="mdc-button__trailing">
                    {"trailing" in slots
                        ? renderSlot(slots, "trailing")
                        : renderIcon(props.trailingIcon)}
                </span>
            );

            return (
                <button
                    id={props.id}
                    name={props.name || props.id}
                    class={{
                        "mdc-button": true,
                        "mdc-button--icon-leading": hasLeading,
                        "mdc-button--icon-trailing": hasTrailing,
                        "mdc-button--primary": props.color === "primary",
                        "mdc-button--secondary": props.color === "secondary",
                        "mdc-button--tertiary": props.color === "tertiary",
                        "mdc-button--elevated": props.variant === "elevated",
                        "mdc-button--filled": props.variant === "filled",
                        "mdc-button--tonal": props.variant === "tonal",
                        "mdc-button--outlined": isOutlined,
                        "mdc-button--text": props.variant === "text"
                    }}
                    autofocus={props.autofocus}
                    disabled={props.disabled}
                    type={props.type}
                    {...ripple.listeners}
                >
                    {renderRipple()}
                    {isOutlined && renderOutline()}
                    {hasLeading && renderLeading()}
                    <span class="mdc-button__label">{renderSlot(slots, "default")}</span>
                    {hasTrailing && renderTrailing()}
                </button>
            );
        });

        return {};
    }
});
