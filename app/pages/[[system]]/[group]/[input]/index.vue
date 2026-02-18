<script setup lang="ts">
import {isValidConversion} from '~~/content/io_functions';
import InputContent from '~/components/InputContent.vue'

definePageMeta({
  validate: async (route) => {
    const group = (route.params.group as any).toLowerCase();
    const input = (route.params.input as string).toLowerCase();
    return isValidConversion([group, input]);
  }
});

const route = useRoute();
const group = (route.params.group as any).toLowerCase();
const input = (route.params.input as string).toLowerCase();

</script>
<template>
  <InputContent :input="[group, input]">
    <slot/>
  </InputContent>
</template>