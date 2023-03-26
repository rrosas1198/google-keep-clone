<template>
    <div class="create-note">
        <div class="create-note__actions">
            <VIconButton id="with-list" ariaLabel="Nueva lista"
                ><i class="material-symbols-outlined">check_box</i></VIconButton
            >
            <VIconButton id="with-picture" ariaLabel="Nueva nota con imagen"
                ><i class="material-symbols-outlined">image</i></VIconButton
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import { VIconButton } from "src/libs/components";
</script>

<style lang="scss">
@use "src/libs/theme/layout/media-query";
@use "src/libs/theme/system/color";
@use "src/libs/theme/system/shape";

.create-note {
    max-inline-size: 600px;
    display: flex;
    margin-inline: auto;
    padding-inline: 8px;
    border: 1px solid color.get-varname(outline);
    border-radius: shape.get-fallback(corner-small);
}

.create-note__actions {
    display: flex;
    align-items: center;
    margin-left: auto;
    column-gap: 4px;
}
</style>
