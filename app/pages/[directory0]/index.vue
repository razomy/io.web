<script setup lang="ts">
import {useCommandTreeStore} from "~/composables/useCommandTreeStore";

definePageMeta({
  validate: async (route) => {
    const {isDirectoryExists} = useCommandTreeStore();
    const directory0 = (route.params.directory0 as any).toLowerCase();
    return isDirectoryExists([directory0]);
  }
});

const route = useRoute();
const directory0 = computed(() => String(route.params.directory0).toLowerCase());

</script>

<template>
  <SearchContent :defaultSearch="directory0">
    <slot/>
  </SearchContent>
</template>
