import type { Ref } from "vue";
import { ref, watch } from "vue";
import { useInternalInstance, useReflexiveModel } from "../composables";
import type { IFieldProps } from "./field.interface";

export function useField(labelRef: Ref<HTMLLabelElement | undefined>, props: IFieldProps) {
    const { emit } = useInternalInstance("useField");

    const isFloating = useReflexiveModel(props, "floating");
    const isShaken = useReflexiveModel(props, "shaken");

    const labelYAxis = ref<string>("");

    const handleClick = (ev: MouseEvent | TouchEvent) => {
        if (props.disabled) return;

        if (ev.target !== document.activeElement) {
            ev.preventDefault();
        }

        emit("click:control", ev);
    };

    const handleFloat = (floating: boolean) => {
        if (!props.label) return;
        if (!labelRef.value) return;

        if (floating) {
            const { height: notchHeight } = labelRef.value.parentElement!.getBoundingClientRect();
            const { height: labelHeight } = labelRef.value.getBoundingClientRect();

            const translateY = ((notchHeight - labelHeight) / 2 + labelHeight / 2) * -1;
            labelYAxis.value = `${translateY}px`;
        } else {
            labelYAxis.value = "";
        }
    };

    const handleShakeEnd = () => {
        isShaken.value = false;
    };

    watch(isFloating, handleFloat);

    return { isFloating, isShaken, labelYAxis, handleClick, handleShakeEnd };
}
