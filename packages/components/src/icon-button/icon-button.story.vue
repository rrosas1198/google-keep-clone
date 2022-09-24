<template>
    <Variant name="Default" description="Default icon button">
        <VIconButton id="button-default" aria-label="Icon button" :disabled="disabled"
            >Default</VIconButton
        >
    </Variant>

    <ControlsAddon>
        <label for="color"> Color </label>
        <select id="color" name="color" v-model="color">
            <option value="primary" selected>Primary</option>
            <option value="secondary">Secondary</option>
            <option value="tertiary">Tertiary</option>
        </select>

        <label for="disabled"> Disabled </label>
        <input id="disabled" name="disabled" type="checkbox" v-model="disabled" />
    </ControlsAddon>
</template>

<script lang="ts">
import type { PageMeta } from "@vitebook/client";
import { ControlsAddon } from "@vitebook/vue/addons";
import { IIconButtonColor } from "./icon-button.interface";

export const __pageMeta: PageMeta = {
    title: "IconButton"
};
</script>

<script setup lang="ts">
import { Variant } from "@vitebook/vue";
import { ref } from "vue";
import { VIconButton } from "./icon-button.component";

const disabled = ref(false);
const color = ref<IIconButtonColor>("primary");
</script>
