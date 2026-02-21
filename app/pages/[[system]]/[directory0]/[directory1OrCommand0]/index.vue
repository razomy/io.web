<script setup lang="ts">
import {isCommandExists, isDirectoryExists} from '~~/razomy/db';
import IoFactory from '~/components/IoFactory.vue';
import InputContent from '~/components/InputContent.vue'

definePageMeta({
  validate: async (route) => {
    const directory0 = (route.params.directory0 as any).toLowerCase();
    const directory1OrCommand0 = (route.params.directory1OrCommand0 as string).toLowerCase();
    const isDirectory = isDirectoryExists([directory0, directory1OrCommand0]);
    const isCommand = isCommandExists([directory0], directory1OrCommand0);
    return isDirectory || isCommand;
  }
});

const route = useRoute();
const directory0 = (route.params.directory0 as any).toLowerCase();
const directory1OrCommand0 = (route.params.directory1OrCommand0 as string).toLowerCase();
const isDirectory = isDirectoryExists([directory0, directory1OrCommand0]);
</script>
<template>
  <InputContent v-if="isDirectory" :directoryPath="[directory0, directory1OrCommand0]">
    <slot/>
  </InputContent>
  <IoFactory v-else :directoryPath="[directory0]" :commandKey="directory1OrCommand0">
    <slot/>
  </IoFactory>
</template>