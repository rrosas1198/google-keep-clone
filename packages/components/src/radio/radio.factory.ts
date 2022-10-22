import { getCurrentInstance } from "src/utils";
import { computed } from "vue";
import { IRadioProps } from "./radio.interface";

export function useRadio(props: IRadioProps) {
    const { emit } = getCurrentInstance("radio");

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
