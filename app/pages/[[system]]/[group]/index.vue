<script setup lang="ts">
import DefaultIndex from '../../index.vue'
import {ioGroupSet} from '~~/content/io_groups';

definePageMeta({
  validate: async (route) => {
    const group = (route.params.group as string).toLowerCase();
    return !!ioGroupSet[group];
  }
});
</script>

<template>
  <DefaultIndex>
    <slot/>
  </DefaultIndex>
</template>