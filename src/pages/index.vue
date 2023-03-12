<template>
    <header class="home__header container-fluid">
        <VIconButton id="menu" link aria-label="Abrir menú" color="primary" variant="standard">
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
import { ListNotesUseCase } from "src/features/notes/domain/use-cases";
import { NoteModule } from "src/features/notes/note.module";
import { VIconButton, VTextField } from "src/libs/components";

const listNotesUseCase = NoteModule.resolve(ListNotesUseCase);

useHead({
    title: "Guarda tus ideas estés donde estés"
});

useFetch(async () => {
    const response = await listNotesUseCase.execute();

    console.log(response);

    return {};
});

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
@use "src/libs/theme/layout/media-query";
@use "src/libs/theme/system/shape";

.home__header {
    inline-size: 100%;
    display: flex;
    align-items: center;
    padding-inline: 8px;
    padding-block: 4px;
    // margin-block: 8px;
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

    @include media-query.breakpoint-up(md) {
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

    @include media-query.breakpoint-up(md) {
        display: flex;
    }
}
</style>
