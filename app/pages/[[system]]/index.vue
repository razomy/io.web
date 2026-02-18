<script setup lang="ts">
import DefaultIndex from '../index.vue'

definePageMeta({
  validate: async (route) => {
    const system = ((route.params.system || '') as string).toLowerCase();
    const systemSet = {
      'node': true,
      'curl': true,
    }
    // Валидация типов
    return !!systemSet[system as string];
  }
});
</script>

<template>
  <DefaultIndex>
    <slot/>
  </DefaultIndex>
</template>