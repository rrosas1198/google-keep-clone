import { defineComponent } from "vue";

export const VTextField = defineComponent({
    name: "VTextField",
    model: {
        prop: "modelValue",
        event: "update:modelValue"
    },
    setup() {
        //
    },
    render() {
        return <div>VTextField</div>;
    }
});
