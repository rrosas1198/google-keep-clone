import { ComponentInternalInstance, computed, getCurrentInstance } from "vue";
import { RadioProps } from "./radio.interface";

export function useRadio(props: RadioProps) {
    const { emit } = getCurrentInstance() as ComponentInternalInstance;

    const isSelected = computed(() => {
        if (props.modelValue !== null && props.modelValue !== undefined) {
            return props.modelValue === props.value;
        }
        return !!props.modelValue;
    });

    const handleChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        emit("change", target.value);
        emit("update:modelValue", target.value);
    };

    return { isSelected, handleChange };
}
