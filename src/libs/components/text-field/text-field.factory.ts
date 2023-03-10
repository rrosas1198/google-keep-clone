import type { Ref } from "vue";
import { nextTick, onMounted, ref } from "vue";
import { useReflexiveModel } from "../composables";
import type { ITextFieldProps } from "./text-field.interface";

export function useTextField(inputRef: Ref<HTMLInputElement | undefined>, props: ITextFieldProps) {
    const model = useReflexiveModel(props, "modelValue");

    const isFocused = ref<boolean>(false);
    const isFloating = ref<boolean>(false);
    const isShaken = ref<boolean>(false);

    const handleInput = (ev: Event) => {
        model.value = (ev.target as HTMLInputElement).value;
    };

    const handleFocus = () => {
        _focusInput();

        if (!isFocused.value) {
            _focusControl(true);
        }

        _maybeFloat();
    };

    const handleBlur = () => {
        if (!isFocused.value) return;
        _focusControl(false);
        _maybeFloat();
    };

    const _focusInput = () => {
        if (!inputRef.value) return;
        if (inputRef.value.isSameNode(document.activeElement)) return;

        inputRef.value.focus();
    };

    const _maybeFloat = () => {
        const shouldFloat = _shouldFloat();
        const shouldShake = _shouldShake();

        if (props.label) {
            _floatLabel(shouldFloat);
            _shakeLabel(shouldShake);
        }
    };

    const _shouldFloat = () => isFocused.value || !!model.value;

    const _shouldShake = () => !isFocused.value && props.error && !!model.value;

    const _floatLabel = (shouldFloat: boolean) => {
        isFloating.value = shouldFloat;
    };

    const _shakeLabel = (shouldShake: boolean) => {
        isShaken.value = shouldShake;
    };

    const _focusControl = (shouldFocus: boolean) => {
        if (isFocused.value === shouldFocus) return;
        isFocused.value = shouldFocus;
    };

    onMounted(async () => {
        await nextTick();

        const shouldFloat = _shouldFloat();

        if (isFocused.value || props.autofocus) {
            _focusControl(true);
            _maybeFloat();
            _focusInput();
        } else if (!!props.label && shouldFloat) {
            _floatLabel(true);
        }
    });

    return { model, isFocused, isFloating, isShaken, handleInput, handleFocus, handleBlur };
}
