/* eslint-disable @typescript-eslint/no-explicit-any */
import { VNode } from "vue";
import { getCurrentInstance } from "../utils";

// See https://github.com/vuetifyjs/vuetify/blob/next/packages/vuetify/src/util/useRender.ts#L7
export function useRender(render: () => VNode): void {
    const _instance = getCurrentInstance("render") as any;
    _instance.render = render;
}
