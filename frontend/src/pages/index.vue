<template>
    <header class="home__header container-fluid">
        <VIconButton id="menu" link aria-label="Abrir menú">
            <i class="material-symbols-outlined">menu</i>
        </VIconButton>

        <form id="search" class="home__search">
            <VIconButton
                id="search-submit"
                class="home__search-submit"
                aria-label="Buscar"
                type="submit"
            >
                <i class="material-symbols-outlined">search</i>
            </VIconButton>

            <VTextField id="search-input" label="Buscar" placeholder="Buscar" />

            <VIconButton
                id="search-reset"
                class="home__search-reset"
                aria-label="Borrar búsqueda"
                type="reset"
            >
                <i class="material-symbols-outlined">close</i>
            </VIconButton>
        </form>

        <VIconButton id="refresh" class="home__refresh" link aria-label="Actualizar">
            <i class="material-symbols-outlined">refresh</i>
        </VIconButton>

        <VIconButton id="view" link :aria-label="gridViewLabel" @click.prevent="toggleViewMode">
            <i class="material-symbols-outlined">{{ gridViewIcon }}</i>
        </VIconButton>

        <VIconButton id="settings" class="home__settings" link aria-label="Configuración">
            <i class="material-symbols-outlined">settings</i>
        </VIconButton>

        <VIconButton id="avatar" link aria-label="Cuenta de Google: Jhon Doe (jhondoe@example.com)">
            <i class="material-symbols-outlined">person_filled</i>
        </VIconButton>
    </header>

    <main class="container-fluid">
        <article>Card 1</article>
        <article>Card 2</article>
        <article>Card 3</article>
        <article>Card 4</article>
        <article>Card 5</article>
        <article>Card 6</article>
        <article>Card 7</article>
    </main>
</template>

<script setup>
import { VIconButton, VTextField } from "@keep/components";

const isSingleView = ref(false);

const gridViewIcon = computed(() => (isSingleView.value ? "grid_view" : "view_agenda"));
const gridViewLabel = computed(() =>
    isSingleView.value ? "Vista de cuadrícula" : "Vista de lista"
);

function toggleViewMode() {
    isSingleView.value = !isSingleView.value;
}
</script>

<style lang="scss">
@use "@keep/theme/modules/math-ext";
@use "@keep/theme/layout/media-query";
@use "@keep/theme/system/shape";

.home__header {
    inline-size: 100%;
    display: flex;
    align-items: center;
    padding-inline: math-ext.to-rem(8px);
    padding-block: math-ext.to-rem(4px);
    margin-block: math-ext.to-rem(8px);
    border-radius: shape.get-fallback(corner-extra-large);
}

.home__search {
    position: relative;
    display: flex;
    align-items: center;
}

.home__search-submit,
.home__search-reset {
    position: absolute;
    inset-block-start: 0;
    display: none;

    @include media-query.breakpoint-up(medium) {
        display: flex;
    }
}

.home__search-submit {
    inset-inline-start: 0;
}

.home__search-reset {
    inset-inline-end: 0;
}

.home__refresh,
.home__settings {
    display: none;

    @include media-query.breakpoint-up(medium) {
        display: flex;
    }
}
</style>
