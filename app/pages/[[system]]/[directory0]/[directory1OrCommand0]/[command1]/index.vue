<script setup lang="ts">
import {isCommandExists} from '~~/razomy/db';

definePageMeta({
  validate: async (route) => {
    const directory0 = (route.params.directory0 as any).toLowerCase();
    const directory1 = (route.params.directory1OrCommand0 as string).toLowerCase();
    const command1 = (route.params.command1 as string).toLowerCase();
    return isCommandExists([directory0, directory1], command1);
  }
});

const route = useRoute();
const directory0 = (route.params.directory0 as any).toLowerCase();
const directory1 = (route.params.directory1OrCommand0 as string).toLowerCase();
const command1 = (route.params.command1 as string).toLowerCase();

</script>

<template>
  <IoFactory :directoryPath="[directory0, directory1]" :commandKey="command1">
    <slot/>
  </IoFactory>
</template>