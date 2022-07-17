import { defineComponent } from "vue";

export const VButton = defineComponent({
    name: "VButton",
    model: {
        prop: "modelValue",
        event: "update:modelValue"
    },
    setup() {
        //
    },
    render() {
        return <div>VButton</div>;
    }
});
