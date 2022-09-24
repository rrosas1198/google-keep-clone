<template>
    <Variant name="Default" description="Default checkbox">
        <VCheckbox
            id="checkbox-default"
            :disabled="disabled"
            :indeterminate="indeterminate"
            :label="label"
            v-model="modelValue"
        ></VCheckbox>
    </Variant>

    <ControlsAddon>
        <label for="label"> Label </label>
        <input id="label" name="label" type="text" v-model="label" />

        <label for="disabled"> Disabled </label>
        <input id="disabled" name="disabled" type="checkbox" v-model="disabled" />

        <label for="indeterminate"> Indeterminate </label>
        <input id="indeterminate" name="indeterminate" type="checkbox" v-model="indeterminate" />
    </ControlsAddon>
</template>

<script lang="ts">
import type { PageMeta } from "@vitebook/client";
import { ControlsAddon } from "@vitebook/vue/addons";
import { ref } from "vue";

export const __pageMeta: PageMeta = {
    title: "Checkbox"
};
</script>

<script setup lang="ts">
import { Variant } from "@vitebook/vue";
import { VCheckbox } from "./checkbox.component";

const label = ref<string>();
const disabled = ref(false);
const indeterminate = ref(false);
const modelValue = ref(false);
</script>
