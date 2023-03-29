<template>
    <HomeHeader />

    <main class="home container">
        <CreateNote />

        <Masonry class="home__notes" tag="section" :items="notes" :column-width="240">
            <template #default="{ item }">
                <NoteCard :note="item"/>
            </template>
        </Masonry>
    </main>
</template>

<script setup lang="ts">
import Masonry from "src/common/components/Masonry.vue";
import { Note } from "src/features/notes/domain/entities";
import { ListNotesUseCase } from "src/features/notes/domain/use-cases";
import { NoteModule } from "src/features/notes/note.module";
import CreateNote from "src/features/notes/presentation/components/CreateNote.vue";
import NoteCard from "src/features/notes/presentation/components/NoteCard.vue";
import HomeHeader from "src/features/notes/presentation/partials/HomeHeader.vue";

const listNotesUseCase = NoteModule.resolve(ListNotesUseCase);

const notes = ref<Note[]>([]);

useHead({
    title: "Guarda tus ideas estés donde estés"
});

useAsyncData(async () => {
    const [response, _error] = await listNotesUseCase.execute();

    notes.value = response || [];
});
</script>

<style lang="scss">
$home-section-padding: 32px;

.home {
    padding-block-start: var(--navigation-height);

    .create-note {
        margin-block: $home-section-padding;
    }
}

.home__notes {
    --masonry-gap: 16px;
    row-gap: 16px;
    column-gap: 16px;
    padding-block-end: $home-section-padding;
}
</style>
