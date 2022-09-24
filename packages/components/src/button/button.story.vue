<template>
    <Variant name="Default" description="Default button">
        <VButton id="button-default" :disabled="disabled">Default</VButton>
    </Variant>

    <Variant name="Elevated" description="Elevated button">
        <VButton
            id="button-elevated"
            variant="elevated"
            :color="color"
            :disabled="disabled"
            :leading-icon="leadingIcon"
            :trailing-icon="trailingIcon"
            >Elevated</VButton
        >
    </Variant>

    <Variant name="Filled" description="Filled button">
        <VButton
            id="button-filled"
            variant="filled"
            :color="color"
            :disabled="disabled"
            :leading-icon="leadingIcon"
            :trailing-icon="trailingIcon"
            >Filled</VButton
        >
    </Variant>

    <Variant name="Tonal" description="Tonal button">
        <VButton
            id="button-tonal"
            variant="tonal"
            :color="color"
            :disabled="disabled"
            :leading-icon="leadingIcon"
            :trailing-icon="trailingIcon"
            >Tonal</VButton
        >
    </Variant>

    <Variant name="Outlined" description="Outlined button">
        <VButton
            id="button-outlined"
            variant="outlined"
            :color="color"
            :disabled="disabled"
            :leading-icon="leadingIcon"
            :trailing-icon="trailingIcon"
            >Outlined</VButton
        >
    </Variant>

    <Variant name="Text" description="Text button">
        <VButton
            id="button-text"
            variant="text"
            :color="color"
            :disabled="disabled"
            :leading-icon="leadingIcon"
            :trailing-icon="trailingIcon"
            >Text</VButton
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

        <label for="leadingIcon"> Leading Icon </label>
        <input id="leadingIcon" name="leadingIcon" type="text" v-model="leadingIcon" />

        <label for="trailingIcon"> Trailing Icon </label>
        <input id="trailingIcon" name="trailingIcon" type="text" v-model="trailingIcon" />
    </ControlsAddon>
</template>

<script lang="ts">
import type { PageMeta } from "@vitebook/client";
import { ControlsAddon } from "@vitebook/vue/addons";

export const __pageMeta: PageMeta = {
    title: "Button"
};
</script>

<script setup lang="ts">
import { Variant } from "@vitebook/vue";
import { ref } from "vue";
import { VButton } from "./button.component";
import { IButtonColor } from "./button.interface";

const disabled = ref(false);
const color = ref<IButtonColor>("primary");
const leadingIcon = ref<string>();
const trailingIcon = ref<string>();
</script>
