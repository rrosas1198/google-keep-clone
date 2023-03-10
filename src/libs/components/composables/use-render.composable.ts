/* eslint-disable @typescript-eslint/no-explicit-any */
import type { VNode } from "vue";
import { useInternalInstance } from "./use-internal-instance.composable";

/**
 * Returns JSX to use in browser presentation
 * @param {() => VNode} render - Render function
 * @see https://github.com/vuetifyjs/vuetify/blob/v3.0.2/packages/vuetify/src/util/useRender.ts#L7
 */
export function useRender(render: () => VNode): void {
    const _instance = useInternalInstance("useRender") as any;
    _instance.render = render;
}
