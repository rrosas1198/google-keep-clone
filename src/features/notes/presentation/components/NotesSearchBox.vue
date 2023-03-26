<template>
    <form id="search" :class="{ home__search: true, 'home__search--expanded': focusedModel }">
        <VIconButton
            id="search-submit"
            :class="{
                'home__search-submit': true,
                'home__search-submit--hidden': focusedModel
            }"
            ariaLabel="Buscar"
            type="submit"
            @click.prevent="toggleFocusSearch(true)"
        >
            <i class="material-symbols-outlined">search</i>
        </VIconButton>

        <VIconButton
            id="search-back"
            :class="{
                'home__search-back': true,
                'home__search-back--hidden': !focusedModel
            }"
            ariaLabel="Buscar"
            @click="toggleFocusSearch(false)"
        >
            <i class="material-symbols-outlined">arrow_back</i>
        </VIconButton>

        <input
            ref="searchInputRef"
            id="search-input"
            name="search-input"
            class="home__search-input"
            placeholder="Buscar"
            @focus="toggleFocusSearch(true)"
            @blur="toggleFocusSearch(false)"
        />

        <VIconButton
            id="search-reset"
            :class="{
                'home__search-reset': true,
                'home__search-reset--hidden': !focusedModel
            }"
            ariaLabel="Borrar búsqueda"
            type="reset"
        >
            <i class="material-symbols-outlined">close</i>
        </VIconButton>
    </form>
</template>

<script setup lang="ts">
import { useInternalInstance, useReflexiveModel, VIconButton } from "src/libs/components";

defineProps({
    focused: {
        type: Boolean,
        default: false
    }
});

defineEmits(["update:focused"]);

const { props } = useInternalInstance("NotesSearchBox");
const focusedModel = useReflexiveModel(props, "focused");

const searchInputRef = ref<HTMLInputElement>();

function toggleFocusSearch(focused: boolean) {
    _setFocusModel(focused);
    _setInputFocus(focused);
}

function _setInputFocus(focused: boolean) {
    if (focused) {
        searchInputRef.value?.focus();
    } else {
        searchInputRef.value?.blur();
    }
}

function _setFocusModel(focused: boolean) {
    focusedModel.value = focused;
}
</script>

<style lang="scss">
@use "src/libs/theme/layout/media-query";
@use "src/libs/theme/system/color";
@use "src/libs/theme/system/shape";

.home__search {
    position: relative;
    height: 48px;
    max-width: 720px;
    display: flex;
    align-items: center;
    margin-inline-start: auto;
    border-radius: shape.get-fallback("corner-small");

    &.home__search--expanded {
        background-color: color.get-varname("inverse-on-surface");

        @include media-query.breakpoint-down(md) {
            margin-inline-start: 0;
            flex: 1;
        }
    }

    @include media-query.breakpoint-up(md) {
        flex: 1;
        margin-inline: auto;
        background-color: color.get-varname("inverse-on-surface");
    }
}

.home__search-input {
    width: 100%;
    height: 100%;
    padding: 0 56px;
    display: none;
    color: currentColor;
    text-align: start;
    background: none;
    border: none;
    border-radius: inherit;
    appearance: none;

    @include media-query.breakpoint-up(md) {
        display: block;
    }

    &::-ms-clear,
    &::-ms-reveal {
        display: none;
    }

    &::placeholder {
        color: currentColor;
        opacity: 1;
    }

    &:focus {
        outline: none;
    }

    @media (forced-colors: active) {
        background-color: field;
    }

    .home__search--expanded & {
        display: block;
    }
}

.home__search-back,
.home__search-reset {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}

.home__search-submit {
    @include media-query.breakpoint-up(md) {
        position: absolute;
        top: 50%;
        left: 8px;
        transform: translateY(-50%);
    }
}

.home__search-submit--hidden {
    display: none;

    @include media-query.breakpoint-up(md) {
        display: flex;
    }
}

.home__search-back {
    @include media-query.breakpoint-up(md) {
        display: none;
    }
}

.home__search-back--hidden {
    display: none;
}

.home__search-reset {
    right: 8px;
}

.home__search-reset--hidden {
    display: none;
}
</style>
