<template>
    <Story title="Button">
        <Variant title="playground" :init-state="initState">
            <template #default="{ state }">
                <VButton
                    id="buttonElevated"
                    variant="elevated"
                    :color="state.color"
                    :disabled="state.disabled"
                >
                    Elevated
                </VButton>

                <VButton
                    id="buttonFilled"
                    variant="filled"
                    :color="state.color"
                    :disabled="state.disabled"
                >
                    Filled
                </VButton>

                <VButton
                    id="buttonTonal"
                    variant="tonal"
                    :color="state.color"
                    :disabled="state.disabled"
                >
                    Tonal
                </VButton>

                <VButton
                    id="buttonOutlined"
                    variant="outlined"
                    :color="state.color"
                    :disabled="state.disabled"
                >
                    Outlined
                </VButton>

                <VButton
                    id="buttonText"
                    variant="text"
                    :color="state.color"
                    :disabled="state.disabled"
                >
                    Text
                </VButton>
            </template>

            <template #controls="{ state }">
                <HstCheckbox title="Disabled" v-model="state.disabled" />
                <HstSelect title="Color" v-model="state.color" :options="colors" />
            </template>
        </Variant>
    </Story>
</template>

<script setup lang="ts">
import { VButton } from "./button.component";

const colors = [
    { value: "primary", label: "Primary" },
    { value: "secondary", label: "Secondary" },
    { value: "tertiary", label: "Tertiary" }
];

const initState = () => ({
    disabled: false,
    color: "primary"
});
</script>
