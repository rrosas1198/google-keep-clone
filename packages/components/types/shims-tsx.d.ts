/* eslint-disable @typescript-eslint/no-explicit-any */
import { VNode } from "vue";

declare global {
    namespace JSX {
        type Element = VNode;
        type ElementClass = Vue;
        interface IntrinsicElements {
            [elem: string]: any;
        }
    }
}
