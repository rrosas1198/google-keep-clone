import { getCurrentInstance } from "src/utils";
import type { ICheckboxProps } from "./checkbox.interface";

// TODO: Verify indeterminate support
export function useCheckbox(props: ICheckboxProps) {
    const { emit } = getCurrentInstance("checkbox");

    const handleChange = (event: Event) => {
        const modelValue = _getModelValue(event);
        const changeValue = _getChangeValue(event);
        const indeterminateValue = _getIndeterminateValue(event);

        emit("change", changeValue);
        emit("update:modelValue", modelValue);
        emit("update:indeterminate", indeterminateValue);
    };

    const _getIndeterminateValue = (event: Event) => {
        const target = event.target as HTMLInputElement;
        return target.indeterminate;
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
        }
        return [...props.modelValue].filter(value => value !== props.value);
    };

    return { handleChange };
}
