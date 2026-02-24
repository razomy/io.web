<script setup lang="ts">
import {isDirectoryExists} from '~~/razomy/db';

definePageMeta({
  validate: async (route) => {
    const directory0 = (route.params.directory0 as any).toLowerCase();
    return isDirectoryExists([directory0]);
  }
});

const route = useRoute();
const directory0 =  computed(() => String(route.params.directory0).toLowerCase());

</script>

<template>
  <SearchContent :defaultSearch="directory0">
    <slot/>
  </SearchContent>
</template>