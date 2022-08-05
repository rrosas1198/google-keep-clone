import { ComponentInternalInstance, computed, getCurrentInstance } from "vue";
import { toString } from "../utils";
import { CheckboxProps } from "./checkbox.interface";

export function useCheckbox(props: CheckboxProps) {
    const { emit } = getCurrentInstance() as ComponentInternalInstance;

    const isChecked = computed(() => {
        if (toString(props.modelValue) === "[object Boolean]") {
            return props.modelValue as boolean;
        }
        if (Array.isArray(props.modelValue)) {
            return props.modelValue.includes(props.value);
        }
        if (props.modelValue !== null && props.modelValue !== undefined) {
            return props.modelValue === props.value;
        }
        return !!props.modelValue;
    });

    const handleChange = (event: Event) => {
        const changeValue = _getChangeValue(event);
        const modelValue = _getModelValue(event);
        emit("change", changeValue);
        emit("update:modelValue", modelValue);
    };

    const _getChangeValue = (event: Event) => {
        const target = event.target as HTMLInputElement;
        return target.checked ? props.value : false;
    };

    const _getModelValue = (event: Event) => {
        const target = event.target as HTMLInputElement;

        if (!Array.isArray(props.modelValue)) {
            return _getChangeValue(event);
        }

        if (target.checked) {
            return [...props.modelValue, props.value];
        } else {
            return [...props.modelValue].filter(val => val !== props.value);
        }
    };

    return { isChecked, handleChange };
}
