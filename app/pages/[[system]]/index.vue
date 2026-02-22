<script setup lang="ts">
import {systemSet} from '~~/razomy/db';

definePageMeta({
  validate: async (route) => {
    const system = ((route.params.system || '') as any).toLowerCase();
    // Валидация типов
    return systemSet[system as keyof typeof systemSet] || false;
  }
});
</script>

<template>
  <SearchContent :defaultSearch="''">
    <slot/>
  </SearchContent>
</template>