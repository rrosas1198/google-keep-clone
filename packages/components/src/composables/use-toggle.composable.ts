import { ComponentInternalInstance, computed, getCurrentInstance, toRefs } from "vue";

export type ToggleValue = number | string | boolean;

export interface ToggleProps {
    modelValue: ToggleValue;
    disabled: boolean | string;
    ariaLabelOn: string;
    ariaLabelOff: string;
    dataValueOn: ToggleValue;
    dataValueOff: ToggleValue;
}

export function useToggle(props: ToggleProps) {
    const { emit } = getCurrentInstance() as ComponentInternalInstance;
    const { disabled, modelValue, dataValueOn, dataValueOff, ariaLabelOn, ariaLabelOff } =
        toRefs(props);

    const checked = computed(() => modelValue.value === dataValueOn.value);
    const ariaLabel = computed(() => (checked.value ? ariaLabelOn.value : ariaLabelOff.value));

    const update = (value: ToggleValue) => {
        emit("change", value);
        emit("update:modelValue", value);
    };

    const check = () => update(dataValueOn.value);

    const uncheck = () => update(dataValueOff.value);

    const handleInput = (event: Event) => {
        const target = event.target as HTMLInputElement;
        update(target?.checked ? dataValueOn.value : dataValueOff.value);
    };

    const handleClick = () => {
        if (disabled.value) return;
        checked.value ? uncheck() : check();
    };

    return { checked, ariaLabel, handleInput, handleClick };
}
