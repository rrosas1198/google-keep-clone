import type { Ref } from "vue";
import { onMounted } from "vue";
import { useSelectable } from "../composables";
import { coerce } from "../utils";
import type { ICheckboxProps } from "./checkbox.interface";

export function useCheckbox(inputRef: Ref<HTMLInputElement>, props: ICheckboxProps) {
    onMounted(() => {
        // If component has autofocus prop -> focus input
        if (coerce<boolean>(props.autofocus)) {
            inputRef.value.focus();
        }
    });

    return useSelectable(props);
}
