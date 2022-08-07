import { ComponentInternalInstance, computed, getCurrentInstance } from "vue";
import { toString } from "../utils";
import { IconButtonToggleProps } from "./icon-button-toggle.interface";

export function useIconButtonToggle(props: IconButtonToggleProps) {
    const { emit } = getCurrentInstance() as ComponentInternalInstance;

    const isOn = computed(() => {
        if (toString(props.modelValue) === "[object Boolean]") {
            return props.modelValue as boolean;
        }
        return !!props.modelValue;
    });

    const handleChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        emit("change", target.checked);
        emit("update:modelValue", target.checked);
    };

    return { isOn, handleChange };
}
