<template>
    <header class="home__header container-fluid">
        <VIconButton
            id="menu"
            link
            ariaLabel="Abrir menú"
            color="primary"
            variant="standard"
            :class="{ 'home__menu--hidden': isSearchFocused }"
        >
            <i class="material-symbols-outlined">menu</i>
        </VIconButton>

        <NotesSearchBox v-model:focused="isSearchFocused" />

        <VIconButton id="refresh" link ariaLabel="Actualizar" @click.prevent="onRefresh">
            <i class="material-symbols-outlined">refresh</i>
        </VIconButton>

        <VIconButton
            id="view"
            class="home__grid-view"
            link
            :ariaLabel="gridViewLabel"
            @click.prevent="onToggleViewMode"
        >
            <i class="material-symbols-outlined">{{ gridViewIcon }}</i>
        </VIconButton>

        <VIconButton id="settings" link ariaLabel="Configuración">
            <i class="material-symbols-outlined">settings</i>
        </VIconButton>

        <VIconButton id="avatar" link ariaLabel="Cuenta de Google: Jhon Doe (jhondoe@example.com)">
            <i class="material-symbols-outlined">person_filled</i>
        </VIconButton>
    </header>
</template>

<script setup lang="ts">
import { VIconButton } from "src/libs/components";
import NotesSearchBox from "../components/NotesSearchBox.vue";

const emit = defineEmits(["refresh"])

const isSingleView = ref(false);
const isSearchFocused = ref(false);

const gridViewIcon = computed(() => (isSingleView.value ? "grid_view" : "view_agenda"));
const gridViewLabel = computed(() =>
    isSingleView.value ? "Vista de cuadrícula" : "Vista de lista"
);

function onRefresh() {
    emit("refresh");
}

function onToggleViewMode() {
    isSingleView.value = !isSingleView.value;
}
</script>

<style lang="scss">
@use "src/libs/theme/layout/media-query";
@use "src/libs/theme/system/color";
@use "src/libs/theme/system/shape";
@use "src/libs/theme/system/z-index";

.home__header {
    position: fixed;
    inline-size: 100%;
    block-size: var(--navigation-height);
    display: flex;
    align-items: center;
    padding-inline: 8px;
    padding-block: 4px;
    border-bottom: 1px solid color.get-varname("surface-variant");
    z-index: z-index.get-fallback(fixed);

    @include media-query.breakpoint-up(md) {
        padding-block: 8px;
    }
}

.home__menu--hidden {
    display: none;

    @include media-query.breakpoint-up(md) {
        display: flex;
    }
}

.home__grid-view {
    display: none;

    @include media-query.breakpoint-up(md) {
        display: flex;
    }
}
</style>
