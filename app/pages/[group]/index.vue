<script setup lang="ts">
import DefaultIndex from '../index.vue'
import {groups} from '~~/content/context';

const route = useRoute();

const group = (route.params.group as string).toLowerCase();
// Проверяем, существует ли такой формат
definePageMeta({
  validate: async (route) => {
    const group = (route.params.group as string).toLowerCase();
    // Валидация типов
    return !!groups[group as keyof typeof groups];
  }
});
</script>

<template>
  <DefaultIndex>
    <slot/>
  </DefaultIndex>
</template>