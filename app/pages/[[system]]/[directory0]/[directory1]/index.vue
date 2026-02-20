<script setup lang="ts">
import {isValidConversion} from '~~/content/io';
import InputContent from '~/components/InputContent.vue'

definePageMeta({
  validate: async (route) => {
    const directory0 = (route.params.directory0 as any).toLowerCase();
    const directory1 = (route.params.directory1 as string).toLowerCase();
    return isValidConversion([directory0, directory1]);
  }
});

const route = useRoute();
const directory0 = (route.params.directory0 as any).toLowerCase();
const directory1 = (route.params.directory1 as string).toLowerCase();

</script>
<template>
  <InputContent :directories="[directory0, directory1]">
    <slot/>
  </InputContent>
</template>