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
const directory0 =  computed(() => String(route.params.directory0).toLowerCase());
const directory1OrCommand0 = computed(() => String(route.params.directory1OrCommand0).toLowerCase());
const isDirectory = computed(() => isDirectoryExists([directory0.value, directory1OrCommand0.value]));
</script>
<template>
  <InputContent v-if="isDirectory" :directoryPath="[directory0, directory1OrCommand0]">
    <slot/>
  </InputContent>
  <IoFactory v-else :directoryPath="[directory0]" :commandKey="directory1OrCommand0">
    <slot/>
  </IoFactory>
</template>