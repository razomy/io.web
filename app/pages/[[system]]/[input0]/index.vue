<script setup lang="ts">
import DefaultIndex from '../../index.vue'
import {inputRecordsSet} from '~~/content/inputRecords';

definePageMeta({
  validate: async (route) => {
    const input0 = (route.params.input0 as string).toLowerCase();
    return !!inputRecordsSet[input0];
  }
});
</script>

<template>
  <DefaultIndex>
    <slot/>
  </DefaultIndex>
</template>