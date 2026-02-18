<script setup lang="ts">
import {isValidConversion} from '~~/content/io_functions';
import FilesToFilesContent from '~/components/FilesToFilesContent.vue';

definePageMeta({
  validate: async (route) => {
    const group = (route.params.group as any).toLowerCase();
    const input = (route.params.input as string).toLowerCase();
    const output = (route.params.output as string).toLowerCase();
    return isValidConversion([group, input], output);
  }
});

const route = useRoute();
const group = (route.params.group as any).toLowerCase();
const input = (route.params.input as string).toLowerCase();
const output = (route.params.output as string).toLowerCase();

</script>

<template>
  <FilesToFilesContent :input="[group, input]" :output="output">
    <slot/>
  </FilesToFilesContent>
</template>