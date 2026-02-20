<script setup lang="ts">
import {isValidConversion} from '~~/content/io';
import IoFactory from '~/components/IoFactory.vue';

definePageMeta({
  validate: async (route) => {
    const directory0 = (route.params.directory0 as any).toLowerCase();
    const command0 = (route.params.command0 as string).toLowerCase();
    return isValidConversion([directory0], command0);
  }
});

const route = useRoute();
const directory0 = (route.params.directory0 as any).toLowerCase();
const command0 = (route.params.command0 as string).toLowerCase();

</script>

<template>
  <IoFactory :directories="[directory0]" :command="command0">
    <slot/>
  </IoFactory>
</template>