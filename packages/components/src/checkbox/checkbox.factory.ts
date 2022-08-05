import { ComponentInternalInstance, computed, getCurrentInstance } from "vue";
import { toString } from "../utils";
import { CheckboxProps } from "./checkbox.interface";

export function useCheckbox(props: CheckboxProps) {
    const { emit } = getCurrentInstance() as ComponentInternalInstance;

    const isChecked = computed(() => {
        if (toString(props.modelValue) === "[object Boolean]") {
            return props.modelValue as boolean;
        } else if (Array.isArray(props.modelValue)) {
            return props.modelValue.includes(props.value);
        } else if (props.modelValue !== null && props.modelValue !== undefined) {
            return props.modelValue === props.value;
        } else {
            return !!props.modelValue;
        }
    });

    const handleChange = (event: Event) => {
        if (props.disabled) return;
        const target = event.target as HTMLInputElement;
        emit("change", target.checked);
        emit("update:modelValue", target.checked);
    };

    return { isChecked, handleChange };
}
