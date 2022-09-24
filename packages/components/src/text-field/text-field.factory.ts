import { getCurrentInstance } from "../utils";

export function useTextField() {
    const { emit } = getCurrentInstance("text-field");

    const handleInput = (event: Event) => {
        const target = event.target as HTMLInputElement;
        emit("input", target.value);
        emit("update:modelValue", target.value);
    };

    return { handleInput };
}
