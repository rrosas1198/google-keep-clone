import { ComponentInternalInstance, getCurrentInstance } from "vue";

export function useTextField() {
    const { emit } = getCurrentInstance() as ComponentInternalInstance;

    const handleInput = (event: Event) => {
        const target = event.target as HTMLInputElement;
        emit("input", target.value);
        emit("update:modelValue", target.value);
    };

    return { handleInput };
}
