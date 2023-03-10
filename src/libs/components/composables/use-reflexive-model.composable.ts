import type { Ref } from "vue";
import { computed, ref } from "vue";
import { coerce } from "../utils";
import { useInternalInstance } from "./use-internal-instance.composable";

/**
 * Creates a reflexive self managed value with v-model capability
 * @param props - Component props
 * @param propName - Component propName
 * @param defaultValue - Default value
 */
export function useReflexiveModel<P extends object, N extends Extract<keyof P, string>>(
    props: P,
    propName: N,
    defaultValue?: P[N]
) {
    const internalInstance = useInternalInstance("useReflexiveModel");

    // Internal value init with prop value or default value -> mutate when v-model change
    const internalRef = ref(
        coerce(props[propName] === undefined ? defaultValue : props[propName])
    ) as Ref<P[N]>;

    // If vNode has propName -> value is controlled by external variable
    const isControlled = computed(() => Reflect.has(internalInstance.vnode.props || {}, propName));

    // If value is controlled prop value is final value else value is assign to internal ref
    const finalValue = computed(() => (isControlled.value ? props[propName] : internalRef.value));

    return computed({
        get: () => finalValue.value,
        set: value => {
            if (finalValue.value === value) return;
            internalRef.value = value;
            internalInstance.emit(`update:${propName}`, value);
        }
    });
}
