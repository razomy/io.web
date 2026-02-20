<script setup lang="ts">
import DefaultIndex from '../index.vue'

definePageMeta({
  validate: async (route) => {
    const system = ((route.params.system || '') as any).toLowerCase();
    const systemSet = {
      'node': true,
      'curl': true,
    }
    // Валидация типов
    return systemSet[system as keyof typeof systemSet] || false;
  }
});
</script>

<template>
  <DefaultIndex>
    <slot/>
  </DefaultIndex>
</template>