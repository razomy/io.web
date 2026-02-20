<script setup lang="ts">
import DefaultIndex from '../../index.vue'
import {directories0Set} from '~~/content/io';

definePageMeta({
  validate: async (route) => {
    const directory0 = (route.params.directory0 as string).toLowerCase();
    return !!directories0Set[directory0];
  }
});
</script>

<template>
  <DefaultIndex>
    <slot/>
  </DefaultIndex>
</template>