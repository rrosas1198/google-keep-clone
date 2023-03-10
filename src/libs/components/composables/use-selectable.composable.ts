import { computed } from "vue";
import { useInternalInstance } from "./use-internal-instance.composable";
import { useReflexiveModel } from "./use-reflexive-model.composable";

export interface ISelectableProps<T = unknown> {
    disabled?: boolean;
    falseValue?: T;
    indeterminate?: boolean;
    modelValue?: T | T[];
    readonly?: boolean;
    trueValue?: T;
    value?: T;
}

/**
 * Creates common selectable computed's and methods
 * @param {ISelectableProps} props - Selectable props
 */
export function useSelectable(props: ISelectableProps) {
    const internalInstance = useInternalInstance("useSelectable");

    const modelValue = useReflexiveModel(props, "modelValue");
    const indeterminate = useReflexiveModel(props, "indeterminate");

    // Get custom true value dependes of props
    const trueValue = computed(() => {
        if (props.trueValue !== undefined) return props.trueValue;
        return props.value !== undefined ? props.value : true;
    });

    // Get custom false value depends of props
    const falseValue = computed(() => {
        return props.falseValue !== undefined ? props.falseValue : false;
    });

    // If input is checked depends of modelValue
    const isChecked = computed(() => {
        if (Array.isArray(modelValue.value)) {
            return modelValue.value.includes(trueValue.value);
        } else if (modelValue.value !== null && modelValue.value !== undefined) {
            return modelValue.value === trueValue.value;
        }
        return !!modelValue.value;
    });

    const handleChange = (event: Event) => {
        // If component is disabled or readonly -> return
        if (props.disabled && props.readonly) return;

        // When model value change -> ensure indeterminate is false
        if (indeterminate.value) {
            indeterminate.value = false;
        }

        // Get array or single value dependes of prop type
        const _modelValue = _getModelValue(event);
        modelValue.value = _modelValue;

        // Get single value dependes of true or false value
        const _changeValue = _getChangeValue(event);
        internalInstance.emit("change", _changeValue, event);
    };

    // INFO: True and False values only works if modelValue is not array
    const _getChangeValue = (event: Event) => {
        const target = event.target as HTMLInputElement;
        // If target is: checked -> trueValue || not checked -> falseValue
        return target.checked ? trueValue.value : falseValue.value;
    };

    const _getModelValue = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const value = _getChangeValue(event);

        // If model value is not array -> return value
        if (!Array.isArray(modelValue.value)) return value;

        // If model value is array and target is checked -> add value
        if (target.checked) return [...modelValue.value, value];

        // If model value is array and target is not checked -> remove value
        return [...modelValue.value].filter(val => val !== trueValue.value);
    };

    return { indeterminate, isChecked, trueValue, handleChange };
}
