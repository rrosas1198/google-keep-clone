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
            "mdc-icon-button--standard": props.variant === "standard"
        }));

        return <button class={classList}>VIconButton</button>;
    }
});
