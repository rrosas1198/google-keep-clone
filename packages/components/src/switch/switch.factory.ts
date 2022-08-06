import { ComponentInternalInstance, computed, getCurrentInstance } from "vue";
import { toString } from "../utils";
import { SwitchProps } from "./switch.interface";

export function useSwitch(props: SwitchProps) {
    const { emit } = getCurrentInstance() as ComponentInternalInstance;

    const isActive = computed(() => {
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

    return { isActive, handleChange };
}
