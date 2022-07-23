import { computed, getCurrentInstance } from "vue";

export function useModel<T>() {
    const instance = getCurrentInstance();

    return computed({
        get() {
            return instance?.props.modelValue as T | undefined;
        },
        set(newValue) {
            instance?.emit("update:modelValue", newValue);
        }
    });
}
