<script setup lang="ts">
import {isValidConversion} from '~~/content/outputRecords';
import InputContent from '~/components/InputContent.vue'

definePageMeta({
  validate: async (route) => {
    const input0 = (route.params.input0 as any).toLowerCase();
    const input1 = (route.params.input1 as string).toLowerCase();
    return isValidConversion([input0, input1]);
  }
});

const route = useRoute();
const input0 = (route.params.input0 as any).toLowerCase();
const input1 = (route.params.input1 as string).toLowerCase();

</script>
<template>
  <InputContent :inputs="[input0, input1]">
    <slot/>
  </InputContent>
</template>