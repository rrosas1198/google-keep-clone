<template>
    <Variant name="Default" description="Default icon button toggle">
        <VIconButtonToggle
            id="icon-button-toggle-default"
            aria-label="Icon button toggle"
            :disabled="disabled"
            v-model="isOn"
            >Default</VIconButtonToggle
        >
    </Variant>

    <Variant name="Elevated" description="Elevated icon button toggle">
        <VIconButtonToggle
            id="icon-button-toggle-elevated"
            variant="elevated"
            aria-label="Icon button toggle"
            :color="color"
            :disabled="disabled"
            v-model="isOn"
            >Elevated</VIconButtonToggle
        >
    </Variant>

    <Variant name="Filled" description="Filled icon button toggle">
        <VIconButtonToggle
            id="icon-button-toggle-filled"
            variant="filled"
            aria-label="Icon button toggle"
            :color="color"
            :disabled="disabled"
            v-model="isOn"
            >Filled</VIconButtonToggle
        >
    </Variant>

    <Variant name="Tonal" description="Tonal icon button toggle">
        <VIconButtonToggle
            id="icon-button-toggle-tonal"
            variant="tonal"
            aria-label="Icon button toggle"
            :color="color"
            :disabled="disabled"
            v-model="isOn"
            >Tonal</VIconButtonToggle
        >
    </Variant>

    <Variant name="Outlined" description="Outlined icon button toggle">
        <VIconButtonToggle
            id="icon-button-toggle-outlined"
            variant="outlined"
            aria-label="Icon button toggle"
            :color="color"
            :disabled="disabled"
            v-model="isOn"
            >Outlined</VIconButtonToggle
        >
    </Variant>

    <Variant name="Text" description="Text icon button toggle">
        <VIconButtonToggle
            id="icon-button-toggle-text"
            variant="text"
            aria-label="Icon button toggle"
            :color="color"
            :disabled="disabled"
            v-model="isOn"
            >Text</VIconButtonToggle
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

export const __pageMeta: PageMeta = {
    title: "IconButtonToggle"
};
</script>

<script setup lang="ts">
import { Variant } from "@vitebook/vue";
import { ref } from "vue";
import { VIconButtonToggle } from "./icon-button-toggle.component";
import { IIconButtonToggleColor } from "./icon-button-toggle.interface";

const disabled = ref(false);
const color = ref<IIconButtonToggleColor>("primary");

const isOn = ref(false);
</script>
