import { computed } from "vue";
import { getCurrentInstance, toString } from "../utils";
import { IIconButtonToggleProps } from "./icon-button-toggle.interface";

export function useIconButtonToggle(props: IIconButtonToggleProps) {
    const { emit } = getCurrentInstance("icon-button-toggle");

    const isOn = computed(() => {
        if (toString(props.modelValue) === "[object Boolean]") {
            return props.modelValue as boolean;
        }
        return !!props.modelValue;
    });

    const handleChange = () => {
        const newValue = !isOn.value;
        emit("change", newValue);
        emit("update:modelValue", newValue);
    };

    return { isOn, handleChange };
}
