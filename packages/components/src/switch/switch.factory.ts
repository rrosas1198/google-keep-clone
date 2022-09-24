import { computed } from "vue";
import { getCurrentInstance, toString } from "../utils";
import { ISwitchProps } from "./switch.interface";

export function useSwitch(props: ISwitchProps) {
    const { emit } = getCurrentInstance("switch");

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
