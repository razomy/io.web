<script setup lang="ts">
import DefaultIndex from '../../index.vue'
import {isDirectoryExists} from '~~/razomy/db';

definePageMeta({
  validate: async (route) => {
    const directory0 = (route.params.directory0 as any).toLowerCase();
    return isDirectoryExists([directory0]);
  }
});
</script>

<template>
  <DefaultIndex>
    <slot/>
  </DefaultIndex>
</template>