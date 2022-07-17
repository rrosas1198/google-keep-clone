import { computed, defineComponent } from "vue";
import { IconButtonProps } from "./icon-button.interface";

export const VIconButton = defineComponent({
    name: "VIconButton",
    model: {
        prop: "modelValue",
        event: "update:modelValue"
    },
    props: {
        color: {
            type: String,
            default: null
        },
        variant: {
            type: String,
            default: "standard"
        }
    },
    setup() {
        return {};
    },
    render(props: IconButtonProps) {
        const classList = computed(() => ({
            "mdc-icon-button": true,
            "mdc-icon-button--standard": props.variant === "standard",
            "mdc-icon-button--filled": props.variant === "filled",
            "mdc-icon-button--tonal": props.variant === "tonal",
            "mdc-icon-button--outlined": props.variant === "outlined"
        }));

        return (
            <button class={classList}>
                <span class="mdc-icon-button__icon">VIconButton</span>
            </button>
        );
    }
});
