<script setup lang="ts">
import {isValidConversion} from '~~/content/outputRecords';
import FilesToFilesContent from '~/components/FilesToFilesContent.vue';

definePageMeta({
  validate: async (route) => {
    const input0 = (route.params.input0 as any).toLowerCase();
    const input1 = (route.params.input1 as string).toLowerCase();
    const output = (route.params.output as string).toLowerCase();
    return isValidConversion([input0, input1], output);
  }
});

const route = useRoute();
const input0 = (route.params.input0 as any).toLowerCase();
const input1 = (route.params.input1 as string).toLowerCase();
const output = (route.params.output as string).toLowerCase();

</script>

<template>
  <FilesToFilesContent :inputs="[input0, input1]" :output="output">
    <slot/>
  </FilesToFilesContent>
</template>