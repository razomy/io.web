<script setup lang="ts">
import {isValidConversion} from '~~/content/io';

definePageMeta({
  validate: async (route) => {
    const directory0 = (route.params.directory0 as any).toLowerCase();
    const directory1 = (route.params.directory1 as string).toLowerCase();
    const command1 = (route.params.command1 as string).toLowerCase();
    return isValidConversion([directory0, directory1], command1);
  }
});

const route = useRoute();
const directory0 = (route.params.directory0 as any).toLowerCase();
const directory1 = (route.params.directory1 as string).toLowerCase();
const command1 = (route.params.command1 as string).toLowerCase();

</script>

<template>
  <IoFactory :directories="[directory0, directory1]" :command="command1">
    <slot/>
  </IoFactory>
</template>